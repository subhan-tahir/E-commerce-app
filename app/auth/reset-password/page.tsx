import ResetPasswordForm from "./ResetPasswordForm";
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Reset Password",
    description: "Access your E-store account to manage orders, track shipments, and enjoy personalized shopping experiences. Log in now to explore exclusive deals and offers!",
}
export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <ResetPasswordForm />
        </div>
    );
}
