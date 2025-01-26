import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LatestFindAndLostItems = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then((response) => response.json())
            .then((data) => {
                const sortedItems = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setItems(sortedItems.slice(0, 6));
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/details/${id}`);
    };



    return (
        <div className=" px-16 text-white bg-[#111827]">
            <h2 className="text-3xl font-bold text-center mb-6">Latest Find & Lost Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="card bg-blue-950 shadow-md p-4 rounded-xl">
                        <img
                            src={item.photo}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-t-xl mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description.slice(0, 100)}...</p>
                        <button
                            onClick={() => handleViewDetails(item.id)}
                            className="btn bg-green-800 text-white w-full"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <Link to={'/lostFoundItems'}>
                    <button className="btn btn-secondary">
                        See All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestFindAndLostItems;
