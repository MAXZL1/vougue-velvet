'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/auth/login');
                return;
            }

            // Get user metadata
            const { data: { user } } = await supabase.auth.getUser();
            const isAdmin = user?.user_metadata?.isAdmin;

            if (!isAdmin) {
                router.push('/');
                return;
            }
            
            setLoading(false);
        };

        checkAdmin();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex min-h-screen">
            {/* Admin Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-4">
                    <Link href="/admin" className="block hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="block hover:text-gray-300">
                        Products
                    </Link>
                    <Link href="/admin/orders" className="block hover:text-gray-300">
                        Orders
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {children}
            </div>
        </div>
    );
} 