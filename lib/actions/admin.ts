'use server';

import { prisma } from '@/lib/db';
// import { revalidatePath } from 'next/cache';
import { checkIsAdmin } from './auth';
import { inngest } from '@/inngest/client';

export async function approveStore(storeId: string, decision: 'approved' | 'rejected') {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		await prisma.store.update({
			where: { id: storeId },
			data: { status: decision, isActive: decision === 'approved' },
		});

		// revalidatePath('/admin/dashboard');
		return { success: true, message: `Store registration was successfully ${decision}.` };
	} catch {
		return { success: false, message: 'Failed to update store status' };
	}
}

export async function toggleStoreActive(storeId: string) {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		const store = await prisma.store.findUnique({ where: { id: storeId } });
		if (!store) return { success: false, message: 'Target store not found' };

		await prisma.store.update({
			where: { id: storeId },
			data: { isActive: !store.isActive },
		});

		// revalidatePath('/admin/dashboard');
		return { success: true, message: 'Store visibility status updated successfully' };
	} catch {
		return { success: false, message: 'Failed to toggle store visibility' };
	}
}

export async function createCoupon(formData: FormData) {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		const code = (formData.get('code') as string).trim().toUpperCase();
		const description = formData.get('description') as string;
		const discount = parseFloat(formData.get('discount') as string);
		const forNewUser = formData.get('forNewUser') === 'true';
		const forMember = formData.get('forMember') === 'true';
		const isPublic = formData.get('isPublic') === 'true';
		const expiresAt = new Date(formData.get('expiresAt') as string);

		if (!code || isNaN(discount) || isNaN(expiresAt.getTime())) {
			return { success: false, message: 'Missing or invalid coupon arguments' };
		}

		await prisma.coupon
			.create({
				data: { code, description, discount, forNewUser, forMember, isPublic, expiresAt },
			})
			.then(async (coupon) => {
				await inngest.send({
					name: 'app/coupon.expired',
					data: {
						code: coupon.code,
						expiresAt: coupon.expiresAt,
					},
				});
			});

		// revalidatePath('/admin/coupons');
		return { success: true, message: 'Coupon added successfully!' };
	} catch {
		return { success: false, message: 'Failed to register coupon' };
	}
}

export async function deleteCoupon(code: string) {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		await prisma.coupon.delete({ where: { code } });

		// revalidatePath('/admin/coupons');
		return { success: true, message: 'Coupon deleted successfully' };
	} catch {
		return { success: false, message: 'Failed to delete coupon' };
	}
}

export async function getAllCoupons() {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });

		return { success: true, coupons };
	} catch {
		return { success: false, message: 'An error occured getting all coupons' };
	}
}

export async function getPendingStores() {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		const stores = await prisma.store.findMany({
			where: { status: 'pending' },
			orderBy: { createdAt: 'desc' },
			include: { user: true },
		});
		return { success: true, stores };
	} catch {
		return { success: false, message: 'An error occured getting pending stores' };
	}
}

export async function getPendingAndRejectedStores() {
	try {
		const { isAdmin } = await checkIsAdmin();
		if (!isAdmin) return { success: false, message: 'Unauthorized' };

		const stores = await prisma.store.findMany({
			where: { status: { in: ['pending', 'rejected'] } },
			orderBy: { createdAt: 'desc' },
			include: { user: true },
		});
		return { success: true, stores };
	} catch {
		return { success: false, message: 'An error occured getting pending and rejected stores' };
	}
}

export async function getApprovedStores() {
	const { isAdmin } = await checkIsAdmin();
	if (!isAdmin) return { success: false, message: 'Unauthorized' };

	try {
		const stores = await prisma.store.findMany({
			where: { status: 'approved' },
			orderBy: { createdAt: 'desc' },
			include: { user: true },
		});

		return { success: true, stores };
	} catch {
		return { success: false, message: 'An error occured getting approved stores' };
	}
}

export async function getAdminDashboardData() {
	const { isAdmin } = await checkIsAdmin();
	if (!isAdmin) return { success: false, message: 'Unauthorized' };

	try {
		const [totalOrders, totalProducts, totalStores, allOrders, paidOrders] = await Promise.all([
			prisma.order.count(),
			prisma.product.count(),
			prisma.store.count(),
			prisma.order.findMany({ select: { createdAt: true, total: true } }),
			prisma.order.aggregate({ where: { isPaid: true }, _sum: { total: true } }),
		]);

		const totalRevenue = paidOrders._sum.total || 0;

		const dashboardData = {
			totalOrders,
			totalProducts,
			totalStores,
			totalRevenue,
			allOrders,
		} as AdminDashboardData;

		return { success: true, dashboardData };
	} catch {
		return { success: false, message: 'An error occured getting admin dashboard data' };
	}
}
