'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    slug: { current: string };
}

export default function ProductsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const query = `*[_type == "category"] {
                _id,
                name,
                slug
            }`;
            const data = await client.fetch(query);
            setCategories(data);
            setLoading(false);
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link 
                        key={category._id}
                        href={`/products/category/${category.name.toLowerCase()}`}
                        className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="text-xl font-semibold mb-2 capitalize">
                            {category.name}
                        </div>
                        <div className="text-gray-600">
                            Browse {category.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 