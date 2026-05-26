import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import StoreProvider from '@/store/provider';

const outfit = Outfit({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
	title: 'GoMart. - Multi-vendor Online Marketplace',
	description:
		'GoMart. Buy. Sell. Scale. A modern marketplace where vendors grow faster and customers discover better products in one seamless platform.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${outfit.className} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<StoreProvider>
					{children}
					<Toaster />
				</StoreProvider>
			</body>
		</html>
	);
}
