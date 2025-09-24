import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordInput } from "./password-input"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthFormProps extends React.ComponentProps<"div"> {
  type: "signin" | "signup";
}

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const isSignup = type === "signup";

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
          <form className="flex flex-col gap-6">
            {isSignup && (
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input id="name" type="text" required className="pl-10" />
                </div>
              </div>
            )}

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input id="email" type="email" required className="pl-10" />
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignup && (
                  <a href="#" className="ml-auto text-sm underline">Forgot your password?</a>
                )}
              </div>
              <PasswordInput />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">{isSignup ? "Create Account" : "Sign in"}</Button>

              <div className="relative flex items-center my-3">
                <span className="flex-grow h-px bg-gray-300"></span>
                <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
                <span className="flex-grow h-px bg-gray-300"></span>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <img src="google-icon.svg" className="w-5 h-5" />
                  Google
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <img src="microsoft-icon.svg" className="w-5 h-5" />
                  Microsoft
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              {isSignup ? (
                <>Already have an account? <Link to="/signin" className="underline underline-offset-4 text-gray-500 hover:text-gray-700 font-medium">Sign in</Link></>
              ) : (
                <>Don't have an account? <Link to="/signup" className="underline underline-offset-4 text-gray-500 hover:text-gray-700 font-medium">Sign up</Link></>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
