import { useSearchParams } from 'react-router'
import { Pie, PieChart } from 'recharts'

import { useGetBalance } from '@/api/hooks/user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

export function ChartPieLegend() {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data } = useGetBalance({ from, to })

  const chartData = [
    {
      browser: 'ganhos',
      visitors: Number(data?.earnings || 0),
      fill: 'hsl(var(--primary-green))',
    },
    {
      browser: 'gastos',
      visitors: Number(data?.expenses || 0),
      fill: 'hsl(var(--primary-red))',
    },
    {
      browser: 'investimentos',
      visitors: Number(data?.investments || 0),
      fill: 'hsl(var(--primary-blue))',
    },
  ]

  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    ganhos: {
      label: 'Ganhos',
      color: 'hsl(var(--chart-1))',
    },
    gastos: {
      label: 'Gastos',
      color: 'hsl(var(--chart-2))',
    },
    investimentos: {
      label: 'Investimentos',
      color: 'hsl(var(--chart-3))',
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-md text-muted-foreground">Gráfico</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
