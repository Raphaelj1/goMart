import { Suspense } from 'react';
import ShopGrid from '@/components/shop/ShopGrid';
import ShopSkeleton from '@/components/shop/ShopSkeleton';

interface ShopPageProps {
	searchParams: Promise<{ search?: string }>;
}

interface ShopContentProps {
	currentSearch: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ShopContent({ currentSearch }: ShopContentProps) {
	// fetch products

	await delay(500); // simulate server delay

	return <ShopGrid initialSearch={currentSearch} />;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
	const resolvedParams = await searchParams;
	const currentSearch = resolvedParams.search || '';

	return (
		<div className="min-h-[70vh] mx-6">
			<div className="max-w-7xl mx-auto">
				<Suspense key={currentSearch} fallback={<ShopSkeleton />}>
					<ShopContent currentSearch={currentSearch} />
				</Suspense>
			</div>
		</div>
	);
}
