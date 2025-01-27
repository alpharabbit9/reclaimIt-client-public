import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../Provider/AuthContext";

const ItemDetails = () => {
    const{user} = useContext(AuthContext)
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [recoveredLocation, setRecoveredLocation] = useState("");
    const [recoveredDate, setRecoveredDate] = useState(new Date());
    const [isRecovered, setIsRecovered] = useState(false);
    const loggedInUser = {
        email: user?.email,
        name: user?.displayName,
        image:user?.photoURL
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://y-nine-lake.vercel.app/items/${id}`);
                const data = await response.json();
                setItem(data);
                setIsRecovered(data.status === "recovered");
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItemDetails();
    }, [id]);

    const handleRecoverySubmit = async () => {
        const recoveryData = {
            itemId: id,
            recoveredLocation,
            recoveredDate,
            recoveredBy: {
                email: loggedInUser.email,
                name: loggedInUser.name,
                image: loggedInUser.image,
            },
        };

        try {
            const response = await fetch(`https://y-nine-lake.vercel.app/recoveries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recoveryData),
            });

            if (response.ok) {
                await fetch(`https://y-nine-lake.vercel.app/items/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "recovered" }),
                });
                setIsRecovered(true);
                setShowModal(false);
            } else {
                console.error("Error storing recovery data.");
            }
        } catch (error) {
            console.error("Error during recovery submission:", error);
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-20 text-white">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold mb-6">{item.title}</h2>
                <figure>
                    <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-72 object-cover mb-6"
                    />
                </figure>
                <p>
                    <strong>Post Type:</strong> {item.postType}
                </p>
                <p>
                    <strong>Category:</strong> {item.category}
                </p>
                <p>
                    <strong>Description:</strong> {item.description}
                </p>
                <p>
                    <strong>Location:</strong> {item.location}
                </p>
                <p>
                    <strong>Date:</strong> {item.date}
                </p>
                <p>
                    <strong>Contact Information:</strong> {item.contactInfo}
                </p>
                {!isRecovered && (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
                        onClick={() => setShowModal(true)}
                    >
                        {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
                    </button>
                )}
                {isRecovered && (
                    <p className="text-green-500 mt-6">This item has already been recovered.</p>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Recover Item</h3>
                        <div className="mb-4">
                            <label className="block mb-2">Recovered Location:</label>
                            <input
                                type="text"
                                value={recoveredLocation}
                                onChange={(e) => setRecoveredLocation(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Recovered Date:</label>
                            <ReactDatePicker
                                selected={recoveredDate}
                                onChange={(date) => setRecoveredDate(date)}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Recovered By:</label>
                            <div className="flex items-center gap-4">
                                <img
                                    src={loggedInUser.image}
                                    alt={loggedInUser.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p>{loggedInUser.name}</p>
                                    <p>{loggedInUser.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleRecoverySubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetails;
