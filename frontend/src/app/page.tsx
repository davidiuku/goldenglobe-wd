'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Product } from '@/lib/types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-2">
            <strong>{product.name}</strong>: ${product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
