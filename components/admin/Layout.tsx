import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Loading from '../Loading';
import AdminNavbar from './Navbar';
import AdminSidebar from './Sidebar';

interface AdminLayoutProps {
	children: React.ReactNode;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function AdminLayoutContent({ children }: AdminLayoutProps) {
	// auth();
	// db fetch
	// isAdmin

	await delay(500);

	// Test
	const isAdmin = true;

	if (!isAdmin) redirect('/');

	return (
		<div className="flex flex-col h-screen">
			<AdminNavbar />
			<div className="flex flex-1 items-start h-full overflow-y-scroll scrollbar-none">
				<AdminSidebar />
				<div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500">
					{children}
				</div>
			</div>
		</div>
	);
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<Suspense fallback={<Loading />}>
			<AdminLayoutContent>{children}</AdminLayoutContent>
		</Suspense>
	);
}
