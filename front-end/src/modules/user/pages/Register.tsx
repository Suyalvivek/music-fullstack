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
      console.log(userData);
      console.log(result);
      if (result.data.message) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
        console.log("unable to register");
      }
    } catch (error) {
      console.log("register error", error);
    }
  };

  const alertJSx = (
    <Alert variant="destructive" className="mb-4">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Registration failed. Try again.</AlertDescription>
    </Alert>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Register</CardTitle>
          <CardDescription className="text-center">
            Music App Registration Form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && alertJSx}
          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="abc@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;