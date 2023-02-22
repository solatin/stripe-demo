import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { default as React, useEffect, useState } from 'react';
import Modal from 'react-modal';

import CheckoutForm from '../CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
	'pk_test_51MZnsEIJMS5JJPnFjyFeuJK1IytiC751M5FVqJ7Jz2Q4nErUzY2MsfYqMqL31RSKVxNvmdsUc4BaS12a4hbUQ3Il00sHl7MMu5'
);

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function PaymentModal({ isOpen, setIsOpen }) {
	let subtitle;

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		if (isOpen) {
			fetch('http://localhost:9998/api/payment/create-payment-intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accessToken:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y0ZDUyM2VhYzZjNzY4ZTI5MzM0MTkiLCJpYXQiOjE2NzY5OTA0MzQsImV4cCI6MTY3NzE2MzIzNH0.QQZAVTVmGMtiHA5YE4A4IdmlCArv1stetPGHGSYITyU'
				},
				body: JSON.stringify({ amount: 10, productId: "prod_NLdaPYtT9DqNjE" })
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret));
		}
	}, [isOpen]);

	const appearance = {
		theme: 'stripe'
	};
	const options = {
		clientSecret,
		appearance
	};

	return (
		<div>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
				<div className="App">
					{clientSecret && (
						<Elements options={options} stripe={stripePromise}>
							<CheckoutForm />
						</Elements>
					)}
				</div>
			</Modal>
		</div>
	);
}

export default PaymentModal;
