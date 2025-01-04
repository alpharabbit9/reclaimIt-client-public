import React from 'react';
import { FaLaptop, FaWallet, FaFileAlt, FaSuitcase, FaBoxOpen } from 'react-icons/fa';

const Categories = () => {
    const categories = [
        {
            name: 'Electronics',
            icon: <FaLaptop className="text-4xl text-blue-400" />,
        },
        {
            name: 'Personal Accessories',
            icon: <FaWallet className="text-4xl text-green-400" />,
        },
        {
            name: 'Documents',
            icon: <FaFileAlt className="text-4xl text-yellow-400" />,
        },
        {
            name: 'Bags and Luggage',
            icon: <FaSuitcase className="text-4xl text-purple-400" />,
        },
        {
            name: 'Miscellaneous',
            icon: <FaBoxOpen className="text-4xl text-red-400" />,
        },
    ];

    return (
        <div className="bg-gray-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
                <p className="text-center mb-10 text-gray-400">
                    Explore categories of items commonly lost to find or report your belongings.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div onClick={'/recoveredItems'} className="mb-4">{category.icon}</div>
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
