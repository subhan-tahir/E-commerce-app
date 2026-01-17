'use client';

import { Button } from "@/components/ui/button";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // call backend payment intent here
    console.log("Stripe payment submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 border rounded-lg">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <Button
        type="submit"
        disabled={!stripe}
        className="w-full py-6 text-base font-semibold rounded-xl"
      >
        Pay with Stripe
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Secure payment powered by Stripe
      </p>
    </form>
  );
}
