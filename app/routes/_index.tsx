import { useLoaderData } from '@remix-run/react';
import HeatMap from '~/components/Heatmap';
import { noticeWidePrice } from '~/fetch/tsi';

export async function loader() {
  return noticeWidePrice()
}

export default function Index() {
  const data = useLoaderData()
  return (
    <HeatMap data={data} />
  )
}
