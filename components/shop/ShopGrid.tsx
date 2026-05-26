'use client';

import ProductCard from '@/components/product/ProductCard';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

interface ShopGridProps {
	initialSearch: string;
}

const ShopGrid = ({ initialSearch }: ShopGridProps) => {
	const router = useRouter();
	const products = useAppSelector((state) => state.product.list);

	const filteredProducts = initialSearch
		? products.filter((product) =>
				product.name?.toLowerCase().includes(initialSearch.toLowerCase()),
			)
		: products;

	return (
		<>
			<h1
				onClick={() => router.push('/shop')}
				className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer select-none"
			>
				{initialSearch && <MoveLeftIcon size={20} />} All{' '}
				<span className="text-slate-700 font-medium">Products</span>
			</h1>
			<div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
};

export default ShopGrid;
