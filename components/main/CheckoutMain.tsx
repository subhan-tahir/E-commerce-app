// 'use client';

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import StripeProvider from "../providers/StripeProvider";
// // import { StripePaymentForm } from "../forms/StripePaymentForm";

// export default function CheckoutMain() {
//     return (
//         <div className="max-w-6xl mx-auto px-4 py-10 gap-8">
//             {/* Left Section */}
//             <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//             <div className="lg:col-span-2 space-y-6  grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="">
//                     {/* Shipping Info */}
//                     <Card className="rounded-2xl shadow-sm mb-6">
//                         <CardContent className="p-6 space-y-4">
//                             <h2 className="text-lg font-semibold">Shipping Information</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Input placeholder="First Name" />
//                                 <Input placeholder="Last Name" />
//                                 <Input placeholder="Email Address" />
//                                 <Input placeholder="Phone Number" />
//                                 <Input placeholder="Address" className="md:col-span-2" />
//                                 <Input placeholder="City" />
//                                 <Input placeholder="Postal Code" />
//                             </div>
//                         </CardContent>
//                     </Card>
//                     {/* Payment Info */}
//                     {/* <Card className="rounded-2xl shadow-sm">
//                         <CardContent className="p-6 space-y-4">
//                             <h2 className="text-lg font-semibold">Payment Details</h2>
//                             <Input placeholder="Card Holder Name" />
//                             <Input placeholder="Card Number" />
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Input placeholder="MM / YY" />
//                                 <Input placeholder="CVC" />
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Checkbox />
//                                 <span className="text-sm text-muted-foreground">
//                                     Save card for future payments
//                                 </span>
//                             </div>
//                         </CardContent>
//                     </Card> */}
//                     {/* <StripeProvider>
//                         <StripePaymentForm />
//                     </StripeProvider> */}
//                 </div>

//                 {/* Order Summary */}
//                 <div>
//                     <Card className="rounded-2xl shadow-md sticky top-24">
//                         <CardContent className="p-6 space-y-4">
//                             <h2 className="text-lg font-semibold">Order Summary</h2>
//                             <div className="space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                     <span>Subtotal</span>
//                                     <span>$120.00</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Shipping</span>
//                                     <span>$10.00</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Tax</span>
//                                     <span>$8.00</span>
//                                 </div>
//                             </div>
//                             <Separator />
//                             <div className="flex justify-between font-semibold text-lg">
//                                 <span>Total</span>
//                                 <span>$138.00</span>
//                             </div>
//                             <Button className="w-full py-6 text-base font-semibold rounded-xl">
//                                 Place Order
//                             </Button>
//                             <p className="text-xs text-muted-foreground text-center">
//                                 Secure checkout • SSL Encrypted
//                             </p>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>


//     );
// }

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shippingFormSchema } from "@/app/lib/schemas/auth-schema";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
// import { CartItem } from "@/app/types";
import { CartItem } from "@/types";

type ShippingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function CheckoutMain() {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingForm>({
    resolver: yupResolver(shippingFormSchema),
    mode: "onChange", // isValid updates live
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  // Prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5;
  const tax = subtotal * 0.06;
  const totalAmount = subtotal + shipping;

  const onSubmit = async (data: ShippingForm) => {
    if (!isValid) {
      toast.error("Please fill all shipping fields correctly!");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 2000));
        localStorage.removeItem("cart");
        
      // Success
      setOrderPlaced(true);
      toast.success("Order placed successfully! Payment: COD");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will pay <strong>${totalAmount.toFixed(2)}</strong> on delivery.
        </p>
        <Button
          onClick={() => window.location.assign("/")}
          className="py-3 px-6 rounded-xl"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 gap-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="lg:col-span-2 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <div>
          <Card className="rounded-2xl shadow-sm mb-6">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input {...register("firstName")} placeholder="First Name" />
                <Input {...register("lastName")} placeholder="Last Name" />
                <Input {...register("email")} placeholder="Email Address" />
                <Input {...register("phone")} placeholder="Phone Number" />
                <Input {...register("address")} placeholder="Address" className="md:col-span-2" />
                <Input {...register("city")} placeholder="City" />
                <Input {...register("postalCode")} placeholder="Postal Code" />
                <Input {...register("country")} placeholder="Country" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="justify-start gap-2 py-4"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Placing Order..." : "Cash on Delivery (COD)"}
                </Button>
                <p className="text-sm text-gray-500">
                  You will pay <strong>${totalAmount.toFixed(2)}</strong> when the order is delivered.
                </p>
                <Button variant="outline" className="justify-start gap-2 py-4" disabled>
                  Online Payment (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="rounded-2xl shadow-md sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Secure checkout • SSL Encrypted
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
