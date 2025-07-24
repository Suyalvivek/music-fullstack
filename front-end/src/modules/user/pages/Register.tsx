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
import { useForm} from "react-hook-form"

const Register = () => {
  const{register,handleSubmit,formState:{errors}}=useForm();
  const registerSubmit = (userData: unknown) => {
    console.log('Form Submit',userData);
  };

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
          <form action="" onSubmit={handleSubmit(registerSubmit)}>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Enter your username" {...register("username") }/>

            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="abc@example.com" {...register("email") }/>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="password" {...register("password") } />
             <Button variant='outline' className="bg-indigo-300">Submit</Button>
          </form>
         
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
