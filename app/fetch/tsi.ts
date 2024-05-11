import { json } from '@remix-run/node'
import { addDays, format, addMonths } from 'date-fns'

export async function noticeWidePrice() {
  const sdate = format(addMonths(new Date(), -4), 'yyyy-MM-dd')
  const edate = format(addDays(new Date(), 0), 'yyyy-MM-dd')
  const token = `eyJhbGciOiJIUzI1NiIsImlhdCI6MTY5MDg1Mzc1NywiZXhwIjoxNjkwODU3MzU3fQ.eyJ1c2VyaWQiOjY2OH0.5BJ7JKEocndS2pe4g9G2-FkDrnLRFwHVomvjAJI1F5c`
  const apiUrl = `https://service.chinatsi.net/api_v1/wechat/data/billet/nationwideprice?begin=${sdate}&end=${edate}&token=${token}`
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch data from external API')
  }
  const data = await response.json()
  return json(data)
}

export const messages = async () => {
  const edate = format(addDays(new Date(), 1), 'yyyy-MM-dd')
  const sdate = format(addDays(new Date(), 0), 'yyyy-MM-dd')
  const keyword = ''
  const pernum = 30
  const apiUrl = `http://114.113.152.67:8118/API_V1/API_MSGBYMSSQL/MSG_INFO?keyword=${keyword}&sdate=${sdate}&edate=${edate}&pz=&pagenum=1&pernum=${pernum}`
  console.log(apiUrl)
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
