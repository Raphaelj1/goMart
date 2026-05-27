'use client';

import Image from 'next/image';
import Counter from '@/components/Counter';
import OrderSummary from '@/components/order/OrderSummary';
import PageTitle from '@/components/layout/PageTitle';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteItemFromCart } from '@/store/slices/cartSlice';
import { Trash2Icon } from 'lucide-react';

const Cart = () => {
	const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

	const { cartItems } = useAppSelector((state) => state.cart);
	const products = useAppSelector((state) => state.product.list);
	const dispatch = useAppDispatch();

	let totalPrice = 0;
	const cartArray: CartArrayItem[] = [];

	if (products.length > 0) {
		for (const [key, value] of Object.entries(cartItems)) {
			const quantity = Number(value);
			const product = products.find((product) => product.id === key);

			if (product && quantity > 0) {
				cartArray.push({
					...product,
					quantity: quantity,
				});
				totalPrice += product.price * quantity;
			}
		}
	}

	const handleDeleteItemFromCart = (productId: string) => {
		dispatch(deleteItemFromCart({ productId }));
	};

	return cartArray.length > 0 ? (
		<div className="min-h-screen mx-6 text-slate-800">
			<div className="max-w-7xl mx-auto ">
				<PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

				<div className="flex items-start justify-between gap-5 max-lg:flex-col">
					<table className="w-full max-w-4xl text-slate-600 table-auto">
						<thead>
							<tr className="max-sm:text-sm">
								<th className="text-left">Product</th>
								<th>Quantity</th>
								<th>Total Price</th>
								<th className="max-md:hidden">Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartArray.map((item) => (
								<tr key={item.id} className="space-x-2">
									<td className="flex gap-3 my-4">
										<div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
											{item.images && item.images.length > 0 && (
												<Image
													src={item.images[0]}
													className="h-14 w-auto"
													alt={item.name || 'cart item view'}
													width={45}
													height={45}
												/>
											)}
										</div>
										<div>
											<p className="max-sm:text-sm">{item.name}</p>
											<p className="text-xs text-slate-500">
												{item.category}
											</p>
											<p>
												{currency}
												{item.price}
											</p>
										</div>
									</td>
									<td className="text-center">
										<Counter productId={item.id} />
									</td>
									<td className="text-center">
										{currency}
										{(item.price * item.quantity).toLocaleString()}
									</td>
									<td className="text-center max-md:hidden">
										<button
											onClick={() => handleDeleteItemFromCart(item.id)}
											className=" text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
										>
											<Trash2Icon size={18} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<OrderSummary totalPrice={totalPrice} items={cartArray} />
				</div>
			</div>
		</div>
	) : (
		<div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
			<div className="flex flex-col items-center">
				<h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
				<p className="text-base mt-2 sm:text-lg">
					Looks like you haven&apos;t added anything yet...
				</p>
			</div>
		</div>
	);
};

export default Cart;
