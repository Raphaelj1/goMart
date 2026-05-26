'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, StarIcon } from 'lucide-react';

interface ProductDescriptionProps {
	product: Product;
}

type TabType = 'Description' | 'Reviews';

const ProductDescription = ({ product }: ProductDescriptionProps) => {
	const [selectedTab, setSelectedTab] = useState<TabType>('Description');

	return (
		<div className="my-18 text-sm text-slate-600">
			{/* Tabs */}
			<div className="flex border-b border-slate-200 mb-6 max-w-2xl">
				{(['Description', 'Reviews'] as TabType[]).map((tab, index) => (
					<button
						className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold text-slate-800' : 'text-slate-400'} px-3 py-2 font-medium`}
						key={index}
						onClick={() => setSelectedTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Description */}
			{selectedTab === 'Description' && <p className="max-w-xl">{product.description}</p>}

			{/* Reviews */}
			{selectedTab === 'Reviews' && (
				<div className="flex flex-col gap-3 mt-14">
					{product.rating?.map((item) => (
						<div key={item.id} className="flex gap-5 mb-10">
							{item.user?.image && (
								<Image
									src={item.user.image}
									alt={item.user.name || 'user avatar'}
									className="size-10 rounded-full object-cover"
									width={100}
									height={100}
								/>
							)}
							<div>
								<div className="flex items-center">
									{Array(5)
										.fill('')
										.map((_, index) => (
											<StarIcon
												key={index}
												size={18}
												className="text-transparent mt-0.5"
												fill={
													item.rating >= index + 1 ? '#00C950' : '#D1D5DB'
												}
											/>
										))}
								</div>
								<p className="text-sm max-w-lg my-4">{item.review}</p>
								<p className="font-medium text-slate-800">{item.user?.name}</p>
								<p className="mt-3 font-light text-slate-400">
									{new Date(item.createdAt).toDateString()}
								</p>
							</div>
						</div>
					))}
					{(!product.rating || product.rating.length === 0) && (
						<p className="text-slate-400 italic">No reviews yet for this product.</p>
					)}
				</div>
			)}

			{/* Store Page */}
			{product.store && (
				<div className="flex gap-3 mt-14">
					{product.store.logo && (
						<Image
							src={product.store.logo}
							alt={product.store.name || 'store logo'}
							className="size-11 rounded-full ring ring-slate-400 object-cover"
							width={100}
							height={100}
						/>
					)}
					<div>
						<p className="font-medium text-slate-600">
							Product by {product.store.name}
						</p>
						<Link
							href={`/shop/${product.store.username}`}
							className="flex items-center gap-1.5 text-green-500 hover:text-green-600 transition"
						>
							view store <ArrowRight size={14} />
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDescription;
