import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { ExpenseChart } from '@/components/charts/expense-chart'
import { CostTrendChart } from '@/components/charts/cost-trend-chart'
import { formatUsd } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'

export default async function DashboardPage() {
  const imports = await prisma.import.findMany({
    include: {
      expenses: true,
      items: { include: { production: true } },
      snapshots: { orderBy: { version: 'desc' }, take: 1 },
    },
    orderBy: { invoiceDate: 'desc' },
  })

  const totalInvested = imports.reduce((sum, row) => sum + Number(row.totalInvestedUsd), 0)
  const totalExpenses = imports.reduce((sum, row) => sum + Number(row.totalAdditionalExpenses), 0)
  const totalProduced = imports.reduce((sum, row) => sum + row.items.reduce((acc, item) => acc + (item.production?.producedUnits ?? 0), 0), 0)
  const totalDefective = imports.reduce((sum, row) => sum + row.items.reduce((acc, item) => acc + (item.production?.defectiveUnits ?? 0), 0), 0)

  const expenseMap = new Map<string, number>()
  imports.forEach((row) => row.expenses.forEach((expense) => expenseMap.set(expense.category, (expenseMap.get(expense.category) ?? 0) + Number(expense.amountUsd))))
  const expenseChartData = Array.from(expenseMap.entries()).map(([name, value]) => ({ name, value }))

  const trendData = imports
    .filter((row) => row.snapshots[0])
    .map((row) => ({ lotCode: row.code, adjustedRealUnitCost: Number(row.snapshots[0].weightedSellableUnitCost) }))
    .reverse()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><p className="text-sm font-medium text-slate-500">Resumen gerencial</p><h1 className="text-4xl font-semibold tracking-tight text-slate-950">Dashboard de costos por importación</h1><p className="mt-2 text-slate-500">Costo real por ítem, prorrateo y producción consolidada.</p></div>
        <Link href="/importaciones/nueva" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Nueva importación</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total invertido" value={formatUsd(totalInvested)} />
        <KpiCard title="Gastos adicionales" value={formatUsd(totalExpenses)} />
        <KpiCard title="Unidades confeccionadas" value={String(totalProduced)} />
        <KpiCard title="Unidades defectuosas" value={String(totalDefective)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart data={expenseChartData.length ? expenseChartData : [{ name: 'Sin datos', value: 0 }]} />
        <CostTrendChart data={trendData.length ? trendData : [{ lotCode: 'N/A', adjustedRealUnitCost: 0 }]} />
      </div>

      <div className="table-card">
        <div className="border-b border-slate-200 px-6 py-5"><h2 className="text-xl font-semibold text-slate-950">Últimas importaciones</h2></div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="px-6 py-4">Código</th><th className="px-6 py-4">Fecha</th><th className="px-6 py-4">Proveedor</th><th className="px-6 py-4">Invertido</th><th className="px-6 py-4">Costo vendible</th></tr></thead><tbody>
            {imports.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-6 py-4"><Link href={`/importaciones/${row.id}`} className="font-semibold text-slate-950 hover:underline">{row.code}</Link></td>
                <td className="px-6 py-4">{formatDate(row.invoiceDate)}</td>
                <td className="px-6 py-4">{row.supplier}</td>
                <td className="px-6 py-4">{formatUsd(Number(row.totalInvestedUsd))}</td>
                <td className="px-6 py-4">{row.snapshots[0] ? formatUsd(Number(row.snapshots[0].weightedSellableUnitCost)) : '-'}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </div>
  )
}
