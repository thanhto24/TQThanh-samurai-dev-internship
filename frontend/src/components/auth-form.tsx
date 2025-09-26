import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "./password-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { setUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ErrorMessage } from "@/components/error-message"

// --- Zod schemas ---
const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = signinSchema.extend({
  name: z.string().min(1, "Name is required"),
});

type SigninFormData = z.infer<typeof signinSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthFormProps extends React.ComponentProps<"div"> {
  type: "signin" | "signup";
}

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const isSignup = type === "signup";
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const form = useForm<SigninFormData | SignupFormData>({
    resolver: zodResolver(isSignup ? signupSchema : signinSchema),
  });
  const { register, handleSubmit, formState: { errors } } = form;


  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: SigninFormData | SignupFormData) =>
      isSignup ? api.post("/auth/signup", data) : api.post("/auth/login", data),
    onSuccess: async () => {
      if (!isSignup) {
        const { data: userData } = await api.get("/auth/me");
        dispatch(setUser(userData));
      }
    },
  });

  const onSubmit = async (data: SigninFormData | SignupFormData) => {
    try {
      await mutation.mutateAsync(data);
      if (isSignup) {
        navigate("/signin");
        return;
      }
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{isSignup ? "Create your account" : "Sign in to your account"}</CardTitle>
          <CardDescription>
            {isSignup
              ? "Please fill in the details to get started."
              : "Welcome back! Please sign in to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorMessage message={error} />}
            {isSignup && (
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="name"
                    {...register("name" as const)}
                    className="pl-10"
                  />
                </div>
                {isSignup && "name" in errors && (
                  <p className="text-red-500 text-sm">{errors.name?.message}</p>
                )}
              </div>
            )}

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="email"
                  {...register("email" as const)}
                  className="pl-10"
                />
              </div>
              {"email" in errors && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignup && (
                  <a href="#" className="ml-auto text-sm underline">Forgot your password?</a>
                )}
              </div>
              <PasswordInput
                id="password"
                {...register("password" as const)}
              />
              {"password" in errors && (
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              )}
            </div>

              {isSignup ? (
                <Button type="submit" className="w-full" data-testid="signup-btn">Create Account</Button>
              ) : (
                <Button type="submit" className="w-full" data-testid="login-btn">Sign in</Button>
              )}

          
            <div className="mt-4 text-center text-sm">
              {isSignup ? (
                <>Already have an account? <Link to="/signin" className="underline">Sign in</Link></>
              ) : (
                <>Don't have an account? <Link to="/signup" className="underline">Sign up</Link></>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
