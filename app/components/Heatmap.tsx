import { addMonths, addYears } from 'date-fns'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Tooltip } from 'react-tooltip'
import './heatmap.css'

export default function HeatMap(data) {
  const value = data.data.map(item => ({
    ...item,
    date: item.datadate,
  }))
  const getTooltipDataAttrs = value => {
    if (!value || !value.date) {
      return null
    }
    return {
      'data-tooltip-id': 'my-tooltip',
      'data-tooltip-content': `${value.date} 价格为：${value.price}`,
    }
  }

  return (
    <div className='container w-full max-w-md p-3 mx-auto '>
      <CalendarHeatmap
        showMonthLabels={true}
        horizontal={true}
        // showWeekdayLabels={true}
        gutterSize={1}
        showOutOfRangeDays={true}
        startDate={addMonths(new Date(), -3)}
        endDate={new Date()}
        // values={randomValues}
        monthLabels={[
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ]}
        weekdayLabels={['日', '一', '二', '三', '四', '五', '六']}
        values={value}
        tooltipDataAttrs={getTooltipDataAttrs}
        onClick={value => alert(`Clicked on value with count: ${value.price}`)}
        classForValue={value => {
          if (!value) {
            return 'color-empty'
          }
          if (value.chg.includes('-')) {
            return `color-cm-gre`
          } else {
            return `color-cm-red`
          }
        }}
      />
      <Tooltip id='my-tooltip' />
    </div>
  )
}
