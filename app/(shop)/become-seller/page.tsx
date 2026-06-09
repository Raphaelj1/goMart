'use client';

import { assets } from '@/constants';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Loading from '@/components/Loading';
import RedirectCountdown from '@/components/RedirectCountdown';
import { createStore, getStoreStatus } from '@/lib/actions/store';
import { useUser } from '@clerk/nextjs';

interface StoreFormState {
	name: string;
	username: string;
	description: string;
	email: string;
	contact: string;
	address: string;
	image: File | null;
}

const BecomeSeller = () => {
	const { user } = useUser();
	const router = useRouter();

	const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
	const [status, setStatus] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [message, setMessage] = useState<string>('');

	const [storeInfo, setStoreInfo] = useState<StoreFormState>({
		name: '',
		username: '',
		description: '',
		email: '',
		contact: '',
		address: '',
		image: null,
	});

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (!user) {
			toast.info('Please login to continue');
			return;
		}

		const formData = new FormData();
		Object.entries(storeInfo).forEach(([Key, value]) => {
			formData.append(Key, value);
		});

		const { success, message } = await createStore(formData);
		if (!success) throw new Error(message);
	};

	useEffect(() => {
		const fetchSellerStatus = async (): Promise<void> => {
			try {
				const { status } = await getStoreStatus();

				if (status && ['approved', 'rejected', 'pending'].includes(status)) {
					setStatus(status);
					setAlreadySubmitted(true);

					switch (status) {
						case 'approved':
							setMessage(
								'Your store has been approved, you can add products from dashboard',
							);
							setTimeout(() => router.push('/vendor'), 5000);
							break;
						case 'rejected':
							setMessage(
								'Your store has been rejected, contact the admin for more details',
							);
							break;
						case 'pending':
							setMessage(
								'Your request is pending, please wait for admin to approve your store',
							);
							break;
						default:
							break;
					}
				} else {
					setAlreadySubmitted(false);
				}
			} catch (error) {
				console.error('Error fetching seller status:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchSellerStatus();
	}, [user, router]);

	if (!user) {
		return (
			<div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
				<h1 className="text-2xl-sm:text-4xl font-semibold">
					Please <span className="text-slate-500">Login</span> to continue
				</h1>
			</div>
		);
	}

	return !loading ? (
		<>
			{!alreadySubmitted ? (
				<div className="mx-6 min-h-[70vh] my-16">
					<form
						onSubmit={(e) => {
							toast.promise(onSubmitHandler(e), {
								loading: 'Creating store...',
								success: 'Store details submitted successfully!',
								error: 'Failed to submit store details.',
							});
						}}
						className="max-w-7xl mx-auto flex flex-col items-start gap-3 text-slate-500"
					>
						{/* Title */}
						<div>
							<h1 className="text-3xl ">
								Add Your <span className="text-slate-800 font-medium">Store</span>
							</h1>
							<p className="max-w-lg">
								To become a seller on GoMart, submit your store details for review.
								Your store will be activated after admin verification.
							</p>
						</div>

						<label className="mt-10 cursor-pointer">
							Store Logo
							<Image
								src={
									storeInfo.image
										? URL.createObjectURL(storeInfo.image)
										: assets.upload_area
								}
								className="rounded-lg mt-2 h-16 w-auto object-cover"
								alt="Store Logo"
								width={150}
								height={100}
							/>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const files = e.target.files;
									if (files && files.length > 0) {
										setStoreInfo({ ...storeInfo, image: files[0] });
									}
								}}
								hidden
							/>
						</label>

						<p>Username</p>
						<input
							name="username"
							onChange={onChangeHandler}
							value={storeInfo.username}
							type="text"
							placeholder="Enter your store username"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded text-slate-800"
							required
						/>

						<p>Name</p>
						<input
							name="name"
							onChange={onChangeHandler}
							value={storeInfo.name}
							type="text"
							placeholder="Enter your store name"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded text-slate-800"
							required
						/>

						<p>Description</p>
						<textarea
							name="description"
							onChange={onChangeHandler}
							value={storeInfo.description}
							rows={5}
							placeholder="Enter your store description"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded resize-none text-slate-800"
							required
						/>

						<p>Email</p>
						<input
							name="email"
							onChange={onChangeHandler}
							value={storeInfo.email}
							type="email"
							placeholder="Enter your store email"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded text-slate-800"
							required
						/>

						<p>Contact Number</p>
						<input
							name="contact"
							onChange={onChangeHandler}
							value={storeInfo.contact}
							type="text"
							placeholder="Enter your store contact number"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded text-slate-800"
							required
						/>

						<p>Address</p>
						<textarea
							name="address"
							onChange={onChangeHandler}
							value={storeInfo.address}
							rows={5}
							placeholder="Enter your store address"
							className="border border-slate-300 outline-slate-400 w-full max-w-lg p-2 rounded resize-none text-slate-800"
							required
						/>

						<button className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition ">
							Submit
						</button>
					</form>
				</div>
			) : (
				<div className="min-h-[80vh] flex flex-col items-center justify-center">
					<p className="sm:text-2xl lg:text-3xl mx-5 font-semibold text-slate-500 text-center max-w-2xl">
						{message}
					</p>
					{status === 'approved' && (
						<RedirectCountdown seconds={5} text="redirecting to dashboard in" />
					)}
				</div>
			)}
		</>
	) : (
		<Loading />
	);
};

export default BecomeSeller;
