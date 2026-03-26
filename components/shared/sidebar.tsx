import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, FileText, Download } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/importaciones', label: 'Importaciones', icon: FileText },
  { href: '/exportar', label: 'Exportar', icon: Download },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-6">
        <div className="flex items-center justify-center rounded-3xl bg-[#0F172A] px-4 py-5">
          <Image
            src="/logo-northex.png"
            alt="NORTHEX IMP & EXP S.A.S."
            width={210}
            height={70}
            className="h-auto w-full max-w-[210px] object-contain"
            priority
          />
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F172A] text-sm font-semibold text-white">
          N
        </div>
      </div>
    </aside>
  )
}