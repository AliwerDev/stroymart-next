/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ApexOptions } from 'apexcharts';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) as React.FC<{
  options: ApexOptions;
  series: ApexAxisChartSeries;
  type: 'bar' | 'line' | 'area' | string;
  height: number | string;
}>;
interface DataItem {
  list: {
    weekday?: string;
    day?: string;
    month?: string;
    total: number;
  }[];
  max_count?: number;
}

interface ChartProps {
  data: DataItem;
  period: '7d' | '30d' | '12m';
}

const ClientActiveChart: React.FC<ChartProps> = ({ data, period }) => {
  const t = useTranslations();

  const months = [
    t('Jan'),
    t('Feb'),
    t('Mar'),
    t('Apr'),
    t('May'),
    t('Jun'),
    t('Jul'),
    t('Aug'),
    t('Sep'),
    t('Oct'),
    t('Nov'),
    t('Dec'),
  ];
  const weekdays = [t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat'), t('Sun')];
  let categories: string[] = [];
  let values: number[] = [];
  if (period === '7d') {
    const weekdayData = new Array(7).fill(0);
    data?.list?.forEach((item) => {
      if (item.weekday) {
        const index = parseInt(item.weekday) - 1;
        if (index >= 0 && index < 7) {
          weekdayData[index] = item.total;
        }
      }
    });
    categories = weekdays;
    values = weekdayData;
  } else if (period === '30d') {
    const dayData = new Array(30).fill(0);
    data?.list?.forEach((item) => {
      if (item.day) {
        const index = parseInt(item.day) - 1;
        if (index >= 0 && index < 30) {
          dayData[index] = item.total;
        }
      }
    });
    categories = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    values = dayData;
  } else if (period === '12m') {
    const monthData = new Array(12).fill(0);
    data?.list?.forEach((item) => {
      if (item.month) {
        const index = parseInt(item.month) - 1;
        if (index >= 0 && index < 12) {
          monthData[index] = item.total;
        }
      }
    });
    categories = months;
    values = monthData;
  }

  const maxValue = data?.max_count || 100;

  const chartConfig = {
    series: [
      {
        name: period === '7d' ? 'Week' : period === '30d' ? 'Month' : 'Year',
        data: values,
      },
    ],
    options: {
      chart: {
        type: 'area' as const,
        height: 400,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth' as const,
        width: 3,
        colors: ['#A50034'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
          colorStops: [
            { offset: 0, color: '#A50034', opacity: 0.3 },
            { offset: 100, color: '#A50034', opacity: 0.05 },
          ],
        },
      },
      colors: ['#A50034'],
      tooltip: {
        enabled: true,
        shared: false,
        followCursor: true,
        intersect: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const value = series[seriesIndex][dataPointIndex];
          const category = w.globals.labels[dataPointIndex];
          let label = '';
          if (period === '7d') label = weekdays[dataPointIndex + 1];
          else if (period === '30d') label = `Day ${category}`;
          else if (period === '12m') label = months[dataPointIndex];

          return `<div style="padding:12px 16px;background:white;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);min-width:120px;">
              <div style="font-size:13px;color:#6B7280;margin-bottom:4px;">${label}</div>
              <div style="font-size:18px;font-weight:700;color:#111827;">${value.toLocaleString()}</div>
          </div>`;
        },
      },
      markers: {
        size: 0,
        hover: { size: 6, sizeOffset: 3 },
        colors: ['#A50034'],
        strokeColors: '#fff',
        strokeWidth: 2,
      },
      xaxis: {
        type: 'category' as const,
        categories,
        labels: { rotate: 0, style: { fontSize: '12px', colors: '#333333' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        max: maxValue,
        min: 0,
        tickAmount: 5,
        labels: {
          style: { fontSize: '12px', colors: '#333333' },
          formatter: (val: number) => val.toLocaleString(),
        },
      },
      legend: { show: false },
      grid: {
        borderColor: '#E5E7EB',
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
        padding: { top: 0, right: 0, bottom: 0, left: 10 },
      },
    },
  };
  return (
    <div id="chart" className="w-full">
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="area"
        height={400}
      />
    </div>
  );
};

export default ClientActiveChart;
