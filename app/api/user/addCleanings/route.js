// @ts-nocheck

import User from "../../../../server/modal/User";
import { NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { plan, userId } = await request.json();
    console.log(plan, userId, " req chali");

    const user = await User.findById(userId);

    console.log(user, "user found");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status:"error"
      });
    }
    console.log(user.plan, "user purchages plan");
    const currentDate = new Date();
    if (currentDate < user.planEndDate) {
      return NextResponse.json({
        status: "error",
        message: "Already purchased a plan",
      });
    }
    user.cleanings=[]
    const newCleanings = [];
    if (plan === "quick") {
      newCleanings.push({
        date: currentDate.toLocaleDateString(),
        time: "9 PM",
        status: "pending",
        id: 1,
        address: "faisalabad punjab",
        note: "this is not from user",
        plan: plan,
      });
    } else if (plan === "monthly") {
      for (let i = 0; i < 30; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + i);
        newCleanings.push({
          date: futureDate.toLocaleDateString(),
          status: "pending",
          id: i,
          time: "9 PM",
          address: "faisalabad punjab",
          note: "this is not from user",
          plan: plan,
        });
      }
    }

    user.cleanings.push(...newCleanings);
    user.plan = plan;
    user.planStartDate = new Date();

    // let currentDate = new Date();

    const futureDate = new Date(currentDate);
    if (plan == "quick") {
      futureDate.setDate(currentDate.getDate() + 1);
    } else {
      futureDate.setDate(currentDate.getDate() + 30);
    }
    user.planEndDate = futureDate;
    await user.save();

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong in add cleaning",
    });
  }
};
