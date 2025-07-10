'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Product } from '@/lib/types'
import Image from 'next/image';
import ProductCard from '../ProductCard';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex justify-center gap-[32px] row-start-2 items-center sm:items-start">
      <ul className="divide-y divide-gray-300">
        {products.map((product) => (
          <li key={product._id} className="w-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductPage;
