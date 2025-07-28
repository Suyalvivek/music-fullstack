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
import { registerSchema } from "../validations/register-validation";
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
    console.log("Form Submit", userData);
    try {
      const result = await doRegister(userData);
      if (result.data.id) {
        setStatus(false);
        navigate("/login");
      } else {
        setStatus(true);
        console.log("unable to register");
      }
      console.log("Result", result);
    } catch (error) {
      console.log("register error", error);
    }
  };
  const alertJSx = (
    <div>
      <Alert variant="destructive">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Music App Registration From
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status && alertJSx}
          <form action="" onSubmit={handleSubmit(registerSubmit)}>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register("username")}
            />
            <span className="text-red-500">
              {errors.username && errors.username.message}
            </span>

            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="abc@example.com"
              {...register("email")}
            />
            <span>{errors.email && errors.email.message}</span>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              {...register("password")}
            />
            <span>{errors.password && errors.password.message}</span>
            <Button variant="outline" className="bg-indigo-300">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
