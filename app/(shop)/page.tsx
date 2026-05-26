import BestSelling from '@/components/home/BestSelling';
import Hero from '@/components/home/Hero';
import LatestProducts from '@/components/home/LatestProducts';
import Newsletter from '@/components/home/Newsletter';
import OurSpecs from '@/components/home/OurSpecs';

const Home = () => {
	return (
		<div>
			<Hero />
			<LatestProducts />
			<BestSelling />
			<OurSpecs />
			<Newsletter />
		</div>
	);
};

export default Home;
