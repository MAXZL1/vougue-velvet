'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: any[];
    slug: { current: string };
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) return;

            const searchQuery = `*[_type == "product" && (
                name match $query || 
                description match $query ||
                category->name match $query
            )] {
                _id,
                name,
                price,
                images,
                slug
            }`;

            const data = await client.fetch(searchQuery, { query: `*${query}*` });
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, [query]);

    if (!query) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Search Products</h1>
                <p>Please enter a search term to find products.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">
                Search Results for "{query}"
            </h1>
            
            {products.length === 0 ? (
                <p>No products found matching your search.</p>
            ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
} 