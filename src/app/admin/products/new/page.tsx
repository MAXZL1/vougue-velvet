'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import imageUrlBuilder from '@sanity/image-url';

interface Category {
    _id: string;
    name: string;
}

const builder = imageUrlBuilder(client);

export default function NewProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
    });
    const [images, setImages] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            const query = `*[_type == "category"] {
                _id,
                name
            }`;
            const data = await client.fetch(query);
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(prev => [...prev, ...filesArray]);
            
            // Create preview URLs
            filesArray.forEach(file => {
                const url = URL.createObjectURL(file);
                setImageUrls(prev => [...prev, url]);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Upload images first
            const imageAssets = await Promise.all(
                images.map(async (image) => {
                    const imageData = await client.assets.upload('image', image);
                    return {
                        _type: 'image',
                        _key: imageData._id,
                        asset: {
                            _type: "reference",
                            _ref: imageData._id
                        }
                    };
                })
            );

            // Create product with image references
            const doc = {
                _type: 'product',
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: imageAssets,
                ...(formData.category && {
                    category: {
                        _type: 'reference',
                        _ref: formData.category
                    }
                })
            };

            await client.create(doc);
            router.push('/admin/products');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Stock</label>
                    <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {/* Image previews */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImages(prev => prev.filter((_, i) => i !== index));
                                        setImageUrls(prev => prev.filter((_, i) => i !== index));
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
} 