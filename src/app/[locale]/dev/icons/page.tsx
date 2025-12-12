'use client';
import * as Icons from '@/components/icons';
import { IconCompare } from 'react-svg-icon-compare';

const Page = () => {
  return (
    <IconCompare
      icons={Icons}
      duplicateThreshold={90}
      similarThreshold={70}
      gridColumns={8}
      className="my-custom-class"
    />
  );
};

export default Page;
