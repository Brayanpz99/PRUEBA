'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type ExpenseChartProps = {
  data: Array<{ name: string; value: number }>
}

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft h-[360px]">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">Distribución de gastos</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Gastos por categoría (USD)
        </h2>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 20, left: 10, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={110}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => currency(value)}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
              }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#1E293B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}