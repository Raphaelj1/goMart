'use client';

import { useState } from 'react';
import { Star, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface RatingModalState {
	orderId: string;
	productId: string;
}

interface RatingModalProps {
	ratingModal: RatingModalState;
	setRatingModal: React.Dispatch<React.SetStateAction<RatingModalState | null>>;
}

const RatingModal = ({ ratingModal, setRatingModal }: RatingModalProps) => {
	const [rating, setRating] = useState<number>(0);
	const [review, setReview] = useState<string>('');

	const handleSubmit = async (): Promise<void> => {
		if (rating <= 0 || rating > 5) {
			toast.error('Please select a rating');
			throw new Error('Rating out of bounds');
		}
		if (review.trim().length < 5) {
			toast.error('Please write a review with at least 5 characters');
			throw new Error('Review too short');
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log('Submitting for:', ratingModal.productId);

		setRatingModal(null);
	};

	return (
		<div className="fixed inset-0 z-120 flex items-center justify-center bg-black/10">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
				<button
					onClick={() => setRatingModal(null)}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
				>
					<XIcon size={20} />
				</button>
				<h2 className="text-xl font-medium text-slate-600 mb-4">Rate Product</h2>
				<div className="flex items-center justify-center mb-4">
					{Array.from({ length: 5 }, (_, i) => (
						<Star
							key={i}
							className={`size-8 cursor-pointer ${rating > i ? 'text-green-400 fill-current' : 'text-gray-300'}`}
							onClick={() => setRating(i + 1)}
						/>
					))}
				</div>
				<textarea
					className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 text-slate-700"
					placeholder="Write your review..."
					rows={4}
					value={review}
					onChange={(e) => setReview(e.target.value)}
				></textarea>
				<button
					onClick={() =>
						toast.promise(handleSubmit(), {
							loading: 'Submitting...',
							success: 'Thank you for your review!',
							error: (err: Error) => err.message || 'Submission failed',
						})
					}
					className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
				>
					Submit Rating
				</button>
			</div>
		</div>
	);
};

export default RatingModal;
