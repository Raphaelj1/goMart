'use client';

import { useState, useEffect } from 'react';

interface RedirectCountdownProps {
	seconds?: number;
	text?: string;
}

export default function RedirectCountdown({ seconds = 5, text = '' }: RedirectCountdownProps) {
	const [duration, setDuration] = useState(seconds);

	useEffect(() => {
		if (duration <= 0) return;
		const timer = setTimeout(() => setDuration(duration - 1), 1000);
		return () => clearTimeout(timer);
	}, [duration]);

	return (
		<p className="mt-5 text-slate-400">
			{text} <span className="font-semibold">{duration}</span>
		</p>
	);
}
