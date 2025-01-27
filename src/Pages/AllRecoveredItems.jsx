import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Provider/AuthContext";

const AllRecoveredItems = () => {
    const [recoveredItems, setRecoveredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecoveredItems = async () => {
            try {
                const response = await fetch(
                    `https://y-nine-lake.vercel.app/recoveries?recoveredBy=${user?.displayName}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setRecoveredItems(data);
                } else {
                    console.error("Failed to fetch recovered items");
                }
            } catch (error) {
                console.error("Error fetching recovered items:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.displayName) {
            fetchRecoveredItems();
        }
    }, [user]);

    if (loading) {
        return <div className="text-white text-center py-20">Loading...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-32 text-white">
            <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6">All Recovered Items</h2>

                {recoveredItems.length === 0 ? (
                    <p className="text-lg text-gray-400 text-center">
                        No recovered items found.
                    </p>
                ) : (
                    <table className="w-full border-collapse bg-gray-900 rounded-lg">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="text-left p-4">Item Name</th>
                                <th className="text-left p-4">Recovered Location</th>
                                <th className="text-left p-4">Recovered Date</th>
                                <th className="text-left p-4">Recovered By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recoveredItems.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-gray-700 hover:bg-gray-800"
                                >
                                    <td className="p-4">{item.itemName || "N/A"}</td>
                                    <td className="p-4">{item.recoveredLocation}</td>
                                    <td className="p-4">
                                        {new Date(item.recoveredDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            {item.recoveredBy?.image && (
                                                <img
                                                    src={item.recoveredBy.image}
                                                    alt={item.recoveredBy.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            )}
                                            <div>
                                                <p className="font-medium">
                                                    {item.recoveredBy?.name || "Unknown"}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {item.recoveredBy?.email || "No Email"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllRecoveredItems;
