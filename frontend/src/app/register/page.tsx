"use client";

import React, { useState } from "react";
import * as actions from "@/actions";
import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";

import promoImage from "/assets/images/cup-coffee-laptop.jpg";

type RegisterUser = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  githubAccount?: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    githubAccount: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const registerSubmit = actions.handleSubmit.bind(null, formData);

  return (
    <div className="grid grid-cols-12">
      <section className="col-span-12 grid grid-cols-2 gap-4  h-screen">
        <div className="col-span-1 flex flex-col items-center w-full py-10 px-32">
          <header className="col-span-12 mb-10 text-center">
            <h1 className="text-3xl font-semibold">Sign up</h1>
            <h2 className="text-md font-extralight">Create an account</h2>
          </header>

          <form className="w-full">
            <Input
              id="username"
              placeholder="Username"
              onChange={handleOnChange}
              value={formData.username}
            />

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

            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              onChange={handleOnChange}
              value={formData.confirmPassword}
            />

            <button
              type="submit"
              onClick={registerSubmit}
              className="w-full py-4 mt-4 bg-amber-300 rounded-xl"
            >
              Submit
            </button>
          </form>
          <p className="py-4">
            Already registered?{" "}
            <Link href="/sign-in" className="text-orange-700">
              Sign in.
            </Link>
          </p>
        </div>
        <div className="col-span-1 p-11">
          <div className="flex justify-center items-center bg-amber-300 rounded-3xl w-full h-full">
            <Image
              src={promoImage}
              width={100}
              height={100}
              alt="Cup of Coffe and a laptop"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
