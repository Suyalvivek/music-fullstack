import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doLogin } from "../api/user-api"; // Assume this hits your login endpoint
import { loginSchema } from "../validations/login-validation.ts";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = async (userObject: unknown) => {
    try {
      const result = await doLogin(userObject);
      if (result.data.message) {
        localStorage.role = result.data.role;
        localStorage.token = result.data.token;
        console.log("Login Success");
        setMessage(result.data.message);
        setStatus(false);
        navigate("/dashboard");
      } else {
        console.log("Login Failed");
        setMessage(result.data.message);
        setStatus(true);
      }
    } catch (error: any) {
      setStatus(true);
      console.error("Login error", error);
      setMessage(error.response.data.message);
    }
  };
  const alertJsx = (
    <Alert variant="destructive" className="mb-4">
      <AlertTitle></AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <Card className="w-full max-w-md px-4 py-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-white mb-1 tracking-wide">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Access your Music App account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* {status && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>Invalid email or password.</AlertDescription>
            </Alert>
          )} */}
          <form onSubmit={handleSubmit(loginSubmit)} className="space-y-6 px-1 md:px-2">
            {alertJsx}
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-1 block text-sm font-medium">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="abc@example.com"
                {...register("email")}
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 px-4 py-2 rounded-md w-full"
              />
              <span className="text-red-400 text-xs mt-1 block">
                {" "}
                {errors.email && errors.email.message}
              </span>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-1 block text-sm font-medium">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 px-4 py-2 rounded-md w-full"
              />
              <span className="text-red-400 text-xs mt-1 block">
                {" "}
                {errors.password && errors.password.message}
              </span>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold tracking-wide"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
