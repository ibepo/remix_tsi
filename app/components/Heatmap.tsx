import { addMonths } from 'date-fns';
import CalendarHeatmap from 'react-calendar-heatmap';
import './heatmap.css';

export default function HeatMap(data) {
  const value = data.data.map(item => ({
    ...item,
    date: item.datadate,
  }));

  return (
    <div className='flex w-full h-full'>
      <CalendarHeatmap
        showMonthLabels={true}
        horizontal={true}
        // showWeekdayLabels={true}
        gutterSize={1}
        showOutOfRangeDays={true}
        startDate={addMonths(new Date(), -4)}
        endDate={new Date()}
        // values={randomValues}
        monthLabels={['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']}
        weekdayLabels={['日', '一', '二', '三', '四', '五', '六']}
        values={value}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if (value.chg.includes('-')) {
            return `color-cm-red`;
          } else {
            return `color-cm-gre`;
          }
        }}
      />
    </div>
  )
}
