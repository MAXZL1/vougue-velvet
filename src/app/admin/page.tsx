'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    href="/admin/products"
                    className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
                    <p className="text-gray-600">Add, edit, or remove products from your store</p>
                </Link>

                <Link 
                    href="/admin/orders"
                    className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
                    <p className="text-gray-600">View and manage customer orders</p>
                </Link>
            </div>
        </div>
    );
} 