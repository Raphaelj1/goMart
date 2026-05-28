'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon, LucideIcon } from 'lucide-react';

interface StoreSidebarProps {
	storeInfo: Store;
}

interface SidebarLink {
	name: string;
	href: string;
	icon: LucideIcon;
}

const VendorSidebar = ({ storeInfo }: StoreSidebarProps) => {
	const pathname = usePathname();

	const sidebarLinks: SidebarLink[] = [
		{ name: 'Dashboard', href: '/vendor', icon: HomeIcon },
		{ name: 'Add Product', href: '/vendor/products/new', icon: SquarePlusIcon },
		{ name: 'Manage Product', href: '/vendor/products/manage', icon: SquarePenIcon },
		{ name: 'Orders', href: '/vendor/orders', icon: LayoutListIcon },
	];

	return (
		<div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60">
			{storeInfo && (
				<div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
					{storeInfo.logo && (
						<Image
							className="w-14 h-14 rounded-full shadow-md object-cover"
							src={storeInfo.logo}
							alt={storeInfo.name || 'store logo'}
							width={80}
							height={80}
						/>
					)}
					<p className="text-slate-700 font-medium">{storeInfo.name}</p>
				</div>
			)}

			<div className="max-sm:mt-6">
				{sidebarLinks.map((link) => {
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${
								isActive ? 'bg-slate-100 text-slate-700 font-medium' : ''
							}`}
						>
							<link.icon size={18} className="sm:ml-5" />
							<span className="max-sm:hidden">{link.name}</span>
							{isActive && (
								<span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l" />
							)}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default VendorSidebar;
