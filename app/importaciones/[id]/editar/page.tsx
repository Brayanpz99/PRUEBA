import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { updateImportAction } from '@/app/importaciones/actions'

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E293B]'

const textareaClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E293B]'

const sectionClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-soft'

const units = ['METROS', 'KG', 'ROLLOS', 'UNIDADES']

function toDateInput(value: Date | string | null | undefined) {
  if (!value) return ''
  return new Date(value).toISOString().slice(0, 10)
}

type ItemFormRowProps = {
  item?: {
    itemCode: string
    description: string
    quantity: number
    unit: string
    unitPriceUsd: unknown
    netWeightKg: unknown
    grossWeightKg: unknown
    notes: string | null
  }
}

function ItemFormRow({ item }: ItemFormRowProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="grid gap-3 md:grid-cols-7">
        <input
          name="itemCode"
          placeholder="Código"
          defaultValue={item?.itemCode ?? ''}
          className={inputClass}
        />
        <input
          name="itemDescription"
          placeholder="Descripción"
          defaultValue={item?.description ?? ''}
          className={inputClass + ' md:col-span-2'}
        />
        <input
          name="itemQuantity"
          type="number"
          step="0.01"
          min="0"
          placeholder="Cantidad"
          defaultValue={item?.quantity ?? 0}
          className={inputClass}
        />
        <select
          name="itemUnit"
          defaultValue={item?.unit ?? 'METROS'}
          className={inputClass}
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <input
          name="itemUnitPriceUsd"
          type="number"
          step="0.0001"
          min="0"
          placeholder="Precio unitario"
          defaultValue={item ? Number(item.unitPriceUsd) : 0}
          className={inputClass}
        />
        <input
          name="itemNetWeightKg"
          type="number"
          step="0.01"
          min="0"
          placeholder="Peso neto kg"
          defaultValue={item ? Number(item.netWeightKg) : 0}
          className={inputClass}
        />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-7">
        <input
          name="itemGrossWeightKg"
          type="number"
          step="0.01"
          min="0"
          placeholder="Peso bruto kg"
          defaultValue={item ? Number(item.grossWeightKg) : 0}
          className={inputClass}
        />
        <input
          name="itemNotes"
          placeholder="Observaciones del ítem"
          defaultValue={item?.notes ?? ''}
          className={inputClass + ' md:col-span-6'}
        />
      </div>
    </div>
  )
}

export default async function EditarImportacionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await prisma.import.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemCode: 'asc' } },
    },
  })

  if (!data) notFound()

  const action = updateImportAction.bind(null, data.id)

  const rows = [...data.items]
  while (rows.length < 3) {
    rows.push(undefined as never)
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-slate-500">Editar importación</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{data.code}</h1>
      </div>

      <form action={action} className="space-y-6">
        <section className={sectionClass}>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Número de factura
              </label>
              <input
                name="invoiceNumber"
                required
                defaultValue={data.invoiceNumber}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha factura
              </label>
              <input
                name="invoiceDate"
                type="date"
                required
                defaultValue={toDateInput(data.invoiceDate)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Proveedor
              </label>
              <input
                name="supplier"
                required
                defaultValue={data.supplier}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Moneda
              </label>
              <input
                name="currency"
                defaultValue={data.currency ?? 'USD'}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Flete internacional
              </label>
              <input
                name="freightUsd"
                type="number"
                step="0.01"
                min="0"
                defaultValue={Number(data.freightUsd)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Prorrateo flete
              </label>
              <select
                name="freightProrationMethod"
                defaultValue={data.freightProrationMethod}
                className={inputClass}
              >
                <option value="POR_VALOR">POR_VALOR</option>
                <option value="POR_PESO_NETO">POR_PESO_NETO</option>
                <option value="POR_PESO_BRUTO">POR_PESO_BRUTO</option>
                <option value="POR_CANTIDAD">POR_CANTIDAD</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Descripción general
              </label>
              <textarea
                name="description"
                rows={2}
                defaultValue={data.description ?? ''}
                className={textareaClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Observaciones
              </label>
              <textarea
                name="notes"
                rows={2}
                defaultValue={data.notes ?? ''}
                className={textareaClass}
              />
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Documentación aduanera
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              DAI y póliza de seguro
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Edita la información documental de esta importación.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Número de DAI
              </label>
              <input
                name="daiNumber"
                type="text"
                defaultValue={data.daiNumber ?? ''}
                placeholder="Ej: DAI-2026-000123"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha DAI
              </label>
              <input
                name="daiDate"
                type="date"
                defaultValue={toDateInput(data.daiDate)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Número de póliza
              </label>
              <input
                name="insurancePolicyNumber"
                type="text"
                defaultValue={data.insurancePolicyNumber ?? ''}
                placeholder="Ej: POL-001245"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Aseguradora
              </label>
              <input
                name="insuranceCompany"
                type="text"
                defaultValue={data.insuranceCompany ?? ''}
                placeholder="Ej: Seguros Equinoccial"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha emisión póliza
              </label>
              <input
                name="insuranceIssuedAt"
                type="date"
                defaultValue={toDateInput(data.insuranceIssuedAt)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha vencimiento póliza
              </label>
              <input
                name="insuranceExpiresAt"
                type="date"
                defaultValue={toDateInput(data.insuranceExpiresAt)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Ítems de la factura
            </h2>
          </div>

          <div className="space-y-4">
            {rows.map((item, index) => (
              <ItemFormRow key={index} item={item} />
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-[#1E293B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#334155]"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  )
}