import { Suspense } from 'react';
import ProductCard from '@/components/product/ProductCard'; // Aligned to your components folder path
import { MailIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { dummyStoreData, productDummyData } from '@/constants';

interface StoreShopPageProps {
	params: Promise<{ username: string }>;
}

interface StoreContentProps {
	username: string;
}

async function StoreContent({ username }: StoreContentProps) {
	// fetch from server

	const storeInfo = dummyStoreData as unknown as Store;
	const products = productDummyData as unknown as Product[];

	return (
		<div className="min-h-[70vh] mx-6">
			{storeInfo && (
				<div className="max-w-7xl mx-auto bg-slate-50 rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-xs">
					{storeInfo.logo && (
						<Image
							src={storeInfo.logo}
							alt={storeInfo.name || 'store logo'}
							className="size-32 sm:size-38 object-cover border-2 border-slate-100 rounded-md"
							width={200}
							height={200}
						/>
					)}
					<div className="text-center md:text-left">
						<h1 className="text-3xl font-semibold text-slate-800">{storeInfo.name}</h1>
						<p className="text-sm text-slate-600 mt-2 max-w-lg">
							{storeInfo.description}
						</p>
						<div className="text-xs text-slate-500 mt-4 space-y-1"></div>
						<div className="space-y-2 text-sm text-slate-500">
							<div className="flex items-center justify-center md:justify-start">
								<MapPinIcon className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
								<span>{storeInfo.address}</span>
							</div>
							<div className="flex items-center justify-center md:justify-start">
								<MailIcon className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
								<span>{storeInfo.email}</span>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="max-w-7xl mx-auto mb-40">
				<h1 className="text-2xl mt-12">
					Shop <span className="text-slate-800 font-medium">Products</span>
				</h1>
				<div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default async function StoreShop({ params }: StoreShopPageProps) {
	const { username } = await params;

	return (
		<Suspense key={username} fallback={<Loading />}>
			<StoreContent username={username} />
		</Suspense>
	);
}
