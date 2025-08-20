"use client"

import { routes } from "@/app/lib/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function  ResendEmailPage (){
    const navigate = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            const response = await axios.post('/api/auth/resend-email', { email });

            
            if (response.data.success) {
                navigate.push( `${routes.verifyEmail}?email=${encodeURIComponent(email)}`);
                toast.success(response.data.message || 'Verification email sent successfully.');

            } else {
                toast.error(response.data.message || 'Failed to send verification email.');
            }
        } catch (error) {
            console.error('Error resending email:', error);
            alert('An error occurred while resending the email.');
        }
    }
    return (
        <div>
            <h1>Resend Email</h1>
            <p>If you haven&apos;t received the verification email&apos;s you can request a new one.</p>
            <form onSubmit={(handleSubmit)} className="space-y-6">
                <input type="email" name="email" placeholder="Enter your email" required className="input input-bordered w-full max-w-xs" />
                <button type="submit" className="btn btn-primary w-full">Resend Verification Email</button>
            </form>
        </div>

    )
}