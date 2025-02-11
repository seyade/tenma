"use client";

import React, { useState } from "react";
import * as actions from "@/actions";
import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";

import promoImageMedium from "../../../../public/assets/images/cup-coffee-laptop@medium.jpg";

type SignInUser = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState<SignInUser>({
    email: "",
    password: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    await actions.handleSignInSubmit(formData);
  };

  // const onSignInSubmit = actions.handleSignInSubmit.bind(null, formData);

  return (
    <div className="grid grid-cols-12 plusjakartasans">
      <section className="col-span-12 grid grid-cols-2 gap-4  h-screen">
        <div className="col-span-1 flex flex-col items-center w-full py-10 px-32 mt-28">
          <header className="col-span-12 mb-10 text-center">
            <h1 className="flex flex-col items-center mb-1 text-4xl font-medium spacegrotesk text-[#403e39]">
              <span className="w-fit py-3 px-6 mb-4 text-sm plusjakartasans rounded-full bg-[#c6c3be]/30 text-[#5a5751]">
                Be seen by others
              </span>
              Welcome back
            </h1>
            <h2 className="text-sm font-extralight plusjakartasans">
              Continue your journey.
            </h2>
          </header>

          <form className="w-full" onSubmit={handleSubmit}>
            <Input
              id="email"
              placeholder="Email"
              onChange={handleOnChange}
              value={formData.email}
            />

            <Input
              id="password"
              placeholder="Password"
              onChange={handleOnChange}
              value={formData.password}
            />

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-amber-300 rounded-xl"
            >
              Sign in
            </button>
          </form>
          <p className="py-4 text-sm">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-orange-700">
              Sign up today.
            </Link>
          </p>
        </div>
        <div className="col-span-1 p-11">
          <div className="relative overflow-hidden flex justify-center items-center bg-amber-300 rounded-3xl w-full h-full">
            <Image
              src={promoImageMedium}
              fill
              alt="Cup of Coffe and a laptop"
              style={{ objectFit: "cover", objectPosition: "20% 60%" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
