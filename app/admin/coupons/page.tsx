'use client';

import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { Trash2Icon } from 'lucide-react';
import { couponDummyData } from '@/constants';

interface CouponFormState {
	code: string;
	description: string;
	discount: string | number;
	forNewUser: boolean;
	forMember: boolean;
	isPublic: boolean;
	expiresAt: Date;
}

export default function AdminCoupons() {
	const [coupons, setCoupons] = useState<Coupon[]>([]);

	const [newCoupon, setNewCoupon] = useState<CouponFormState>({
		code: '',
		description: '',
		discount: '',
		forNewUser: false,
		forMember: false,
		isPublic: false,
		expiresAt: new Date(),
	});

	const handleAddCoupon = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		// Logic to add a coupon

		console.log('Adding new coupon payload:', newCoupon);
		await new Promise((resolve) => setTimeout(resolve, 1000));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		if (name === 'expiresAt') {
			setNewCoupon({ ...newCoupon, expiresAt: value ? new Date(value) : new Date() });
		} else {
			setNewCoupon({
				...newCoupon,
				[name]: type === 'number' ? Number(value) : value,
			});
		}
	};

	const deleteCoupon = async (code: string): Promise<void> => {
		// Logic to delete a coupon

		console.log('Deleting coupon with code:', code);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setCoupons((prev) => prev.filter((c) => c.code !== code));
	};

	useEffect(() => {
		const fetchCoupons = async (): Promise<void> => {
			setCoupons(couponDummyData as unknown as Coupon[]);
		};

		fetchCoupons();
	}, []);

	const safelyFormatDate = (dateParam: Date | string) => {
		try {
			if (typeof dateParam === 'string') {
				return format(parseISO(dateParam), 'yyyy-MM-dd');
			}
			return format(dateParam, 'yyyy-MM-dd');
		} catch (error) {
			console.error(error);
			return 'Invalid Date';
		}
	};

	return (
		<div className="text-slate-500 mb-40">
			<form
				onSubmit={(e) => {
					toast.promise(handleAddCoupon(e), {
						loading: 'Adding coupon...',
						success: 'Coupon added successfully!',
						error: 'Failed to add coupon.',
					});
				}}
				className="max-w-sm text-sm"
			>
				<h2 className="text-2xl">
					Add <span className="text-slate-800 font-medium">Coupons</span>
				</h2>
				<div className="flex gap-2 max-sm:flex-col mt-2">
					<input
						type="text"
						placeholder="Coupon Code"
						className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md text-slate-800"
						name="code"
						value={newCoupon.code}
						onChange={handleChange}
						required
					/>
					<input
						type="number"
						placeholder="Coupon Discount (%)"
						min={1}
						max={100}
						className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md text-slate-800"
						name="discount"
						value={newCoupon.discount}
						onChange={handleChange}
						required
					/>
				</div>
				<input
					type="text"
					placeholder="Coupon Description"
					className="w-full mt-2 p-2 border border-slate-200 outline-slate-400 rounded-md text-slate-800"
					name="description"
					value={newCoupon.description}
					onChange={handleChange}
					required
				/>

				<label>
					<p className="mt-3 text-slate-600 font-medium">Coupon Expiry Date</p>
					<input
						type="date"
						placeholder="Coupon Expires At"
						className="w-full mt-1 p-2 border border-slate-200 outline-slate-400 rounded-md text-slate-800 bg-white"
						name="expiresAt"
						value={safelyFormatDate(newCoupon.expiresAt)}
						onChange={handleChange}
					/>
				</label>

				<div className="mt-5">
					<div className="flex gap-2 mt-3 items-center">
						<label className="relative inline-flex items-center cursor-pointer text-gray-900 select-none">
							<input
								type="checkbox"
								className="sr-only peer"
								name="forNewUser"
								checked={newCoupon.forNewUser}
								onChange={(e) =>
									setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })
								}
							/>
							<div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
							<span className="absolute left-0.5 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 shadow-xs" />
						</label>
						<p className="text-slate-600">For New User</p>
					</div>

					<div className="flex gap-2 mt-3 items-center">
						<label className="relative inline-flex items-center cursor-pointer text-gray-900 select-none">
							<input
								type="checkbox"
								className="sr-only peer"
								name="forMember"
								checked={newCoupon.forMember}
								onChange={(e) =>
									setNewCoupon({ ...newCoupon, forMember: e.target.checked })
								}
							/>
							<div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
							<span className="absolute left-0.5 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 shadow-xs" />
						</label>
						<p className="text-slate-600">For Member</p>
					</div>
				</div>
				<button className="mt-4 p-2 px-10 rounded bg-slate-700 text-white font-medium hover:bg-slate-800 active:scale-95 transition-all">
					Add Coupon
				</button>
			</form>

			{/* List Coupons */}
			<div className="mt-14">
				<h2 className="text-2xl">
					List <span className="text-slate-800 font-medium">Coupons</span>
				</h2>
				<div className="overflow-x-auto mt-4 rounded-lg border border-slate-200 max-w-5xl shadow-sm">
					<table className="min-w-full bg-white text-sm">
						<thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-700">
							<tr>
								<th className="py-3 px-4 text-left">Code</th>
								<th className="py-3 px-4 text-left">Description</th>
								<th className="py-3 px-4 text-left">Discount</th>
								<th className="py-3 px-4 text-left">Expires At</th>
								<th className="py-3 px-4 text-left">New User</th>
								<th className="py-3 px-4 text-left">For Member</th>
								<th className="py-3 px-4 text-left"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200 text-slate-700">
							{coupons.map((coupon) => (
								<tr
									key={coupon.code}
									className="hover:bg-slate-50 transition-colors duration-150"
								>
									<td className="py-3 px-4 font-semibold text-slate-800">
										{coupon.code}
									</td>
									<td className="py-3 px-4 text-slate-600">
										{coupon.description}
									</td>
									<td className="py-3 px-4 font-medium text-green-600">
										{coupon.discount}%
									</td>
									<td className="py-3 px-4 text-slate-500">
										{safelyFormatDate(coupon.expiresAt)}
									</td>
									<td className="py-3 pr-6 text-center">
										{coupon.forNewUser ? '✔' : '-'}
									</td>
									<td className="py-3 pr-6 text-center">
										{coupon.forMember ? '✔' : '-'}
									</td>
									<td className="py-3 px-4">
										<button
											onClick={() => {
												toast.promise(deleteCoupon(coupon.code), {
													loading: 'Deleting coupon...',
													success: 'Coupon deleted!',
													error: 'Failed to delete coupon.',
												});
											}}
											className="p-1 rounded-full text-red-400 hover:bg-red-50 active:scale-95 transition"
											title="Delete Coupon"
										>
											<Trash2Icon className="w-5 h-5" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
