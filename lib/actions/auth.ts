'use server';

import { prisma } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function authAdmin() {
	const user = await currentUser();
	if (!user) throw new Error('Unauthenticated: Please log in to an admin account.');

	const userEmail = user.emailAddresses[0]?.emailAddress;
	if (!userEmail) throw new Error('Access Denied: No valid email verified for this profile.');

	const adminEmailsEnv = process.env.ADMIN_EMAILS || '';
	const adminEmailsList = adminEmailsEnv.split(',').map((email) => email.trim().toLowerCase());

	if (!adminEmailsList.includes(userEmail.toLowerCase())) {
		throw new Error('Access Denied: Your account does not possess administrative permissions.');
	}

	return user;
}

export async function authSeller() {
	const user = await currentUser();
	if (!user?.id) throw new Error('Unauthenticated: Please log in to your account.');

	const store = await prisma.store.findUnique({ where: { userId: user?.id } });

	if (!store) throw new Error('Access Denied: No vendor store registered for this account.');
	if (store.status !== 'approved') {
		throw new Error(
			`Access Denied: Your store status is currently "${store.status.toUpperCase()}".`,
		);
	}
	if (!store.isActive)
		throw new Error('Access Denied: Your vendor storefront has been deactivated.');

	return store;
}

export async function checkIsAdmin() {
	try {
		await authAdmin();
		return { isAdmin: true };
	} catch {
		return { isAdmin: false };
	}
}

export async function checkIsSeller() {
	try {
		const store = await authSeller();
		return { isSeller: true, store };
	} catch {
		return { isSeller: false, store: null };
	}
}
