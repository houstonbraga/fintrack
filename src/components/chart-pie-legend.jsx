import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const chartData = [
  { browser: 'ganhos', visitors: 275, fill: 'hsl(var(--primary-green))' },
  { browser: 'gastos', visitors: 200, fill: 'hsl(var(--primary-red))' },
  { browser: 'investimentos', visitors: 187, fill: 'hsl(var(--primary-blue))' },
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

export function ChartPieLegend() {
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
