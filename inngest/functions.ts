import { inngest } from './client';
import { prisma } from '@/lib/db';

// Inngest function to save user to the database
export const syncUserCreation = inngest.createFunction(
	{
		id: 'sync-user-create',
		name: 'Sync Clerk User Creation',
		triggers: { event: 'clerk/user.created' },
	},
	async ({ event }) => {
		const { data } = event;

		const firstName = data.first_name || '';
		const lastName = data.last_name || '';
		const fullName = `${firstName} ${lastName}`.trim() || 'New User';

		const newUser = await prisma.user.create({
			data: {
				id: data.id,
				email: data.email_addresses[0].email_address,
				name: fullName,
				image: data.image_url || '',
			},
		});

		return {
			success: true,
			userId: newUser.id,
			message: `Successfully synchronized user ${newUser.email}`,
		};
	},
);

// Inngest function to update user in the database
export const syncUserUpdation = inngest.createFunction(
	{
		id: 'sync-user-update',
		name: 'Sync Clerk User Update',
		triggers: { event: 'clerk/user.updated' },
	},
	async ({ event }) => {
		const { data } = event;

		const firstName = data.first_name || '';
		const lastName = data.last_name || '';
		const fullName = `${firstName} ${lastName}`.trim() || 'New User';

		const updatedUser = await prisma.user.update({
			where: { id: data.id },
			data: {
				email: data.email_addresses[0].email_address,
				name: fullName,
				image: data.image_url || '',
			},
		});

		return {
			success: true,
			userId: updatedUser.id,
			message: `Successfully synchronized user ${updatedUser.email}`,
		};
	},
);

// Inngest function to delete user in the database
export const syncUserDeletion = inngest.createFunction(
	{
		id: 'sync-user-delete',
		name: 'Sync Clerk User Delete',
		triggers: { event: 'clerk/user.deleted' },
	},
	async ({ event }) => {
		const { data } = event;

		await prisma.user.deleteMany({
			where: { id: data.id },
		});

		return {
			success: true,
			deletedId: data.id,
		};
	},
);
