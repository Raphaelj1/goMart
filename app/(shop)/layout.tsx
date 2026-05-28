import Banner from '@/components/home/Banner';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'GoMart. - Multi-vendor Online Marketplace',
	description:
		'GoMart. Buy. Sell. Scale. A modern marketplace where vendors grow faster and customers discover better products in one seamless platform.',
};

const ShopLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-screen flex flex-col overflow-auto">
			<div className="sticky top-0 z-10">
				<Banner />
				<Navbar />
			</div>

			<div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400">
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default ShopLayout;
