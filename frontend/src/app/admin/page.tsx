'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import api from '@/lib/axios';
import { Product } from '@/lib/types'


const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log(user)
  useEffect(() => {
    if (!user) return;

    if (!user.isAdmin) {
      router.push('/');
    }else {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Product Dashboard</h1>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">{product.countInStock}</td>
              <td className="p-2 border">
                <Link href={`/admin/edit/${product._id}`} className="text-blue-600 mr-2">
                  Edit
                </Link>
                <button className="text-red-600 hover:underline" onClick={() => alert('TODO: delete')}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
