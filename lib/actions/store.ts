'use server';

import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
// import { revalidatePath } from 'next/cache';
import { imagekit } from '@/lib/imagekit';

export async function createStore(formData: FormData) {
	const { userId } = await auth();
	if (!userId) return { success: false, message: 'You must be signed in to open a store' };

	const name = formData.get('name') as string;
	const description = formData.get('description') as string;
	const username = (formData.get('username') as string).trim().toLowerCase();
	const address = formData.get('address') as string;
	const email = formData.get('email') as string;
	const contact = formData.get('contact') as string;
	const image = (formData.get('image') as File) || null;

	if (!name || !username || !description || !email || !contact || !address || !image) {
		return { success: false, message: 'Store name, unique handle, and email are required' };
	}

	try {
		const existingUserStore = await prisma.store.findUnique({ where: { userId } });
		if (existingUserStore)
			throw new Error('Your user account is already linked to an existing store');

		const existingUsername = await prisma.store.findUnique({ where: { username } });
		if (existingUsername) throw new Error('This store handle username is already taken');

		const buffer = Buffer.from(await image.arrayBuffer());
		const response = await imagekit.upload({
			file: buffer,
			fileName: `${username}-logo-${image.name}`,
			folder: '/stores/logos',
		});

		const optimizedImage = imagekit.url({
			path: response.filePath,
			transformation: [{ quality: 'auto' }, { format: 'webp' }, { width: '512' }],
		});

		await prisma.store.create({
			data: {
				name,
				description,
				username,
				address,
				logo: optimizedImage,
				email,
				contact,
				user: { connect: { id: userId } },
			},
		});

		return {
			success: true,
			message: 'Application submitted successfully! Awaiting store approval',
		};
	} catch (error: any) {
		return { success: false, message: error.message || 'An unknown error occurred' };
	}
}

export async function getStoreStatus() {
	try {
		const { userId } = await auth();
		if (!userId)
			return { success: false, message: 'You must be signed in to perform this action' };

		const store = await prisma.store.findFirst({ where: { userId } });
		if (!store) throw new Error('Your user account is already linked to an existing store');

		return {
			success: true,
			status: store.status,
		};
	} catch {
		return { success: false, message: 'An unknown error occurred' };
	}
}
