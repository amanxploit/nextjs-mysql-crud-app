'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function UserForm({ user, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                age: user.age || ''
            });
        } else {
            setFormData({ name: '', email: '', age: '' });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = user ? `/api/users/${user.id}` : '/api/users';  // Include ID in URL for PUT
            const method = user ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: formData.age ? parseInt(formData.age) : null,
                    ...(user && { id: user.id })  // Keep ID in body for consistency
                })
            });


            if (response.ok) {
                toast.success(user ? 'User updated successfully!' : 'User created successfully!');
                onSuccess();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Failed to save user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                </label>
                <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter age"
                />
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}