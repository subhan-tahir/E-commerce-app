import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/app/lib/routes';
import Link from 'next/link';
const VerifyForm = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const searchParams = useSearchParams();

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/verify-email', { email, code });
            console.log('response...',response);
            if (response.data.success) {
                toast.success('Email verified successfully!');
                router.push(routes.login);
            } else {
                toast.error(response.data.message || 'Invalid code.');
            }
        } catch (err) {
            toast.error('Verification failed.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const email = searchParams.get('email');
        if (email) {
            setEmail(email);
        }
    }, []);
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
            />
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
                Didn’t receive the code? <Link href={routes.resendEmail} className="text-primary hover:underline">Resend Code</Link>
            </p>
        </form>
    )
}
export default VerifyForm;
