import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: '卡片数据' }, { name: 'description', content: '热门信息一卡触达' }]
}

export default function Page() {
  return <>card info page</>
}
