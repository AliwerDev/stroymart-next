import AppNavigation from '@/components/layout/AppNavigation';
import CatalogsSection from '@/components/layout/CatalogsSection';
import HeroSection from '@/components/layout/HeroSection';

const Page = () => {
  return (
    <div>
      <AppNavigation />
      <HeroSection />
      <CatalogsSection />
    </div>
  );
};

export default Page;
