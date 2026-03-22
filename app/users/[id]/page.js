'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UserDetailPage({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [updating, setUpdating] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${params.id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('User not found');
        } else {
          throw new Error('Failed to fetch user');
        }
      } else {
        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          age: data.age || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to load user data');
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data when canceling edit
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  
  if (!formData.name.trim() || !formData.email.trim()) {
    toast.error('Name and email are required');
    return;
  }


    try {
      setUpdating(true);
    const response = await fetch('/api/users', {  // Note: No /${id} in URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: parseInt(params.id),  // ID is in the body
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: formData.age ? parseInt(formData.age) : null
      })
    });


      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        toast.success('User updated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update user');
        if (error.error === 'Email already exists') {
          setFormData(prev => ({ ...prev, email: user.email }));
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('User deleted successfully!');
        router.push('/users');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
        <Link
          href="/users"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/users"
            className="text-blue-500 hover:text-blue-700 mb-2 inline-block"
          >
            ← Back to Users
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit User' : 'User Details'}
          </h1>
        </div>
        <div className="space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEditToggle}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Edit User
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete User
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              disabled={updating}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {!isEditing ? (
          // View Mode
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  User ID
                </label>
                <p className="text-lg font-semibold text-gray-900">#{user.id}</p>
              </div>
              
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Age
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {user.age ? `${user.age} years` : 'Not specified'}
                </p>
              </div>
              
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Created At
                </label>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(user.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleUpdate} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  disabled={updating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  disabled={updating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter age"
                  min="1"
                  max="150"
                  disabled={updating}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update User'}
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                  disabled={updating}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Additional Actions */}
      <div className="bg-gray-50 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
          >
            View All Users
          </Link>
          <button
            onClick={() => {
              router.push('/users');
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm"
          >
            Refresh List
          </button>
        </div>
      </div>
    </div>
  );
}