'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

	const rating =
		product.rating && product.rating.length > 0
			? Math.round(
					product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
						product.rating.length,
				)
			: 0;

	const averageRating: number = product.rating?.length
		? product.rating?.reduce((acc, review, index, array) => {
				const sum = acc + review.rating;

				if (index === array.length - 1) {
					return sum / array.length;
				}
				return sum;
			}, 0)
		: 0;

	return (
		<Link href={`/products/${product.id}`} className="w-full group sm:w-auto max-xl:mx-auto">
			<div className="bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center">
				{product.images && product.images.length > 0 && (
					<Image
						width={500}
						height={500}
						className="max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300"
						src={product.images[0]}
						alt={product.name || 'product_img'}
					/>
				)}
			</div>

			<div className="hidden sm:flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60">
				<div>
					<p className="text-sm font-medium">{product.name}</p>

					{/* <p className="text-xs text-slate-500 mt-1 line-clamp-2">
						{product.description}
					</p> */}

					<div className="flex gap-2 mt-1">
						<div className="flex">
							{Array(5)
								.fill('')
								.map((_, index) => (
									<StarIcon
										key={index}
										size={14}
										className="text-transparent mt-0.5"
										fill={rating >= index + 1 ? '#00C950' : '#D1D5DB'}
									/>
								))}
						</div>
						{/* <p className="text-xs">{averageRating.toFixed(2)}</p> */}
					</div>
				</div>

				<p className="text-xs text-nowrap font-bold text-slate-600 mr-1">
					{currency} <span className="text-lg">{product.price}</span>
				</p>
			</div>

			{/* Mobile */}
			<div className="flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60 sm:hidden">
				<div>
					<p className="text-sm font-medium">{product.name}</p>
					<div className="flex">
						{Array(5)
							.fill('')
							.map((_, index) => (
								<StarIcon
									key={index}
									size={12}
									className="text-transparent mt-0.5"
									fill={rating >= index + 1 ? '#00C950' : '#D1D5DB'}
								/>
							))}
					</div>
					<p className="text-xs text-nowrap font-bold text-slate-600 mr-1">
						{currency} <span className="text-lg">{product.price}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
