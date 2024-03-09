
import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

// @ts-ignore
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Your Product',
                // Add more product details as needed
              },
              unit_amount: 1000, // Price in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      });
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
