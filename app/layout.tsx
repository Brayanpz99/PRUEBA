import './globals.css'
import type { Metadata } from 'next'
import { Sidebar } from '@/components/shared/sidebar'

export const metadata: Metadata = {
  title: 'Mini ERP Costos',
  description: 'Control gerencial de costos de importación y producción',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <Sidebar />

          {/* CONTENIDO */}
          <main className="flex-1">
            <div className="h-full w-full px-6 py-6 lg:px-8 lg:py-8 xl:px-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}