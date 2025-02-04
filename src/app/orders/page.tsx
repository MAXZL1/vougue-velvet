'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import TrackingInfo from '@/components/TrackingInfo';
import { format } from 'date-fns';

interface OrderItem {
  product: {
    name: string;
    _id: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
  shipping?: {
    trackingNumber: string;
    courier: string;
    estimatedDelivery: string;
  };
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchOrders = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/auth/login');
                return;
            }

            try {
                // Fetch orders from Sanity using the user's ID
                const query = `*[_type == "order" && userId == $userId] | order(createdAt desc) {
                    _id,
                    orderId,
                    createdAt,
                    status,
                    total,
                    items[] {
                        quantity,
                        price,
                        "product": product-> {
                            name,
                            _id
                        }
                    },
                    shipping
                }`;

                const data = await client.fetch(query, {
                    userId: session.user.id
                });

                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchOrders();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">You haven't placed any orders yet.</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Order #{order.orderId}
                                    </h3>
                                    <p className="text-gray-600">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    order.status === 'completed' 
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span>{item.product.name} x{item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <span className="font-semibold">Total:</span>
                                <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                            </div>

                            {order.shipping?.trackingNumber && (
                                <div className="mt-4">
                                    <TrackingInfo 
                                        trackingNumber={order.shipping.trackingNumber}
                                        courier={order.shipping.courier}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 