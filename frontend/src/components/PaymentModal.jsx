import React from 'react';

const PaymentModal = ({ isOpen, onClose, onSelectPayment, totalAmount }) => {
    if (!isOpen) return null;

    const handlePaymentSelect = (method) => {
        onSelectPayment(method);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ×
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-playfair font-semibold mb-2">Select Payment Method</h2>
                    <p className="text-gray-600 text-sm">
                        Total Amount: <span className="font-semibold text-lg">₹{totalAmount?.toFixed(2)}</span>
                    </p>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                    {/* Razorpay Option */}
                    <button
                        onClick={() => handlePaymentSelect('Razorpay')}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-800">Pay with Razorpay</p>
                                    <p className="text-xs text-gray-500">Credit/Debit Card, UPI, Netbanking</p>
                                </div>
                            </div>
                            <div className="text-blue-600 font-semibold">→</div>
                        </div>
                    </button>

                    {/* Pay At Hotel Option */}
                    <button
                        onClick={() => handlePaymentSelect('Pay At Hotel')}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-gray-800">Pay At Hotel</p>
                                    <p className="text-xs text-gray-500">Pay when you check-in</p>
                                </div>
                            </div>
                            <div className="text-green-600 font-semibold">→</div>
                        </div>
                    </button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    Your payment is secure and encrypted
                </p>
            </div>
        </div>
    );
};

export default PaymentModal;
