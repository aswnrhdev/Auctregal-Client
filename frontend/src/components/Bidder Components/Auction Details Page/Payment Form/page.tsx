'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useState } from "react";
import { Oval } from 'react-loader-spinner';

interface PaymentFormProps {
    clientSecret: string;
    email: string;
    onPaymentSuccess: (paymentIntentId: string) => void;
}

interface StripeElements {
    getElement: (component: typeof CardElement) => StripeCardElement | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, email, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements() as StripeElements | null;
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            alert("Card element not found");
            setLoading(false);
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: { email },
            },
        });

        if (result.error) {
            alert(result.error.message);
        } else if (result.paymentIntent) {
            setPaymentSuccess(true);
            onPaymentSuccess(result.paymentIntent.id);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#DCD7C9] p-8 rounded-lg shadow-lg text-[#DCD7C9]">
            <div className="mb-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || loading || paymentSuccess}
                className={`w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center transition-colors duration-500 ${paymentSuccess
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-[#3F4E4F] hover:bg-[#A27B5C] text-white'
                    }`}
            >
                {loading ? (
                    <Oval
                        height={20}
                        width={20}
                        color="#FFFFFF"
                        ariaLabel="loading"
                        secondaryColor="#A27B5C"
                        strokeWidth={2}
                    />
                ) : paymentSuccess ? (
                    'Success'
                ) : (
                    'Pay Now'
                )}
            </button>
        </form>
    );
};

export default PaymentForm;
