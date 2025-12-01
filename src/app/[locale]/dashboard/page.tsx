/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation';

const Page = ({ params }: any) => {
  const locale = params.locale;
  redirect(`/${locale}/dashboard/analytics`);
};

export default Page;
