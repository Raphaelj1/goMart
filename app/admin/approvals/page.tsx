'use client';

import { useEffect, useState } from 'react';
import { storesDummyData } from '@/constants';
import StoreInfo from '@/components/admin/StoreInfo';
import Loading from '@/components/Loading';
import { toast } from 'sonner';

interface ApproveActionParams {
	storeId: string;
	status: 'approved' | 'rejected';
}

export default function AdminApprovals() {
	const [loading, setLoading] = useState<boolean>(true);

	const [stores, setStores] = useState<Store[]>([]);

	const handleApprove = async ({ storeId, status }: ApproveActionParams): Promise<void> => {
		// Logic to approve or reject a store
		console.log(`Setting store ID ${storeId} approval status to: ${status}`);

		await new Promise((resolve) => setTimeout(resolve, 1200));

		setStores((prevStores) => prevStores.filter((store) => store.id !== storeId));
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
				Approve <span className="text-slate-800 font-medium">Stores</span>
			</h1>

			{stores.length ? (
				<div className="flex flex-col gap-4 mt-4">
					{stores.map((store) => (
						<div
							key={store.id}
							className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-5xl"
						>
							<StoreInfo store={store} />

							{/* Actions Control Panel */}
							<div className="flex gap-3 pt-2 flex-wrap">
								<button
									onClick={() => {
										toast.promise(
											handleApprove({
												storeId: store.id,
												status: 'approved',
											}),
											{
												loading: 'Approving application...',
												success: 'Store application approved!',
												error: 'Failed to process approval workflow.',
											},
										);
									}}
									className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition active:scale-95"
								>
									Approve
								</button>
								<button
									onClick={() => {
										toast.promise(
											handleApprove({
												storeId: store.id,
												status: 'rejected',
											}),
											{
												loading: 'Rejecting application...',
												success: 'Store application rejected.',
												error: 'Failed to process rejection workflow.',
											},
										);
									}}
									className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm font-medium transition active:scale-95"
								>
									Reject
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex items-center justify-center h-80">
					<h1 className="text-3xl text-slate-400 font-medium">No Application Pending</h1>
				</div>
			)}
		</div>
	);
}
