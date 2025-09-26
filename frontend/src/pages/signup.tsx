import { AuthForm } from "@/components/auth-form";
import LogoHome from "@/components/logo";

export default function SignupPage() {
    return (
        <div className="bg-muted h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
                <LogoHome />
                <AuthForm type="signup" />
            </div>
        </div>
    )
}
