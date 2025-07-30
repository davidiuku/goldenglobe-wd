'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import api from '@/lib/axios';
import { Product } from '@/lib/types'
import { ChangeEvent, FormEvent } from 'react';


const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    countInStock: '',
    itemSpecifications: [{ label: '', value: ''}],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('spec-')) {
      const [_, index, key] = name.split('-');
      const updatedSpecs = [...newProduct.itemSpecifications];
      updatedSpecs[parseInt(index)][key as 'value'] = value;
      setNewProduct({ ...newProduct, itemSpecifications: updatedSpecs });
    }
    console.log(newProduct)
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  const addSpecification = () => {
    setNewProduct((prev) => ({
      ...prev,
      itemSpecifications: [...prev.itemSpecifications, { label: '', value: ''}],
    }));
  };

  const removeSpecification = (indexToRemove: number) => {
    setNewProduct((prev) => ({
      ...prev,
      itemSpecifications: prev.itemSpecifications.filter((_, i) => i !== indexToRemove)
    }));
  }

  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    try {
      await api.post('/products', newProduct, {headers: { Authorization: `Bearer ${user.token}`}
      });
      setShowForm(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        countInStock: '',
        itemSpecifications: [{ label: '', value: ''}],
      });
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  }

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
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {showForm ? 'Cancel' : 'Create Product'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateProduct} className="mb-6 grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleChange}
            className="col-span-2 border rounded px-3 py-2"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="countInStock"
            type="number"
            placeholder="Stock"
            value={newProduct.countInStock}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={handleChange}
            className="col-span-2 border rounded px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
            className="col-span-2 border rounded px-3 py-2"
            required
          />

          <div className="col-span-2">
            <h3 className="text-md font-semibold mb-2">Item Specifications</h3>
            {newProduct.itemSpecifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name={`spec-${index}-label`}
                  value={spec.label}
                  onChange={handleChange}
                  placeholder="Label"
                  className="flex-grow border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name={`spec-${index}-value`}
                  value={spec.value}
                  onChange={handleChange}
                  placeholder="Value"
                  className="flex-grow border rounded px-3 py-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="text-red-600 px-2 py-1 text-lg font-bold hover:text-red-800"
                  title="Remove specification"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="mt-2 px-3 py-1 text-sm rounded hover:bg-gray-300"
            >
              + Add Specification
            </button>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Product
          </button>
        </form>
      )}

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
