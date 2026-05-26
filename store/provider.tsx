'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

interface StoreProviderProps {
	children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
	const [storeInstance] = useState<AppStore>(() => makeStore());

	return <Provider store={storeInstance}>{children}</Provider>;
}
