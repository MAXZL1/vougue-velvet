const PrivacyPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
            <div className="max-w-3xl mx-auto prose">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p>We collect information that you provide directly to us, including name, email address, shipping address, and payment information when you make a purchase.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <ul className="list-disc pl-4 space-y-2">
                        <li>To process your orders and send order confirmations</li>
                        <li>To communicate with you about products, services, and promotions</li>
                        <li>To improve our website and customer service</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                    <p>We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or destruction.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage; 