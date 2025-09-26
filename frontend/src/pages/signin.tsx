import { AuthForm } from "@/components/auth-form"
import LogoHome from "@/components/logo"

export default function SigninPage() {
    return (
        <div className="bg-muted h-screen flex flex-col items-center">
            <div className="w-full max-w-sm py-16 space-y-6">
                <LogoHome />
                <AuthForm type="signin" />
            </div>
        </div>
    )
}