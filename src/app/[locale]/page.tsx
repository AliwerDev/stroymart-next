import { redirect } from 'next/navigation';

const page = () => {
  return redirect('/dashboard/analytics');
};

export default page;
