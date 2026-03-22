import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              CRUD App
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md transition">
                Home
              </Link>
              <Link href="/users" className="hover:bg-blue-700 px-3 py-2 rounded-md transition">
                Users
              </Link>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-3 border-l border-blue-500 pl-4">
              <a
                href="https://www.instagram.com/aman.coder.py?igsh=eWxxeHBhZWFvbnl1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aman-bhagat-10641422a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/amanxploit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}