'use client'
import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUserData } from '@/features/user/userSlice';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51OT0m1SBqQNmRFp2b1HOsHjUjMB7f2ht4EnZ5saT9hXCq5xjH61VvvMm49AH34T5aLELQ8FuavwoUzP57ClDkv6l00VlNLXNGv');

interface CheckoutFormProps {
  email: string;
  name: string;
  onPaymentSuccess: (auctCode: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ email, name, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [auctCode, setAuctCode] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const response = await axios.post('https://auctregal.rudopedia.shop/create-payment-intent', { email, name });
      const clientSecret = response.data.clientSecret;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name, email },
        },
      });

      if (payload.error) {
        alert(`Payment failed: ${payload.error.message}`);
      } else {
        setSucceeded(true);
        setAuctCode(response.data.auctCode);
        await axios.post('https://auctregal.rudopedia.shop/update-wallet', { email });
        onPaymentSuccess(response.data.auctCode);
      }
    } catch (error: any) {
      alert(`Payment failed: ${error.response?.data?.message || error.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
          className="p-3 bg-[#1C0A00] rounded-lg"
        />
      </div>
      {succeeded ? (
        <button
          type="submit"
          disabled
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Registration Complete
        </button>
      ) : (
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 ${loading ? 'bg-gray-500' : 'bg-[#FF6600] hover:bg-[#FF8533]'}`}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-t-4 border-white border-solid border-transparent rounded-full animate-spin"></div>
          ) : (
            'Pay ₹4999'
          )}
        </button>
      )}
    </form>
  );
};

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showStripe, setShowStripe] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.email && user.auctCode) {
      setPaymentCompleted(true);
    }
  }, [user]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setShowStripe(true);
    }
  };

  const handlePaymentSuccess = (auctCode: string) => {
    setPaymentCompleted(true);
    dispatch(setUserData({ ...user, auctCode }));
  };

  return (
    <div className="mx-auto mt-10">
      <h2 className="text-white text-center">Auctregal Mega Auction Registration Form</h2>
      <p className="mb-6 text-white">
        To confirm your attendance, please complete the form below and secure your booking with a fee of ₹4999 INR.
      </p>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C0A00] text-white"
            required
            disabled={paymentCompleted}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1C0A00] text-white"
            required
            disabled={paymentCompleted}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF6600] text-white py-2 px-4 rounded-lg hover:bg-[#FF8533] transition duration-300"
          disabled={paymentCompleted || showStripe}
        >
          {paymentCompleted ? 'Registration Complete' : 'Register'}
        </button>
      </form>
      {showStripe && !paymentCompleted && (
        <Elements stripe={stripePromise}>
          <CheckoutForm email={email} name={name} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
      {paymentCompleted && (
        <div className="mt-4 text-green-500">
          Payment successful! Your registration is complete.
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
