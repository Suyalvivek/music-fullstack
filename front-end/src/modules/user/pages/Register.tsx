import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/register-validation.ts"; 
import { doRegister } from "../api/user-api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
const Register = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerSubmit = async (userData: unknown) => {
    try {
      const result = await doRegister(userData);
      if (result.data.message) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
        setMessage('Unable to register');
      }
    } catch (error: any) {
      setStatus(true);
      setMessage(error.response.data.message);
    }
  };

  const alertJSx = (
    <Alert variant="destructive" className="mb-4">
      <AlertTitle></AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <Card className="w-full max-w-md px-6 py-8 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-white mb-1 tracking-wide">Register</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Music App Registration Form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && alertJSx}
          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-6 px-1 md:px-2">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-gray-300 mb-1 block text-sm font-medium">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 px-4 py-2 rounded-md w-full"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 block">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-1 block text-sm font-medium">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="abc@example.com"
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 px-4 py-2 rounded-md w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 block">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-1 block text-sm font-medium">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 px-4 py-2 rounded-md w-full"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 block">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold tracking-wide">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;