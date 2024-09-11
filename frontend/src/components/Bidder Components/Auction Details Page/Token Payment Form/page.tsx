'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

interface BiddingPaymentFormProps {
    clientSecret: string;
    email: string;
    onPaymentBiddingSuccess: (token: string) => void;
}

interface StripeElements {
    getElement: (component: typeof CardElement) => StripeCardElement | null;
}

const BiddingPaymentForm: React.FC<BiddingPaymentFormProps> = ({ clientSecret, email, onPaymentBiddingSuccess }) => {
    const stripe = useStripe();
    const elements = useElements() as StripeElements | null;
    const [loading, setLoading] = useState(false);

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
            const response = await axios.post('https://auctregal.rudopedia.shop/confirm-bidding-token', {
                paymentIntentId: result.paymentIntent.id
            });
            onPaymentBiddingSuccess(response.data.token);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Card Details
                </label>
                <CardElement
                    className="p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default BiddingPaymentForm;
