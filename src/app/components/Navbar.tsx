'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserCircleIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

interface Category {
    _id: string;
    name: string;
    slug: { current: string };
}

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Check current auth status
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Fetch categories
        const fetchCategories = async () => {
            const query = `*[_type == "category"] {
                _id,
                name,
                slug
            }`;
            const data = await client.fetch(query);
            setCategories(data);
        };

        fetchCategories();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
        router.push('/');
    };

    return (
        <div className="bg-white">
            {/* Top Bar */}
            <div className="bg-black text-white py-2 text-center text-sm">
                Free shipping on orders over $50 | Use code: FREESHIP50
            </div>

            <nav className="border-b">
                <div className="container mx-auto px-4">
                    {/* Main Navigation */}
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                            <span className="text-3xl font-serif">Vouge Velvet</span>
                        </Link>

                        {/* Desktop Navigation - Center */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link href="/" className="nav-link">
                                Home
                            </Link>
                            
                            {/* Categories Dropdown */}
                            <div className="relative group">
                                <button className="nav-link py-2">
                                    Categories
                                </button>
                                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {categories.map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/products/category/${category.name.toLowerCase()}`}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link href="/about" className="nav-link">
                                About
                            </Link>
                            <Link href="/contact" className="nav-link">
                                Contact
                            </Link>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-6">
                            <SearchBar />
                            
                            <button className="icon-button">
                                <ShoppingBagIcon className="h-6 w-6" />
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="icon-button"
                                >
                                    <UserCircleIcon className="h-6 w-6" />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                                    {user.email}
                                                </div>
                                                <Link 
                                                    href="/orders" 
                                                    className="dropdown-item"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    My Orders
                                                </Link>
                                                {user?.user_metadata?.isAdmin && (
                                                    <Link 
                                                        href="/admin" 
                                                        className="dropdown-item"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        Admin Panel
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="dropdown-item w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link 
                                                    href="/auth/login" 
                                                    className="dropdown-item"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    Login
                                                </Link>
                                                <Link 
                                                    href="/auth/register" 
                                                    className="dropdown-item"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                className="lg:hidden icon-button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden py-4 border-t">
                            <div className="flex flex-col space-y-4">
                                <Link 
                                    href="/" 
                                    className="mobile-nav-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">Categories</p>
                                    {categories.map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/products/category/${category.name.toLowerCase()}`}
                                            className="block pl-4 text-gray-600 hover:text-gray-900"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link 
                                    href="/about" 
                                    className="mobile-nav-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className="mobile-nav-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar; 