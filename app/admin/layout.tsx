import AdminLayout from '@/components/admin/Layout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'GoMart. - Admin',
	description: 'GoMart. - Admin',
};

const RootAdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AdminLayout>{children}</AdminLayout>
		</>
	);
};

export default RootAdminLayout;
