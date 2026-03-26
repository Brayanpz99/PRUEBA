'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type CostTrendChartProps = {
  data: Array<{ lotCode: string; adjustedRealUnitCost: number }>
}

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function CostTrendChart({ data }: CostTrendChartProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft h-[360px]">
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-500">Evolución</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Costo por unidad por lote
        </h2>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 20, left: 10, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="lotCode" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => currency(value)}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
              }}
            />
            <Line
              type="monotone"
              dataKey="adjustedRealUnitCost"
              stroke="#1E293B"
              strokeWidth={3}
              dot={{ r: 4, fill: '#1E293B' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}