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
		<>
			<div className="sticky top-0 z-10">
				<Banner />
				<Navbar />
			</div>
			{children}
			<Footer />
		</>
	);
};

export default ShopLayout;
