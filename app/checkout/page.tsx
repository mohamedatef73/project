// 'use client';

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/hooks/use-cart';
// import { formatPrice } from '@/lib/utils';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// // import { useToast } from '@/components/ui/use-toast';

// export default function CheckoutPage() {
//   const { items, total, clearCart } = useCart();
//   const router = useRouter();
//   // const { toast } = useToast();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulate order processing
//     setTimeout(() => {
//       clearCart();
//       // toast({
//       //   title: 'Order Completed',
//       //   description: 'Thank you for your purchase!',
//       // });
//       router.push('/');
//     }, 1500);
//   };

//   // if (items.length === 0) {
//   //   router.push('/cart');
//   //   return null;
//   // }
//   useEffect(() => {
//     if (items.length === 0) {
//       router.push('/cart');
//     }
//   }, [items.length, router]); // Add dependency array

//   // Show loading state while redirecting
//   if (items.length === 0) {
//     return null; // Or a loading spinner
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div>
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     First Name
//                   </label>
//                   <Input required />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Last Name
//                   </label>
//                   <Input required />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Email Address
//                 </label>
//                 <Input type="email" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Street Address
//                 </label>
//                 <Input required />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City</label>
//                   <Input required />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Postal Code
//                   </label>
//                   <Input required />
//                 </div>
//               </div>
//               <Button type="submit" className="w-full">
//                 Complete Order
//               </Button>
//             </form>
//           </Card>
//         </div>
//         <div>
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="space-y-4">
//               {items.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>
//                   <p className="font-medium">
//                     {formatPrice(item.price * item.quantity)}
//                   </p>
//                 </div>
//               ))}
//               <div className="border-t pt-4">
//                 <div className="flex justify-between font-semibold">
//                   <span>Total</span>
//                   <span>{formatPrice(total())}</span>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check cart items after component mounts
    if (items.length === 0) {
      router.push('/cart');
    } else {
      setIsLoading(false);
    }
  }, [items.length, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearCart();
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      console.error('Error processing order:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <Input required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Street Address
                </label>
                <Input required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <Input required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Complete Order'}
              </Button>
            </form>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total())}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}