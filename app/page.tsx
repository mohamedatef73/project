'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UtensilsCrossed, Gift, Search } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { products } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; // Correct import


const categories = [
  {
    id: 'food',
    name: 'Food & Catering',
    icon: UtensilsCrossed,
  },
  {
    id: 'wedding',
    name: 'Wedding Essentials',
    icon: Gift,
  },
];

export default function Home() {
  const { addItem } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('food');
  const [searchQuery, setSearchQuery] = useState(''); // Add search state

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem(product);
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
      router.push('/cart');
    }
  };
  const filteredProducts = products.filter((product) => {
    // Combine category filter and search filter
    return (
      product.category === activeCategory &&  // Category filter
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Search filter
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Wedding Essentials & Services
        </h1>

        <Tabs value={activeCategory} 
        
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Stock: {product.stock}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full mt-4"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* <Tabs 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((product) => product.category === category.id)
                  .map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Stock: {product.stock}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-full mt-4"
                          disabled={product.stock === 0}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs> */}
      </div>
    </main>
  );
}