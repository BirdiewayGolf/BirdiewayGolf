// This is a placeholder for future Stripe integration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeService = {
  async createPaymentIntent(amount, metadata) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        metadata
      });
      return paymentIntent;
    } catch (error) {
      console.error('Stripe payment intent error:', error);
      throw error;
    }
  },

  async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      console.error('Stripe confirm payment error:', error);
      throw error;
    }
  }
};

module.exports = stripeService;