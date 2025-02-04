'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
    _id: string;
    name: string;
    slug: { current: string };
}

const categoryImages = {
    chains: '/images/categories/chains.jpg',
    rings: '/images/categories/rings.jpg',
    belts: '/images/categories/belts.jpg',
    socks: '/images/categories/socks.jpg',
    shoes: '/images/categories/shoes.jpg',
    glasses: '/images/categories/glasses.jpg',
};

const categoryDescriptions = {
    chains: 'Discover our collection of stylish chains for every occasion',
    rings: 'Explore elegant rings that make a statement',
    belts: 'Premium leather belts to complete your look',
    socks: 'Comfortable and stylish socks for everyday wear',
    shoes: 'Step out in style with our trendy footwear collection',
    glasses: 'Find your perfect pair of designer eyewear',
};

export default function CategoriesPage() {
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

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">Loading categories...</div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
                        <p className="text-gray-600">
                            Explore our curated collection of premium accessories for every style
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => {
                        const categoryKey = category.name.toLowerCase() as keyof typeof categoryImages;
                        return (
                            <Link
                                key={category._id}
                                href={`/products/category/${category.name.toLowerCase()}`}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                                    <Image
                                        src={categoryImages[categoryKey]}
                                        alt={category.name}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-all duration-300" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            {category.name}
                                        </h2>
                                        <p className="text-white/90 text-sm mb-4">
                                            {categoryDescriptions[categoryKey]}
                                        </p>
                                        <span className="inline-flex items-center text-white text-sm font-medium group-hover:underline">
                                            Shop Now
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Featured Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
                    <p className="text-gray-600 mb-8">
                        Contact us for special requests or custom orders
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
} 