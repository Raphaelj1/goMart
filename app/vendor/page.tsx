import { Suspense } from 'react';
import Image from 'next/image';
import { dummyStoreDashboardData } from '@/constants';
import Loading from '@/components/Loading';
import {
	CircleDollarSignIcon,
	ShoppingBasketIcon,
	StarIcon,
	TagsIcon,
	LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardCard {
	title: string;
	value: string | number;
	icon: LucideIcon;
}

async function DashboardContent() {
	const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

	// db call
	// count no of products

	// Test data
	const dashboardData = dummyStoreDashboardData as unknown as DashboardData;

	const dashboardCardsData: DashboardCard[] = [
		{ title: 'Total Products', value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
		{
			title: 'Total Earnings',
			value: currency + dashboardData.totalEarnings.toLocaleString(),
			icon: CircleDollarSignIcon,
		},
		{ title: 'Total Orders', value: dashboardData.totalOrders, icon: TagsIcon },
		{ title: 'Total Ratings', value: dashboardData.ratings.length, icon: StarIcon },
	];

	return (
		<div className="text-slate-500 mb-28">
			<h1 className="text-2xl">
				Vendor <span className="text-slate-800 font-medium">Dashboard</span>
			</h1>

			<div className="flex flex-wrap gap-5 my-10 mt-4">
				{dashboardCardsData.map((card) => (
					<div
						key={card.title}
						className="flex items-center gap-11 border border-slate-200 p-3 px-6 rounded-lg min-w-60"
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

			<h2 className="text-xl font-medium text-slate-700 mt-10">Total Reviews</h2>

			<div className="mt-5">
				{dashboardData.ratings.map((review) => (
					<div
						key={review.id}
						className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-6 border-b border-slate-200 text-sm text-slate-600 max-w-5xl"
					>
						<div>
							<div className="flex gap-3">
								{review.user?.image && (
									<Image
										src={review.user.image}
										alt={review.user.name || 'user avatar'}
										className="w-10 aspect-square rounded-full object-cover"
										width={100}
										height={100}
									/>
								)}
								<div>
									<p className="font-medium text-slate-800">
										{review.user?.name}
									</p>
									<p className="font-light text-slate-400">
										{new Date(review.createdAt).toDateString()}
									</p>
								</div>
							</div>
							<p className="mt-3 text-slate-500 max-w-xl leading-6">
								{review.review}
							</p>
						</div>

						<div className="flex flex-col justify-between gap-6 w-2/5 sm:items-end">
							<div className="flex flex-col sm:items-end">
								<p className="text-slate-400 text-xs">{review.product?.category}</p>
								<p className="font-medium text-slate-700 text-right">
									{review.product?.name}
								</p>
								<div className="flex items-center mt-1">
									{Array(5)
										.fill('')
										.map((_, index) => (
											<StarIcon
												key={index}
												size={17}
												className="text-transparent mt-0.5"
												fill={
													review.rating >= index + 1
														? '#00C950'
														: '#D1D5DB'
												}
											/>
										))}
								</div>
							</div>
							{review.product?.id && (
								<Link
									href={`/products/${review.product.id}`}
									className="bg-slate-100 px-5 py-2 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-all active:scale-95"
								>
									View Product
								</Link>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default async function DashboardPage() {
	return (
		<Suspense fallback={<Loading />}>
			<DashboardContent />
		</Suspense>
	);
}
