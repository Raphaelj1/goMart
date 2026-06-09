import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Loading from '../Loading';
import AdminNavbar from './Navbar';
import AdminSidebar from './Sidebar';
import { checkIsAdmin } from '@/lib/actions/auth';

interface AdminLayoutProps {
	children: React.ReactNode;
}

async function AdminLayoutContent({ children }: AdminLayoutProps) {
	const { isAdmin } = await checkIsAdmin();

	if (!isAdmin) redirect('/');

	return (
		<div className="flex flex-col h-screen">
			<AdminNavbar />
			<div className="flex flex-1 items-start h-full overflow-y-scroll scrollbar-none">
				<AdminSidebar />
				<div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400">
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
