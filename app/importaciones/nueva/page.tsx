import { createImportAction } from '@/app/importaciones/actions'

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E293B]'

const textareaClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E293B]'

const sectionClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-soft'

const units = ['METROS', 'KG', 'ROLLOS', 'UNIDADES']

function ItemRow({ index }: { index: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="grid gap-3 md:grid-cols-7">
        <input name="itemCode" placeholder="Código" className={inputClass} />
        <input name="itemDescription" placeholder="Descripción" className={inputClass + ' md:col-span-2'} />
        <input name="itemQuantity" type="number" step="0.01" min="0" placeholder="Cantidad" className={inputClass} />
        <select name="itemUnit" defaultValue="METROS" className={inputClass}>
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
          className={inputClass}
        />
        <input
          name="itemNetWeightKg"
          type="number"
          step="0.01"
          min="0"
          placeholder="Peso neto kg"
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
          className={inputClass}
        />
        <input
          name="itemNotes"
          placeholder="Observaciones del ítem"
          className={inputClass + ' md:col-span-6'}
        />
      </div>
    </div>
  )
}

export default function NuevaImportacionPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-slate-500">Nueva importación</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Registrar factura con múltiples ítems
        </h1>
      </div>

      <form action={createImportAction} className="space-y-6">
        <section className={sectionClass}>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Número de factura
              </label>
              <input name="invoiceNumber" required className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha factura
              </label>
              <input name="invoiceDate" type="date" required className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Proveedor
              </label>
              <input name="supplier" required className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Moneda
              </label>
              <input name="currency" defaultValue="USD" className={inputClass} />
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
                defaultValue="0"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Prorrateo flete
              </label>
              <select name="freightProrationMethod" defaultValue="POR_VALOR" className={inputClass}>
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
              <textarea name="description" rows={2} className={textareaClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Observaciones
              </label>
              <textarea name="notes" rows={2} className={textareaClass} />
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
              Registra la trazabilidad documental de esta importación.
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
                placeholder="Ej: DAI-2026-000123"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha DAI
              </label>
              <input name="daiDate" type="date" className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Número de póliza
              </label>
              <input
                name="insurancePolicyNumber"
                type="text"
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
                placeholder="Ej: Seguros Equinoccial"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha emisión póliza
              </label>
              <input name="insuranceIssuedAt" type="date" className={inputClass} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fecha vencimiento póliza
              </label>
              <input name="insuranceExpiresAt" type="date" className={inputClass} />
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
            <ItemRow index={0} />
            <ItemRow index={1} />
            <ItemRow index={2} />
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-[#1E293B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#334155]"
          >
            Guardar importación
          </button>
        </div>
      </form>
    </div>
  )
}