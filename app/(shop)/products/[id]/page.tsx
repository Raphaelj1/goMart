import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import ProductDetails from '@/components/product/ProductDetails';
import ProductDescription from '@/components/product/ProductDescription';
// import ProductSkeleton from '@/components/product/ProductSkeleton'; // Create this simple placeholder skeleton
import Loading from '@/components/Loading';
import { productDummyData } from '@/constants';

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

interface ProductContentProps {
	productId: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ProductContent({ productId }: ProductContentProps) {
	// fetch from backend
	const product = productDummyData.find((product) => product.id === productId) as Product;

	await delay(100); // Simulate server data-fetching delay

	if (!product) {
		redirect('/shop');
	}

	return (
		<>
			<div className="text-gray-600 text-sm mt-8 mb-5">
				Home / Products / {product.category}
			</div>

			<ProductDetails product={product} />
			<ProductDescription product={product} />
		</>
	);
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;

	return (
		<div className="mx-6">
			<div className="max-w-7xl mx-auto">
				<Suspense key={id} fallback={<Loading />}>
					<ProductContent productId={id} />
				</Suspense>
			</div>
		</div>
	);
}
