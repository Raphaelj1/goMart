type OrderStatus = 'ORDER_PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
type PaymentMethod = 'COD' | 'STRIPE';

interface User {
	id: string;
	name: string;
	email: string;
	image: StaticImageData | string;
	cart?: Record<string, number>;

	// Relations (Optional)
	ratings?: Rating[];
	Address?: Address[];
	store?: Store | null;
	buyerOrders?: Order[];
}

interface Product {
	id: string;
	name: string;
	description: string;
	mrp: number;
	price: number;
	images: StaticImageData[] | string[];
	category: string;
	inStock: boolean;
	storeId: string;
	createdAt: string | Date;
	updatedAt: string | Date;

	// Relations (Optional)
	store?: Store;
	// orderItems?: OrderItem[];
	rating?: Rating[];
}

interface Order {
	id: string;
	total: number;
	status: OrderStatus;
	userId: string;
	storeId: string;
	addressId: string;
	isPaid: boolean;
	paymentMethod: PaymentMethod;
	isCouponUsed: boolean;
	coupon?: Coupon;
	createdAt: string | Date;
	updatedAt: string | Date;

	// Relations (Optional)
	user?: User;
	store?: Store;
	address?: Address;
	orderItems: OrderItem[];
}

interface OrderItem {
	orderId: string;
	productId: string;
	quantity: number;
	price: number;

	// Relations (Optional)
	order?: Order;
	product: Product;
}

interface Rating {
	id: string;
	rating: number;
	review: string;
	userId: string;
	productId: string;
	orderId: string;
	createdAt: string | Date;
	updatedAt: string | Date;

	// Relations (Optional)
	user?: User;
	product?: Product;
}

interface Address {
	id: string;
	userId: string;
	name: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone: string;
	createdAt: string | Date;

	// Relations (Optional)
	Order?: Order[];
	user?: User;
}

interface Coupon {
	code: string;
	description: string;
	discount: number;
	forNewUser: boolean;
	forMember: boolean;
	isPublic: boolean;
	expiresAt: string | Date;
	createdAt: string | Date;
}

interface Store {
	id: string;
	userId: string;
	name: string;
	description: string;
	username: string;
	address: string;
	status: string;
	isActive: boolean;
	logo: StaticImageData | string;
	email: string;
	contact: string;
	createdAt: string | Date;
	updatedAt: string | Date;

	// Relations (Optional)
	Product?: Product[];
	Order?: Order[];
	user?: User;
}

interface CartItem extends Product {
	quantity: number;
}

interface DashboardData {
	ratings: Rating[];
	totalOrders: number;
	totalEarnings: number;
	totalProducts: number;
}

interface AdminDashboardData {
	products: number;
	revenue: number;
	orders: number;
	stores: number;
	allOrders: Order[];
}
