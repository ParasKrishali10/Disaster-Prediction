import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card>
        <div className="text-center mb-6">
            <img src="/Logo.png" alt="cam" className="mx-auto"/>
          <h2 className="text-2xl text-black font-semibold mt-4">Create Account</h2>
          <p className="text-gray-500 text-sm">
            Register to continue using the SOS Healthcare System
          </p>
        </div>

        <div className="space-y-4 text-black">
          <Input label="Full Name" name="name" placeholder="John Doe" />
          <Input label="Email Address" name="email" placeholder="doctor@hospital.com" />
          <Input  label="Mobile Number" name="mobile" placeholder="+91 9876543210"  />
          <Input label="Password" name="password" placeholder="Create password" type="password" />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Re-enter password"
            type="password"
          />
        </div>

        <Button text="Create Account" />

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-red-600 font-medium">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
}
