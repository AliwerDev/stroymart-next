'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface PartnerStatisticData {
  title: string;
  count: number;
}

interface PartnerStatisticProps {
  list: PartnerStatisticData[];
  max_count?: number;
}

const PartnerStatisticsChart: React.FC<{ data: PartnerStatisticProps }> = ({ data }) => {
  const chartConfig = useMemo(() => {
    const maxValue = data?.max_count as number;

    const categories: string[] = Array.isArray(data?.list)
      ? data?.list.map((item: PartnerStatisticData) => item.title)
      : [];
    const values: number[] = Array.isArray(data?.list)
      ? data?.list.map((item: PartnerStatisticData) => item.count)
      : [];

    const series: ApexAxisChartSeries = [
      {
        name: '',
        data: values,
        color: '#A50034',
      },
    ];

    const options: ApexOptions = {
      chart: {
        type: 'bar',
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
          horizontal: false,
          columnWidth: '40%',
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
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#333333',
          },
        },
        categories: categories,
      },
      yaxis: {
        max: maxValue,
        min: 0,
        tickAmount: 5,
        labels: {
          style: {
            fontFamily: 'Inter',
            cssClass: 'engagement-chart-yaxis-label',
          },
        },
      },
      grid: {
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: false,
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
  }, [data]);
  return (
    <div id="chart">
      <ReactApexChart
        options={chartConfig.options}
        series={chartConfig.series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default PartnerStatisticsChart;
