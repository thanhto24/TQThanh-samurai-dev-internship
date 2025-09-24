import { AuthForm } from "../components/auth-form";

export default function SigninPage() {
    return (
        <div className="bg-muted h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
                <AuthForm type="signin" />
            </div>
        </div>
    )
}