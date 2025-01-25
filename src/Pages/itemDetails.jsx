import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // to get the item ID from the URL

const ItemDetails = () => {
    const { id } = useParams(); // Get the item ID from the URL
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/items/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black min-h-screen py-20 text-white">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold mb-6">{item.title}</h2>
                <figure>
                    <img src={item.photo} alt={item.title} className="w-full h-72 object-cover mb-6" />
                </figure>
                <p><strong>Post Type:</strong> {item.postType}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Contact Information:</strong> {item.contactInfo}</p>
            </div>
        </div>
    );
};

export default ItemDetails;
