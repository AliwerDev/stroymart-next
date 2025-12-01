import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-light-gray-1 px-3">
      <div className="py-5 px-6 flex justify-between w-full absolute top-0 left-0">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={88} height={40} />
        </Link>
        <LanguageSwitcher />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
