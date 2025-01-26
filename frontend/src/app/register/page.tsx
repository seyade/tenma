"use client";

import React, { useState } from "react";
import * as actions from "@/actions";
import Input from "@/components/Input";

type RegisterUser = {
  email: string;
  username: string;
  password: string;
  githubAccount?: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
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
      <header className="col-span-12 text-center">
        <h1 className="text-3xl font-semibold">Sign up</h1>
        <h2 className="text-md font-extralight">Create an account</h2>
      </header>

      <section className="col-span-3">
        <form>
          <Input
            id="username"
            labelText="Username"
            onChange={handleOnChange}
            value={formData.username}
          />

          <Input
            id="email"
            labelText="Email"
            onChange={handleOnChange}
            value={formData.email}
          />

          <button
            type="submit"
            onClick={registerSubmit}
            className="w-full py-2 bg-orange-400 rounded-xl"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
