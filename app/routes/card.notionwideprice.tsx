import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { addDays, format } from 'date-fns'

const Price = ({ item }) => {
  if (item.uppercentage.includes('-')) {
    return (
      <div className='flex-1 mr-5 text-xl font-bold text-right text-green-500 align-text-top font-abel'>
        {item.price}
      </div>
    )
  } else {
    return (
      <div className='flex-1 mr-5 text-xl font-semibold text-right text-red-500 align-text-top font-abel'>
        {item.price}
      </div>
    )
  }
}

const UpperCentage = ({ item }) => {
  if (item.uppercentage.includes('-')) {
    return (
      <div className='flex flex-col flex-1 font-semibold text-end'>
        <div className='flex items-center justify-center w-full h-full text-xl text-gray-200 bg-green-600 rounded font-abel'>
          {item.uppercentage}
        </div>
        <div className='mt-1 text-green-500 font-abel'>{item.chg}</div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col flex-1 font-semibold text-end '>
        <div className='flex items-center justify-center text-xl text-gray-200 bg-red-600 rounded font-abel'>
          +{item.uppercentage.trim()}
        </div>
        <div className='mt-1 text-red-600 font-abel'>+{item.chg}</div>
      </div>
    )
  }
}

export async function loader() {
  let sdate = format(addDays(new Date(), -6), 'yyyy-MM-dd')
  let edate = format(addDays(new Date(), 0), 'yyyy-MM-dd')

  const token = `eyJhbGciOiJIUzI1NiIsImlhdCI6MTY5MDg1Mzc1NywiZXhwIjoxNjkwODU3MzU3fQ.eyJ1c2VyaWQiOjY2OH0.5BJ7JKEocndS2pe4g9G2-FkDrnLRFwHVomvjAJI1F5c`
  const apiUrl = `https://service.chinatsi.net/api_v1/wechat/data/billet/nationwideprice?begin=${sdate}&end=${edate}&token=${token}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch data from external API')
    }
    const data = await response.json()
    return json(data)
  } catch (error) {
    return json({ error: error.message }, { status: 500 })
  }
}

export default function NationWideprice() {
  const data = useLoaderData(typeof loader)
  return (
    <div className='container flex flex-col max-w-md py-4'>
      <div className='text-2xl font-bold text-center text-gray-800 font-abel'>唐宋钢坯价格指数</div>
      <div className='flex w-full mb-2 justify-space'>
        <div className='flex-grow-[2] text-left'>日期</div>
        <div className='flex-1 mr-5 text-right'>当前值</div>
        <div className='flex-1 text-right'>涨跌幅</div>
      </div>
      <div className='w-full h-full '>
        {data.map(item => (
          <div className='w-full p-1 pt-4 text-center' align={'center'} key={item.datadate}>
            <div className='flex justify-around w-full h-[40px]'>
              {/* 日期 */}
              <div className='flex flex-col flex-grow-[2] text-left grow-2 '>
                <div className='text-xl font-bold text-gray-800 font-abel'>
                  {item.datadate.split('-')[1]}/{item.datadate.split('-')[2]}
                </div>
                <div className='text-sm text-gray-500 font-abel'>{item.datadate.split('-')[0]}</div>
              </div>
              {/* 价格 */}
              <Price item={item} />
              {/* 涨幅 */}
              <UpperCentage item={item} />
            </div>
            <hr className='mt-4' />
          </div>
        ))}
      </div>
    </div>
  )
}
