'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-gray-600">We'd love to hear from you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <PhoneIcon className="h-6 w-6 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <a 
                                            href="tel:03432907212" 
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            03432907212
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <EnvelopeIcon className="h-6 w-6 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <a 
                                            href="mailto:mustafaayyaz28@gmail.com" 
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            mustafaayyaz28@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MapPinIcon className="h-6 w-6 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Location</p>
                                        <p className="text-gray-600">
                                            Shop #15, Dolmen Mall,<br />
                                            Marine Drive, Clifton Block 4,<br />
                                            Karachi, Pakistan
                                        </p>
                                        <a 
                                            href="https://maps.google.com/?q=Dolmen+Mall+Clifton+Karachi"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-800 text-sm mt-1 inline-block"
                                        >
                                            View on Google Maps →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 