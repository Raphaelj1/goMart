import { Suspense } from 'react';
import Link from 'next/link';
import Loading from '../Loading';
import VendorNavbar from './Navbar';
import VendorSidebar from './Sidebar';
import { dummyStoreData } from '@/constants';

interface StoreLayoutProps {
	children: React.ReactNode;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function VendorLayoutContent({ children }: StoreLayoutProps) {
	// auth();
	// db fetch
	// isSeller = if there is store and status is approved

	await delay(500);

	// Test
	const isSeller = true;
	const storeInfo = dummyStoreData as unknown as Store;

	return isSeller ? (
		<div className="flex flex-col h-screen">
			<VendorNavbar />
			<div className="flex flex-1 items-start h-full overflow-y-scroll scrollbar-none">
				<VendorSidebar storeInfo={storeInfo} />
				<div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500">
					{children}
				</div>
			</div>
		</div>
	) : (
		<div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
			<h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">
				This page is only available to registered vendors
			</h1>
			<p className="text-slate-400 mt-2">
				If you&apos;d like to sell products, register your shop to become a vendor
			</p>
			<div className="flex gap-2">
				<Link
					href="/shop"
					className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full hover:bg-slate-800 active:scale-95 transition"
				>
					Continue shopping
				</Link>
				<Link
					href="/become-seller"
					className="bg-transparent text-neutral-600 flex items-center gap-2 mt-8 p-2 px-6 border max-sm:text-sm rounded-full hover:bg-slate-800 hover:text-white active:scale-95 transition"
				>
					Start your shop
				</Link>
			</div>
		</div>
	);
}

export default async function VendorLayout({ children }: StoreLayoutProps) {
	return (
		<Suspense fallback={<Loading />}>
			<VendorLayoutContent>{children}</VendorLayoutContent>
		</Suspense>
	);
}
