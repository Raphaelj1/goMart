'use client';

import { useRouter } from 'next/navigation';

interface ViewProductButtonProps {
	productId: string;
}

export default function ViewProductButton({ productId }: ViewProductButtonProps) {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/products/${productId}`)}
			className="bg-slate-100 px-5 py-2 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-all active:scale-95"
		>
			View Product
		</button>
	);
}
