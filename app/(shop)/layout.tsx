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
			<div>Banner</div>
			<div>Navbar</div>
			{children}
			<div>Footer</div>
		</>
	);
};

export default ShopLayout;
