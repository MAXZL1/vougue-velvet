const FAQPage = () => {
    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted."
        },
        {
            question: "How long does shipping take?",
            answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Return shipping is free for domestic orders."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email that you can use to monitor your delivery status."
        },
        {
            question: "Are your products authentic?",
            answer: "Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and suppliers."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-6 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage; 