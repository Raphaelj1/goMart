'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/constants';
import { toast } from 'sonner';

interface ProductFormState {
	name: string;
	description: string;
	mrp: number;
	price: number;
	category: string;
}

interface ProductImagesState {
	[key: string]: File | null;
}

export default function VendorAddProduct() {
	const router = useRouter();

	const categories = [
		'Electronics',
		'Clothing',
		'Home & Kitchen',
		'Beauty & Health',
		'Toys & Games',
		'Sports & Outdoors',
		'Books & Media',
		'Food & Drink',
		'Hobbies & Crafts',
		'Others',
	];

	const [images, setImages] = useState<ProductImagesState>({
		'1': null,
		'2': null,
		'3': null,
		'4': null,
	});

	const [productInfo, setProductInfo] = useState<ProductFormState>({
		name: '',
		description: '',
		mrp: 0,
		price: 0,
		category: '',
	});

	const [loading, setLoading] = useState<boolean>(false);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setProductInfo({
			...productInfo,
			[name]: type === 'number' ? Number(value) : value,
		});
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (!productInfo.category) {
			toast.error('Please select a product category.');
			return;
		}

		setLoading(true);
		const toastId = toast.loading('Adding Product...');

		try {
			// add product logic

			toast.success('Product listed successfully!', { id: toastId });

			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.info('Redirecting to product management...', { id: toastId });

			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.replace('/vendor/products/manage');
		} catch (error) {
			console.error('Failed to add product:', error);
			toast.error('Failed to add product. Please check your inputs.', { id: toastId });
			setLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmitHandler} className="text-slate-500 mb-28">
			<h1 className="text-2xl">
				Add New <span className="text-slate-800 font-medium">Products</span>
			</h1>
			<p className="mt-7">Product Images</p>

			<div className="flex gap-3 mt-4">
				{Object.keys(images).map((key) => {
					const currentFile = images[key];
					return (
						<label key={key} htmlFor={`images${key}`}>
							<Image
								width={300}
								height={300}
								className="h-15 w-auto border border-slate-200 rounded cursor-pointer object-cover"
								src={
									currentFile
										? URL.createObjectURL(currentFile)
										: assets.upload_area
								}
								alt={`Preview ${key}`}
							/>
							<input
								type="file"
								accept="image/*"
								id={`images${key}`}
								onChange={(e) => {
									const files = e.target.files;
									if (files && files.length > 0) {
										setImages({ ...images, [key]: files[0] });
									}
								}}
								hidden
							/>
						</label>
					);
				})}
			</div>

			<label className="flex flex-col gap-2 my-6 text-sm font-medium">
				Name
				<input
					type="text"
					name="name"
					onChange={onChangeHandler}
					value={productInfo.name}
					placeholder="Enter product name"
					className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded text-slate-800 font-normal"
					required
				/>
			</label>

			<label className="flex flex-col gap-2 my-6 text-sm font-medium">
				Description
				<textarea
					name="description"
					onChange={onChangeHandler}
					value={productInfo.description}
					placeholder="Enter product description"
					rows={5}
					className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none text-slate-800 font-normal"
					required
				/>
			</label>

			<div className="flex gap-5">
				<label className="flex flex-col gap-2 text-sm font-medium">
					Actual Price ($)
					<input
						type="number"
						name="mrp"
						onChange={onChangeHandler}
						value={productInfo.mrp === 0 ? '' : productInfo.mrp}
						placeholder="0"
						className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded text-slate-800 font-normal"
						required
					/>
				</label>
				<label className="flex flex-col gap-2 text-sm font-medium">
					Offer Price ($)
					<input
						type="number"
						name="price"
						onChange={onChangeHandler}
						value={productInfo.price === 0 ? '' : productInfo.price}
						placeholder="0"
						className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded text-slate-800 font-normal"
						required
					/>
				</label>
			</div>

			<select
				onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
				value={productInfo.category}
				className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded text-slate-700 bg-white"
				required
			>
				<option value="">Select a category</option>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>

			<br />

			<button
				disabled={loading}
				className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition disabled:opacity-50 active:scale-95"
			>
				Add Product
			</button>
		</form>
	);
}
