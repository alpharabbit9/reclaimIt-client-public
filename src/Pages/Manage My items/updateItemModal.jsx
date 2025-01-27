import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const UpdateItemModal = ({ isOpen, closeModal, itemId, fetchItems }) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return; // Only fetch if modal is open

        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://y-nine-lake.vercel.app/items/${itemId}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [isOpen, itemId]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://y-nine-lake.vercel.app/items/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (response.ok) {
                Swal.fire('Success!', 'Item updated successfully!', 'success');
                fetchItems();
                closeModal();
            } else {
                Swal.fire('Error!', 'Failed to update item.', 'error');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            Swal.fire('Error!', 'Failed to update item.', 'error');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Update Item</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={item.title}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={item.category}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={item.location}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={item.description}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItemModal;
