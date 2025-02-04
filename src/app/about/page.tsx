import Image from 'next/image';

const AboutPage = () => {
    const values = [
        {
            title: "Quality",
            description: "We source only the finest materials and work with skilled artisans to create premium accessories."
        },
        {
            title: "Style",
            description: "Our designs blend contemporary trends with timeless elegance to suit every occasion."
        },
        {
            title: "Service",
            description: "We're committed to providing exceptional customer service and a seamless shopping experience."
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full">
                <Image
                    src="/images/about-hero.jpg"
                    alt="About Vouge Velvet"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                        About Vouge Velvet
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Story Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Founded in Karachi, Vouge Velvet has been at the forefront of fashion accessories since our inception. 
                        We started with a simple mission: to provide high-quality, stylish accessories that enhance your everyday look.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, we're proud to offer a curated collection of chains, rings, belts, socks, shoes, and glasses 
                        that combine contemporary design with exceptional craftsmanship.
                    </p>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div 
                                key={index}
                                className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Section */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
                    <p className="text-gray-600 mb-4">
                        Our flagship store is located in the heart of Karachi at:
                    </p>
                    <p className="text-gray-800 font-medium">
                        Shop #15, Dolmen Mall,<br />
                        Marine Drive, Clifton Block 4,<br />
                        Karachi, Pakistan
                    </p>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Store Hours</h3>
                        <p className="text-gray-600">
                            Monday - Saturday: 11:00 AM - 9:00 PM<br />
                            Sunday: 1:00 PM - 8:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Experience Vouge Velvet</h2>
                    <p className="text-gray-600 mb-8">
                        Discover our latest collections and elevate your style.
                    </p>
                    <a 
                        href="/products" 
                        className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutPage; 