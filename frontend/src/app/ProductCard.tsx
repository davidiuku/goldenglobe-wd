import Image from "next/image";
import { Product } from "@/lib/types"
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="flex gap-4 p-4 shadow-md w-full max-w-xl">
            <Link href={`/products/${product._id}`} className="w-32 h-32 relative">

                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </Link>
            <div className="flex flex-col">
                <Link href={`/products/${product._id}`}>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                </Link>
                <p className="text-sm text-gray-400">{product.description}</p>
                <p className="text-2xl font-bold mt-5">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
