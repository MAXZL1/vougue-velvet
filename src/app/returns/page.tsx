const ReturnsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Returns Policy</h1>
            <div className="max-w-3xl mx-auto prose">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Return Window</h2>
                    <p>We offer a 30-day return window for all unused items in their original packaging.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
                    <ol className="list-decimal pl-4 space-y-2">
                        <li>Initiate your return through your account or contact customer service</li>
                        <li>Print the provided return shipping label</li>
                        <li>Package your item securely in its original packaging</li>
                        <li>Drop off the package at any authorized shipping location</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
                    <p>Refunds will be processed within 5-7 business days of receiving your return. The refund will be issued to your original payment method.</p>
                </section>
            </div>
        </div>
    );
};

export default ReturnsPage; 