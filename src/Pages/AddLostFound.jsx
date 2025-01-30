import React, { useContext } from 'react'; 
import './css/AddLostFound.css'
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from '../Provider/AuthContext';

const AddLostFound = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postType = e.target.post_type.value;
        const photo = e.target.photo.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const date = e.target.date.value;

        const formData = {
            postType,
            photo,
            title,
            description,
            category,
            location,
            date,
            contactInfo: user?.displayName || 'Anonymous'
        };

        try {
            const response = await fetch('https://y-nine-lake.vercel.app/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Data saved successfully:', result);
                alert('Post added successfully!');
                e.target.reset(); // Reset the form after successful submission
            } else {
                console.error('Failed to save data:', response.statusText);
                alert('Failed to save the post. Please try again.');
            }
        } catch (error) {
            console.error('Error while saving data:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='bg-black min-h-screen flex justify-center items-center py-20'>
            <div className="card bg-gray-950 w-full max-w-5xl shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body text-white px-28 py-6 mt">
                    <h2 className="text-3xl text-center font-bold mb-4">Submit Lost or Found Item</h2>
                    <div className="form-control mt-6">
                        <div className='flex items-center justify-center gap-3'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Post Type</span>
                                </label>
                                <select name='post_type' className="select select-bordered text-black w-56">
                                    <option>Found</option>
                                    <option>Lost</option>
                                </select>
                            </div>
                            <div className="form-control w-56">
                                <label className="label">
                                    <span className="label-text text-white">Photo</span>
                                </label>
                                <input name='photo' type="text" placeholder="Photo URL" className="input input-bordered text-black" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Title</span>
                            </label>
                            <input name='title' type="text" placeholder="Title" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Description</span>
                            </label>
                            <input name='description' type="text" placeholder="Description" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Category</span>
                            </label>
                            <input name='category' type="text" placeholder="Category (e.g., pets, documents, gadgets)" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Location</span>
                            </label>
                            <input name='location' type="text" placeholder="Location" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Date</span>
                            </label>
                            <input name='date' type="date" placeholder="Date" className="input input-bordered text-black" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Contact Information</span>
                            </label>
                            <input name='contactInfo' defaultValue={user?.displayName} type="text" className="input input-bordered text-black" readOnly />
                        </div>
                        <button className="btn btn-primary mt-4">Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLostFound;
