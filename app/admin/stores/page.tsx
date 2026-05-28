'use client';

import { useEffect, useState } from 'react';
import StoreInfo from '@/components/admin/StoreInfo';
import Loading from '@/components/Loading';
import { toast } from 'sonner';
import { storesDummyData } from '@/constants';

export default function AdminStores() {
	const [loading, setLoading] = useState<boolean>(true);
	const [stores, setStores] = useState<Store[]>([]);

	const toggleIsActive = async (storeId: string): Promise<void> => {
		try {
			console.log('Toggling active state for store ID:', storeId);
			setStores((prevStores) =>
				prevStores.map((s) => (s.id === storeId ? { ...s, isActive: !s.isActive } : s)),
			); // instant UI feedback

			// Simulate network latency delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error('Error toggling store active status:', error);
			setStores((prevStores) =>
				prevStores.map((s) => (s.id === storeId ? { ...s, isActive: !s.isActive } : s)),
			);
		}
	};

	useEffect(() => {
		const fetchStores = async (): Promise<void> => {
			setStores(storesDummyData as unknown as Store[]);
			setLoading(false);
		};

		fetchStores();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="text-slate-500 mb-28">
			<h1 className="text-2xl">
				Live <span className="text-slate-800 font-medium">Stores</span>
			</h1>

			{stores.length ? (
				<div className="flex flex-col gap-4 mt-4">
					{stores.map((store) => (
						<div
							key={store.id}
							className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-start max-w-5xl"
						>
							<StoreInfo store={store} />

							<div className="flex items-center gap-3 pt-2 flex-wrap">
								<p className="text-sm font-medium text-slate-600">Active</p>

								<label className="relative inline-flex items-center cursor-pointer text-gray-900 select-none">
									<input
										type="checkbox"
										className="sr-only peer"
										onChange={() => {
											toast.promise(toggleIsActive(store.id), {
												loading: 'Updating store status...',
												success: 'Store status updated!',
												error: 'Failed to update store status.',
											});
										}}
										checked={store.isActive}
									/>
									<div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
									<span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4 shadow-xs" />
								</label>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex items-center justify-center h-80">
					<h1 className="text-3xl text-slate-400 font-medium">No stores Available</h1>
				</div>
			)}
		</div>
	);
}
