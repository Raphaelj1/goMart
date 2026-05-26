import { Suspense } from 'react';
import ShopGrid from '@/components/shop/ShopGrid';
import Loading from '@/components/Loading';

interface ShopPageProps {
	searchParams: Promise<{ search?: string }>;
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
	const resolvedParams = await searchParams;
	const currentSearch = resolvedParams.search || '';

	return (
		<div className="min-h-[70vh] mx-6">
			<div className="max-w-7xl mx-auto">
				<Suspense fallback={<Loading />}>
					<ShopGrid initialSearch={currentSearch} />
				</Suspense>
			</div>
		</div>
	);
};

export default ShopPage;
