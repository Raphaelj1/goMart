import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'GoMart. - Store Dashboard',
	description: 'GoMart. - Store Dashboard',
};

const RootVendorLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default RootVendorLayout;
