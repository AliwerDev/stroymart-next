/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React, { useMemo, useState } from 'react';

import useAppNavigation from '@/hooks/useAppNavigation';
import { cn } from '@/lib/utils';
import Typography from '../Typography';

export interface TabItemProps {
  label: string;
  value: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
}

interface TabsProps {
  items: TabItemProps[];
  queryKey: string;
  currentTab?: string;
  hidePanels?: boolean;
  handleChange?: (params: URLSearchParams) => void;
  whiteList?: string[];
}

const Tabs = ({
  items,
  queryKey,
  handleChange,
  whiteList = [],
  hidePanels = false,
  ...props
}: TabsProps) => {
  const [index, setIndex] = useState<number | null>(null);
  const { router, pathname, searchParams, createQueryParams } = useAppNavigation();

  // Get current tab from URL params or props, default to first tab
  const currentTabName = searchParams.get(queryKey) || props.currentTab || items?.[0]?.value;

  const activeTabIndex = useMemo(() => {
    return index !== null ? index : items.findIndex((item) => String(item.value) === String(currentTabName));
  }, [currentTabName]);

  const handleTabChange = (index: number) => {
    setIndex(index);
    const selectedTab = items[index];
    if (currentTabName === selectedTab.value) return;

    const params = createQueryParams();

    const totalKeys = params.keys();
    Array.from(totalKeys).forEach((key) => {
      if (!whiteList.includes(key) && queryKey !== key) {
        params.delete(key);
      }
    });

    // Set the new tab parameter
    params.set(queryKey, selectedTab.value);

    // Update URL
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    // Call optional callback
    if (typeof handleChange === 'function') {
      handleChange(params);
    }
  };

  return (
    <div>
      <TabGroup selectedIndex={activeTabIndex} onChange={handleTabChange}>
        <TabList className="flex items-end justify-between overflow-auto">
          <div className="w-fit flex items-end">
            {items.map((category, index) => (
              <Tab
                key={category.value}
                className={cn(
                  'p-4 md:p-5 border-b-3 border-transparent outline-none cursor-pointer transition-all duration-300',
                  activeTabIndex === index && 'border-primary-500'
                )}
              >
                <Typography
                  variant="caption-bl-14"
                  className={cn('truncate text-mid-gray-2', activeTabIndex === index && 'text-primary-500')}
                >
                  {category.label}
                </Typography>
              </Tab>
            ))}
          </div>

          {items[activeTabIndex]?.rightContent}
        </TabList>

        {!hidePanels && (
          <TabPanels>
            {items.map((category, index) => (
              <TabPanel key={index}>{category.children}</TabPanel>
            ))}
          </TabPanels>
        )}
      </TabGroup>
    </div>
  );
};

export default Tabs;
