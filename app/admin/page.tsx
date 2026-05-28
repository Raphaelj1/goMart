'use client';

import { useEffect, useState } from 'react';
import { dummyAdminDashboardData } from '@/constants';
import Loading from '@/components/Loading';
import OrdersAreaChart from '@/components/charts/OrdersAreaChart';
import {
	CircleDollarSignIcon,
	ShoppingBasketIcon,
	StoreIcon,
	TagsIcon,
	LucideIcon,
} from 'lucide-react';

interface AdminCardData {
	title: string;
	value: string | number;
	icon: LucideIcon;
}

export default function AdminDashboard() {
	const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

	const [loading, setLoading] = useState<boolean>(true);

	const [dashboardData, setDashboardData] = useState<AdminDashboardData>({
		products: 0,
		revenue: 0,
		orders: 0,
		stores: 0,
		allOrders: [],
	});

	const dashboardCardsData: AdminCardData[] = [
		{ title: 'Total Products', value: dashboardData.products, icon: ShoppingBasketIcon },
		{
			title: 'Total Revenue',
			value: currency + Number(dashboardData.revenue).toLocaleString(),
			icon: CircleDollarSignIcon,
		},
		{ title: 'Total Orders', value: dashboardData.orders, icon: TagsIcon },
		{ title: 'Total Stores', value: dashboardData.stores, icon: StoreIcon },
	];

	useEffect(() => {
		const fetchDashboardData = async (): Promise<void> => {
			setDashboardData(dummyAdminDashboardData as unknown as AdminDashboardData);
			setLoading(false);
		};

		fetchDashboardData();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="text-slate-500">
			<h1 className="text-2xl">
				Admin <span className="text-slate-800 font-medium">Dashboard</span>
			</h1>

			<div className="flex flex-wrap gap-5 my-10 mt-4">
				{dashboardCardsData.map((card) => (
					<div
						key={card.title}
						className="flex items-center gap-10 border border-slate-200 p-3 px-6 rounded-lg min-w-60"
					>
						<div className="flex flex-col gap-3 text-xs">
							<p>{card.title}</p>
							<b className="text-2xl font-medium text-slate-700">{card.value}</b>
						</div>
						<card.icon
							size={50}
							className="w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full shrink-0"
						/>
					</div>
				))}
			</div>

			<OrdersAreaChart allOrders={dashboardData.allOrders} />
		</div>
	);
}
