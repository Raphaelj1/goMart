import BestSelling from '@/components/home/BestSelling';
import Hero from '@/components/home/Hero';
import LatestProducts from '@/components/home/LatestProducts';
import Newsletter from '@/components/home/Newsletter';
import OurSpecs from '@/components/home/OurSpecs';

const Home = () => {
	return (
		<div className="min-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-500">
			<Hero />
			<LatestProducts />
			<BestSelling />
			<OurSpecs />
			<Newsletter />
		</div>
	);
};

export default Home;
