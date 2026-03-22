import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Next.js CRUD App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A complete CRUD application built with Next.js 14 and MySQL
        </p>
        <div className="space-x-4">
          <Link
            href="/users"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            View Users
          </Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Create</h3>
          <p className="text-gray-600">Add new users to the database with name, email, and age information.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Read</h3>
          <p className="text-gray-600">View all users in a formatted table with sorting and filtering.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Update/Delete</h3>
          <p className="text-gray-600">Edit user information or remove users from the database.</p>
        </div>
      </div>
    </div>
  );
}