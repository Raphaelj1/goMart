'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { productDummyData } from '@/constants';

export default function StoreManageProducts() {
	const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

	const [loading, setLoading] = useState<boolean>(true);

	const [products, setProducts] = useState<Product[]>([]);

	const toggleStock = async (productId: string): Promise<void> => {
		console.log('Toggling stock status for product ID:', productId);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		setProducts((prevProducts) =>
			prevProducts.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p)),
		);
	};

	useEffect(() => {
		const fetchProducts = async (): Promise<void> => {
			setProducts(productDummyData as unknown as Product[]);
			setLoading(false);
		};

		fetchProducts();
	}, []);

	if (loading) return <Loading />;

	return (
		<>
			<h1 className="text-2xl text-slate-500 mb-5">
				Manage <span className="text-slate-800 font-medium">Products</span>
			</h1>

			<div className="overflow-x-auto max-w-5xl ring-1 ring-slate-200 rounded-lg shadow-sm">
				<table className="w-full text-left border-collapse text-sm">
					<thead className="bg-slate-50 text-gray-700 uppercase tracking-wider text-xs font-semibold">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3 hidden md:table-cell">Description</th>
							<th className="px-4 py-3 hidden md:table-cell">MRP</th>
							<th className="px-4 py-3">Price</th>
							<th className="px-4 py-3 text-center">Actions</th>
						</tr>
					</thead>
					<tbody className="text-slate-700 divide-y divide-gray-200 bg-white">
						{products.map((product) => (
							<tr
								key={product.id}
								className="hover:bg-gray-50 transition-colors duration-150"
							>
								<td className="px-4 py-3">
									<div className="flex gap-3 items-center font-medium text-slate-800">
										{product.images && product.images.length > 0 && (
											<Image
												width={40}
												height={40}
												className="p-1 shadow-sm rounded border border-gray-100 cursor-pointer object-cover aspect-square"
												src={product.images[0]}
												alt={product.name || 'Product image'}
											/>
										)}
										<span className="truncate max-w-[180px]">
											{product.name}
										</span>
									</div>
								</td>
								<td className="px-4 py-3 max-w-md text-slate-500 hidden md:table-cell truncate">
									{product.description}
								</td>
								<td className="px-4 py-3 hidden md:table-cell text-slate-400 line-through">
									{currency}
									{product.mrp.toLocaleString()}
								</td>
								<td className="px-4 py-3 font-semibold text-slate-800">
									{currency}
									{product.price.toLocaleString()}
								</td>
								<td className="px-4 py-3 text-center">
									<div className="flex justify-center items-center">
										<label className="relative inline-flex items-center cursor-pointer text-gray-900 select-none">
											<input
												type="checkbox"
												className="sr-only peer"
												onChange={() => {
													toast.promise(toggleStock(product.id), {
														loading: 'Updating data...',
														success: 'Inventory updated!',
														error: 'Failed to update stock state.',
													});
												}}
												checked={product.inStock}
											/>
											<div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
											<span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4 shadow-sm" />
										</label>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
