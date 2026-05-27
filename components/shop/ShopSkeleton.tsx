// components/shop/ShopSkeleton.tsx
export default function ShopSkeleton() {
	return (
		<div className="w-full">
			<div className="my-6 flex items-center gap-2 select-none animate-pulse">
				<div className="h-8 w-48 bg-slate-200 rounded-md" />
			</div>

			<div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
				{Array.from({ length: 8 }).map((_, index) => (
					<div key={index} className="max-xl:mx-auto animate-pulse">
						<div className="bg-slate-200 h-40 w-full sm:w-60 sm:h-68 rounded-lg flex items-center justify-center" />

						<div className="flex justify-between gap-3 pt-2 max-w-60 w-full sm:w-60">
							<div className="flex-1">
								<div className="h-4 w-5/6 bg-slate-200 rounded mb-2" />
								<div className="h-3.5 w-1/2 bg-slate-200 rounded mt-1" />

								{/* <div className="flex gap-0.5 mt-1">
									{Array(5)
										.fill('')
										.map((_, i) => (
											<div
												key={i}
												className="h-3.5 w-3.5 bg-slate-200 rounded-full"
											/>
										))}
								</div> */}
							</div>

							<div className="h-4 w-12 bg-slate-200 rounded shrink-0" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
