// import stripePackage from "stripe";

// const stripe =new stripePackage(process.env.STRIPE_KEY);

// import { NextResponse } from "next/server";
// import dbConnect from "../../../../server/utils/dbConnect";

// // @ts-ignore
// export const POST = async (request) => {
//   try {
//     await dbConnect();
//     // const {amount,currency} =await request.json();
//     let amount = 100;
//     let currency = "usd";
//     console.log(stripe,"stripe");
//     const customer = await stripe.customers.create();
//     // console.log(customer,"customer created",stripe);
//     const ephemeralKey = await stripe.ephemeralKeys.create(
//       { customer: customer.id },
//       { apiVersion: "2022-11-15" }
//     );
//     console.log(ephemeralKey,"key created");

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: currency,
//       customer: customer.id,
//       payment_method_types: ["card"],
//     });
//     console.log(paymentIntent,"paymentIntent created");

//     return NextResponse.json({
//       message: "success",
//       paymentIntent: paymentIntent.client_secret,
//       ephemeralKey: ephemeralKey.secret,
//       customer: customer.id,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       error: "Something went wrong in server login ",
//     });
//   }
// };

const stripe = new stripePackage(
  "sk_test_51OkYYqJGy3aGGBUOzw2nvdsBNo6dhPHDLTaKKufLY6QUkws2YLZqdgY7CKqzcCf2ISW9uyEODC8bt3aqYIRKmWys004ebVGSb4"
);
import stripePackage from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
import Payments from "../../../../server/modal/Payments";
import User from "@/server/modal/User";
// const stripe = new stripePackage(process.env.STRIPE_KEY);

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { amount, userId, name, email } = await request.json();
    // let userId="ambadf"
    // let amount = 100;
    let currency = "usd";

    const customer = await stripe.customers.create({
      name: name,
      email: email,
    });

    // Create a test payment method using test card details
    // const paymentMethod = await stripe.paymentMethods.create({
    //   type: "card",
    //   card: {
    //       number: '4242424242424242', // Test card number
    //       token: "tok_visa",
    //     exp_month: 12,
    //     exp_year: 2025,
    //     cvc: '123' // Test CVC
    //   },
    // });
    // const paymentMethodId = "pm_1MqLiJLkdIwHu7ixUEgbFdYF"
    // Attach the test payment method to the customer
    // await stripe.paymentMethods.attach(paymentMethodId, {
    //   customer: customer.id,
    // });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      customer: customer.id,
      payment_method: "pm_card_visa",
      payment_method_types: ["card"],
    });

    const user = await User.findById(userId);
    console.log(user, "user form db",amount);

    const payment = new Payments({
      name: user.username,
      email: user.email,
      userId: userId,
      amount: amount,
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });

    const res = await payment.save();
    console.log(res,"response while storing payment");
    return NextResponse.json({
      message: "success",
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Something went wrong in server login",
    });
  }
};
