/*
 * @Date: 2023-07-10 14:13:59
 * @FilePath: /zsks-user/src/componentsV2/ChartsCirle/index.tsx
 */

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  // 数据集组件
  DatasetComponent,
  LegendComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption

  PieSeriesOption,
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  GridComponent,
  PieChart,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
const ChartsCirle = ({
  data,
  img,
  colorList = ['#E8AB63', '#F5E688', '#49BEFF', '#EB704E'],
}: {
  data: Array<{ name: string; value: number }>;
  img?: any;
  colorList?: string[];
}) => {
  const chart = useRef<echarts.ECharts | null>(null);
  // eslint-disable-next-line no-undef
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chart.current === null) {
      chart.current = echarts.init(ref.current!);
    }

    const chartdata = data;
    const sum = chartdata.reduce((pre, current) => {
      return pre + current.value;
    }, 0);

    const option: ECOption = {
      grid: {
        // left: '0',
        // right: '0',
        // top: '15',
        // bottom: '0',
        containLabel: true,
      },

      legend: {
        show: true,
        itemGap: 21,
        itemHeight: 10,
        itemWidth: 5,

        right: 'right',
        top: 15,
        orient: 'vertical',
        textStyle: {
          color: '#232324',
          fontSize: 14,
          // padding: [0, 0, 0, 20],
        },
        data: chartdata,
        formatter(name) {
          // 该函数用于设置图例显示后的百分比quanmei
          const data = option.series[0].data;
          let tarValue;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          const v = tarValue;

          return `${name}  ${v}`;
        },
      },
      color: colorList,
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          startAngle: 0,
          minAngle: 5,
          center: ['12%', '45%'],
          emphasis: {
            disabled: true,
          },
          label: {
            show: false,
          },
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 1,
          },
          data: chartdata,
        },
      ],
    };
    chart.current.setOption(option as any);
  }, [data]);
  return (
    //
    <section style={{ position: 'relative', flex: 1 }}>
      <div style={{ height: '100%' }} ref={ref} />
    </section>
  );
};

export default ChartsCirle;
