'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import { useParams } from 'next/navigation';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: any[];
    slug: { current: string };
    description: string;
    stock: number;
}

interface Category {
    _id: string;
    name: string;
    slug: { current: string };
}

export default function CategoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const categorySlug = params.category;

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                // First fetch the category with case-insensitive value matching
                const categoryQuery = `*[_type == "category" && name match $categoryPattern][0] {
                    _id,
                    name,
                    slug
                }`;
                
                // Create a case-insensitive pattern for matching
                const categoryName = categorySlug.toString();
                const categoryPattern = `(?i)^${categoryName}$`;
                
                const categoryData = await client.fetch(categoryQuery, { 
                    categoryPattern
                });
                
                if (categoryData) {
                    setCategory(categoryData);
                    
                    // Then fetch products for this category
                    const productsQuery = `*[_type == "product" && category._ref == $categoryId] {
                        _id,
                        name,
                        price,
                        images,
                        slug,
                        description,
                        stock
                    }`;

                    const productsData = await client.fetch(productsQuery, { 
                        categoryId: categoryData._id 
                    });
                    
                    setProducts(productsData);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (categorySlug) {
            fetchCategoryAndProducts();
        }
    }, [categorySlug]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-xl">Loading products...</div>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
                    <p>The category you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold capitalize">{category.name}</h1>
                <p className="text-gray-600 mt-2">
                    {products.length} {products.length === 1 ? 'product' : 'products'} available
                </p>
            </div>
            
            {products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No products available in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
} 