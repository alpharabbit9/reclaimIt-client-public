import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../Provider/AuthContext";
import UpdateItemModal from "./updateItemModal";


const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedItemId, setSelectedItemId] = useState(null); // State to store the selected item ID
    const { user } = useContext(AuthContext);

    const loggedInUser = {
        displayName: user?.displayName,
    };

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const response = await fetch(
                    `https://y-nine-lake.vercel.app/user-items?userDisplayName=${loggedInUser.displayName}`
                );
                const data = await response.json();
                setItems(data);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching user items:", error);
                setLoading(false); // Ensure loading is set to false even on error
            }
        };

        if (loggedInUser.displayName) {
            fetchUserItems();
        }
    }, [loggedInUser.displayName]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(
                        `https://y-nine-lake.vercel.app/items/${id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    if (response.ok) {
                        setItems(items.filter((item) => item._id !== id)); // Update the UI
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your item has been deleted.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the item. Please try again.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error deleting the item:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                    });
                }
            }
        });
    };

    // Function to open the modal and set the selected item ID
    const openModal = (id) => {
        setSelectedItemId(id);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItemId(null); // Clear selected item ID
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-32 text-white">
            <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">My Items</h2>

                {items.length === 0 ? (
                    <p className="text-lg text-gray-400">No items added yet.</p>
                ) : (
                    <table className="w-full border-collapse bg-gray-900 rounded-lg">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Post Type</th>
                                <th className="text-left p-4">Location</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="border-b border-gray-700">
                                    <td className="p-4">{item.title}</td>
                                    <td className="p-4">{item.postType}</td>
                                    <td className="p-4">{item.location}</td>
                                    <td className="p-4 space-x-4">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => openModal(item._id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal component to update item */}
            <UpdateItemModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                itemId={selectedItemId}
                fetchItems={() => { }}
            />
        </div>
    );
};

export default MyItems;
