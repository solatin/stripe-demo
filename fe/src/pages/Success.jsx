import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStripe } from '@stripe/react-stripe-js';

const Success = (props) => {
	useEffect(() => {
		console.log(window.location.search);

		const searchParams = new URLSearchParams(window.location.search);
		fetch('http://localhost:9998/api/payment/payment-intent-completed', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accessToken:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y0ZDUyM2VhYzZjNzY4ZTI5MzM0MTkiLCJpYXQiOjE2NzY5OTA0MzQsImV4cCI6MTY3NzE2MzIzNH0.QQZAVTVmGMtiHA5YE4A4IdmlCArv1stetPGHGSYITyU'

				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				payment_intent: searchParams.get('payment_intent'),
				payment_intent_client_secret: searchParams.get('payment_intent_client_secret'),
				redirect_status: searchParams.get('redirect_status')
			})
		});
	}, []);
	return <h1>Success</h1>;
};

Success.propTypes = {};

export default Success;
