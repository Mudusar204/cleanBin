// components/StripeCheckout.js
// import { ApiUrls } from "@/apis/ApiUrls";
// import { http } from "@/config/http";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OWwAoAJ2A9hnGz2dUZ1SXyQ4TLkZMIdJQdB4REvLLZ2ALAZaEagBcXy2fMaH0N1uWTzAl13nyfRQQSGqwiAZfq4001H1CHv2u"
);

const StripeCheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("stipe method called", event);

    const stripe = await stripePromise;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      // billing_details: {
      //     // Billing details of the customer
      // },
    });
    console.log(error, paymentMethod, "payment method");
    if (!stripe || !elements) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // const response = await http.post(
      //   ApiUrls.payments.attachUrl,
      //   { payment_method_id: paymentMethod.id },
      //   header
      // );
      // console.log(response, "success aaya h payment");

      // return response;
    } catch (error) {
      console.log(error, "error aaya h payment");
      throw error;
    } finally {
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[500px] h-[250px]  ">
        <form
          className="flex flex-col justify-between h-full w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className=" flex justify-between w-full marker: text-[24px] font-semibold text-gray-600">
              <p> Card details</p>
              <XMarkIcon
                onClick={() => props.setModal(false)}
                className="h-[24px] w-[24px] text-black"
              />
            </label>
            <CardElement className="mt-[20px] p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

const StripeCheckout = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm setModal={props.setModal} />
    </Elements>
  );
};

export default StripeCheckout;
