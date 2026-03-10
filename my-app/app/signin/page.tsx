"use client";

import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Tabs from "../components/Tabs";

export default function SignIn() {
  const [mode, setMode] = useState("Email");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card>
        <div className="text-center mb-6">
            <img src="/Logo.png" alt="cam" className="mx-auto"/>
          <h2 className="text-2xl mt-4 text-black font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Sign in to access your healthcare dashboard
          </p>
        </div>

        <Tabs tabs={["Email", "Phone"]} onChange={setMode} />

        {mode === "Email" ? (
          <Input label="Email Address" name="email" placeholder="doctor@hospital.com" />
        ) : (
          <Input label="Mobile Number" name="mobile" placeholder="+91 9876543210" />
        )}

        <div className="mt-4">
          <Input label="Password" name="password" placeholder="Enter password" type="password" />
        </div>

        <Button text="Sign In" />

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-600 font-medium">
            Create one
          </a>
        </p>
      </Card>
    </div>
  );
}
