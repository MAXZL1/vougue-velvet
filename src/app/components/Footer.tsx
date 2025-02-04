import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">Vouge Velvet</h3>
                        <p className="text-gray-300">Your premier destination for luxury accessories and fashion statements.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/products" className="hover:text-blue-400">Shop Now</Link></li>
                            <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                            <li><Link href="/shipping" className="hover:text-blue-400">Shipping Info</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
                            <li><Link href="/returns" className="hover:text-blue-400">Returns Policy</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                        <p className="mb-4">Subscribe for exclusive offers and updates!</p>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 py-2 px-4 rounded-md">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Social Media & Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <a href="#" className="hover:text-blue-400 text-xl"><FaFacebook /></a>
                            <a href="#" className="hover:text-blue-400 text-xl"><FaInstagram /></a>
                            <a href="#" className="hover:text-blue-400 text-xl"><FaTwitter /></a>
                            <a href="#" className="hover:text-blue-400 text-xl"><FaPinterest /></a>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-400">© 2024 Vouge Velvet. All rights reserved.</p>
                            <p className="text-sm text-gray-400 mt-1">Luxury Accessories & Fashion Statements</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 