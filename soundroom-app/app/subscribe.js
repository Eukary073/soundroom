import { loadStripe } from '@stripe/stripe-js'; // For web
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'; // For mobile

const stripePromise = loadStripe('pk_test_YOUR_TEST_PUBLISHABLE_KEY');

function Subscribe({ artistId, price }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleSubscribe = async () => {
    // Create payment intent via Cloud Function (serverless)
    const response = await fetch('YOUR_CLOUD_FUNCTION_URL/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: price * 100, artistId }),
    });
    const { clientSecret } = await response.json();

    await initPaymentSheet({ clientSecret });
    const { error } = await presentPaymentSheet();

    if (!error) {
      // Update subscriptions in Firestore
      await setDoc(doc(db, 'subscriptions', auth.currentUser.uid + '_' + artistId), { active: true });
    }
  };

  return <Button title={`Subscribe for $${price}/mo`} onPress={handleSubscribe} />;
}

// Cloud Function example (deploy to Firebase):
// exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
//   const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
//   const intent = await stripe.paymentIntents.create({ amount: req.body.amount, currency: 'usd' });
//   res.send({ clientSecret: intent.client_secret });
// });