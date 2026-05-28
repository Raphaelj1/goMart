import VendorLayout from '@/components/vendor/Layout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'GoMart. - Store Dashboard',
	description: 'GoMart. - Store Dashboard',
};

const RootVendorLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<VendorLayout>{children}</VendorLayout>
		</>
	);
};

export default RootVendorLayout;
