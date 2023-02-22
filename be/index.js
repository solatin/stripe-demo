const express = require('express');
const cors = require('cors');
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')(
	'sk_test_51Md7RvDRLAA1QDRVORjO05TWBBhsly3rXzb9UFIX8eEb69V1rif3WDMH3shvCyVET6CVTaC4Ppdz3MHmPDyUUxsI00qVLJ1AQC'
);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

app.post('/create-payment-intent', async (req, res) => {
	const { items } = req.body;

	const user = req.user || { id: 'id1', email: 'user1@gmail.com', name: 'user1' };
	let { data } = await stripe.customers.search({
		query: `email: "${user.email}"`
	});
  let customer

	console.log(data);
	if (!data.length) {
		customer = await stripe.customers.create({
			email: user.email,
			name: user.name
		});
	} else {
    customer = data[0]
  }

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: 'usd',
		customer: customer.id,
		setup_future_usage: 'off_session',
		automatic_payment_methods: {
			enabled: true
		}
	});

	res.send({
		clientSecret: paymentIntent.client_secret
	});
});

app.post('/payment-intent-completed', async (req, res) => {
	const { payment_intent, payment_intent_client_secret } = req.body;
	const payment = await stripe.paymentIntents.retrieve(payment_intent);

	const user = req.user || { id: 'id1', email: 'user1@gmail.com', name: 'user1' };
  const customer = await stripe.customers.retrieve(payment.customer)


  console.log(customer, user)
	if (customer.id === user.id) {
		// const existed = db.query({payment_id: data.id, forCustomer: user.id})
		if (!existed) {
			//update db user
		}
	}

	res.end();
});

app.listen(3000, () => console.log('Node server listening on port 3000!'));
