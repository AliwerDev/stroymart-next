'use client';

import { ApexOptions } from 'apexcharts';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) as React.FC<{
  options: ApexOptions;
  series: ApexAxisChartSeries;
  type: 'bar' | 'line' | 'area' | string;
  height: number | string;
}>;

interface EngagementClientProps {
  max_count: number;
  list: {
    all_active_client: number;
    transition_to_partner: number;
  };
}

const EngagementChart: React.FC<{ data: EngagementClientProps }> = ({ data }) => {
  const t = useTranslations();
  const chartConfig = useMemo(() => {
    const maxValue = data?.max_count;
    const categories = [t('Start'), [t('Переход на'), t('партнёров')]];
    const values = [data?.list?.all_active_client, data?.list?.transition_to_partner];

    const series: ApexAxisChartSeries = [
      {
        name: t('Product'),
        data: values,
        color: '#A50034',
      },
    ];
    const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 38,
          colors: {
            backgroundBarColors: ['#fff', '#fff'],
          },
          borderRadius: 6,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        max: maxValue,
        min: 0,
        tickAmount: 5,
        labels: {
          style: {
            colors: '#333333',
          },
        },
        categories,
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Inter',
            cssClass: 'engagement-chart-yaxis-label',
          },
        },
      },
      grid: {
        strokeDashArray: 10,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        position: 'top',
        markers: {
          shape: 'circle',
        },
        offsetY: 10,
      },
      fill: {
        opacity: 1,
      },
    };

    return { series, options };
  }, [data, t]);

  return (
    <ReactApexChart
      options={chartConfig.options}
      series={chartConfig.series}
      type="bar"
      height={350}
    />
  );
};

export default EngagementChart;
