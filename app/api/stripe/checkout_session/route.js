// api/stripe.js

import { stripe } from "../../../lib/initStripe"; // Initialize Stripe instance
import { getSession } from "next-auth/client"; // Import getSession from next-auth for authentication

export default async (req, res) => {
  // Check if the request is a POST request
  if (req.method === "POST") {
    try {
      // Get the user session
      const session = await getSession({ req });
      // Check if the user is authenticated
      if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      
      // Extract the amount from the request body
      const { amount } = req.body;

      // Create a Stripe session
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Your Product Name", // Set your product name here
              },
              unit_amount: amount, // Set the amount dynamically from the request
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, // Set your success URL here
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`, // Set your cancel URL here
      });

      // Send the session ID back to the client
      res.status(200).json({ session: stripeSession });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
