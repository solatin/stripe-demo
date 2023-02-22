import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentModal from '../components/Payment';
const Home = (props) => {
  
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button role="button" onClick={() => setIsOpen(true)}>
				Checkout
			</button>
			<PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

Home.propTypes = {};

export default Home;
