'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import { Product } from '@/lib/types';

const ProductPage = () => {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
        const { data } = await api.get(`/products/${productId}`);
        setProduct(data);
    } catch (error) {
        console.error('Failed to fetch product', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product ? product.name : 'Loading...'}</h1>
      <img src={product ? product.imageUrl : 'Loading...'} alt={product ? product.name : 'Loading...'} className="w-full max-w-md mb-4" />
      <p className="text-lg mb-2">{product ? product.description : 'Loading...'}</p>
      <p className="text-xl font-semibold mb-2">${product ? product.price : 'Loading...'}</p>
      <p className="mb-4">In stock: {product ? product.countInStock : 'Loading...'}</p>
      {product && product.itemSpecifications && product.itemSpecifications.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Specifications</h2>
          <ul className="list-disc list-inside">
            {product.itemSpecifications.map((spec, index) => (
              <li key={index}><strong>{spec.label}:</strong> {spec.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
