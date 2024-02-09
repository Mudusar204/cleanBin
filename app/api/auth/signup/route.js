import dbConnect from "../../../../server/utils/dbConnect";
import Users from "../../../../server/modal/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { username,firstName,lastName,address,phone, email, password, } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("in api calling", "hash", username,firstName,lastName,address,phone, email, password, );

    const newUser = new Users({
      username,
      firstName,
      lastName,
      address,
      phone,
      email,
      password: hashedPassword,
    });

    const res = await newUser.save();
    console.log(res, "data saved");

    return NextResponse.json({message:"success",data:res});
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong in server" });
  }
};
