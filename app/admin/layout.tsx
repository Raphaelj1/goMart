import React from 'react';
import { Metadata } from 'next';
import AdminLayout from '@/components/admin/Layout';
import { currentUser } from '@clerk/nextjs/server';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
	title: 'GoMart. - Admin',
	description: 'GoMart. - Admin',
};

const RootAdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser();

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<SignIn fallbackRedirectUrl="/admin" />
			</div>
		);
	}

	return (
		<>
			<AdminLayout>{children}</AdminLayout>
		</>
	);
};

export default RootAdminLayout;
