'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Moon,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
} from 'lucide-react'

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Properties', icon: Building2, count: '3' },
  { label: 'Tenants', icon: Users, count: '24' },
  { label: 'Payments', icon: CreditCard },
  { label: 'Expenses', icon: Wallet },
  { label: 'Maintenance', icon: Wrench, count: '4' },
  { label: 'Reports', icon: FileText },
]

const payments = [
  { name: 'John Doe', unit: 'Sunrise · 101', amount: 'KSh 20,000', method: 'M-Pesa', date: 'Today, 9:42 AM', status: 'Paid', initials: 'JD', tone: 'blue' },
  { name: 'Mary Wanjiku', unit: 'Greenview · B04', amount: 'KSh 18,500', method: 'Bank transfer', date: 'Today, 8:10 AM', status: 'Paid', initials: 'MW', tone: 'green' },
  { name: 'Jane Doe', unit: 'Sunrise · 103', amount: 'KSh 14,000', method: 'M-Pesa', date: 'Yesterday', status: 'Partial', initials: 'JD', tone: 'purple' },
  { name: 'Peter Mwangi', unit: 'Kasarani · 2A', amount: 'KSh 12,000', method: 'Cash', date: 'Aug 05, 2026', status: 'Paid', initials: 'PM', tone: 'orange' },
]

const arrears = [
  { name: 'Jane Doe', unit: 'Sunrise Apartments · 103', due: 'KSh 14,000', days: '12 days overdue', initials: 'JD' },
  { name: 'Brian Otieno', unit: 'Kasarani Heights · 2C', due: 'KSh 22,000', days: '7 days overdue', initials: 'BO' },
  { name: 'Amina Hassan', unit: 'Greenview Court · A02', due: 'KSh 9,500', days: '3 days overdue', initials: 'AH' },
]

const bars = [62, 74, 58, 88, 72, 94, 82, 100, 79, 90, 84, 96]

function formatCurrency(value: string) {
  return value
}

function Status({ children, tone = 'success' }: { children: React.ReactNode; tone?: 'success' | 'warning' | 'danger' | 'neutral' }) {
  return <span className={`status status-${tone}`}><span className="status-dot" />{children}</span>
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [modal, setModal] = useState<'payment' | 'property' | null>(null)
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')

  const visiblePayments = useMemo(() => payments.filter((payment) => payment.name.toLowerCase().includes(search.toLowerCase()) || payment.unit.toLowerCase().includes(search.toLowerCase())), [search])

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2800)
  }

  return (
    <div className={dark ? 'app-shell dark-mode' : 'app-shell'}>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Home size={19} strokeWidth={2.5} /></div><span>RentFlow <em>Kenya</em></span><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
        <div className="workspace"><div className="workspace-avatar">PS</div><div><strong>PROPERTY SHELTERS LTD</strong><small>Landlord account</small></div><ChevronDown size={15} /></div>
        <nav className="nav-list" aria-label="Main navigation">
          <p className="nav-caption">WORKSPACE</p>
          {nav.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon size={18} /> <span>{label}</span>{count && <b>{count}</b>}</button>)}
          <p className="nav-caption nav-caption-spaced">ACCOUNT</p>
          <button className={`nav-item ${active === 'Messages' ? 'active' : ''}`} onClick={() => setActive('Messages')}><MessageSquare size={18} /><span>Messages</span><b className="alert-count">2</b></button>
          <button className="nav-item" onClick={() => showNotice('Settings are coming soon')}><Settings size={18} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="secure-note"><ShieldCheck size={17} /><span><strong>Your data is secure</strong><small>Encrypted and protected</small></span></div><div className="profile"><div className="profile-avatar">PS</div><div><strong>PROPERTY SHELTERS LTD</strong><small>james@rentflow.co.ke</small></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><div className="search-wrap"><Search size={16} /><input aria-label="Search" placeholder="Search anything..." value={search} onChange={(e) => setSearch(e.target.value)} /></div><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button notification" onClick={() => showNotice('You have 2 unread notifications')} aria-label="Notifications"><Bell size={18} /><i /></button><div className="top-avatar">PS</div></div></header>

        <div className="page-content">
          <div className="welcome-row"><div><p className="eyebrow">SATURDAY, AUGUST 8, 2026</p><h1>Good morning, PROPERTY SHELTERS LTD <span>—</span></h1><p className="subtitle">Here&apos;s what&apos;s happening across your properties today.</p></div><div className="header-actions"><button className="button secondary" onClick={() => setModal('property')}><Plus size={16} /> Add property</button><button className="button primary" onClick={() => setModal('payment')}><CircleDollarSign size={16} /> Record payment</button></div></div>
          <div className="demo-banner"><Zap size={16} /><span><strong>Demo workspace</strong> — Sample data is shown for preview. Real payments are only recorded after manual confirmation or an official provider callback.</span><button onClick={() => showNotice('M-Pesa integration is ready to connect')}>Learn about M-Pesa <ArrowUpRight size={14} /></button></div>

          {active === 'Overview' ? <>
            <section className="metrics-grid" aria-label="Portfolio summary">
              <Metric icon={Building2} label="Total properties" value="3" trend="+1 this year" tone="blue" />
              <Metric icon={Home} label="Total units" value="48" trend="87.5% occupied" tone="purple" />
              <Metric icon={CircleDollarSign} label="Collected this month" value="KSh 812,500" trend="+12.8% vs last month" tone="green" />
              <Metric icon={Wallet} label="Outstanding rent" value="KSh 126,000" trend="3 tenants overdue" tone="orange" danger />
            </section>

            <section className="dashboard-grid"><div className="card chart-card"><div className="card-heading"><div><h2>Income overview</h2><p>Rent collection performance</p></div><button className="select-button">Last 12 months <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i className="legend-green" />Collected</span><span><i className="legend-muted" />Expected</span></div><div className="bar-chart">{bars.map((height, i) => <div className="bar-column" key={i}><div className="bar-track"><div className="bar-fill" style={{ height: `${height}%` }} /></div><small>{['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}</small></div>)}</div><div className="chart-total"><span>Collected this period <strong>KSh 8.42M</strong></span><span className="positive"><ArrowUpRight size={14} /> 18.4%</span></div></div><div className="card occupancy-card"><div className="card-heading"><div><h2>Occupancy</h2><p>Across all properties</p></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="donut-wrap"><div className="donut"><div><strong>87.5%</strong><small>occupied</small></div></div></div><div className="occupancy-stats"><div><span className="stat-key"><i className="dot green-dot" />Occupied</span><strong>42 units</strong></div><div><span className="stat-key"><i className="dot blue-dot" />Vacant</span><strong>6 units</strong></div></div><button className="full-link" onClick={() => setActive('Properties')}>View all units <ArrowUpRight size={14} /></button></div></section>

            <section className="bottom-grid"><div className="card payments-card"><div className="card-heading"><div><h2>Recent payments</h2><p>Latest transactions across your portfolio</p></div><button className="text-button" onClick={() => setActive('Payments')}>View all <ArrowUpRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>Tenant</th><th>Property / Unit</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead><tbody>{visiblePayments.map((payment) => <tr key={payment.name + payment.unit}><td><div className="tenant-cell"><span className={`initials ${payment.tone}`}>{payment.initials}</span><strong>{payment.name}</strong></div></td><td><span className="muted-cell">{payment.unit}</span></td><td><strong>{formatCurrency(payment.amount)}</strong><small className="date-cell">{payment.date}</small></td><td><span className="method-cell">{payment.method}</span></td><td><Status>{payment.status}</Status></td></tr>)}</tbody></table></div></div><div className="card arrears-card"><div className="card-heading"><div><h2>Outstanding rent</h2><p>Needs your attention</p></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="arrears-list">{arrears.map((item) => <div className="arrear-row" key={item.name}><span className="initials red">{item.initials}</span><div className="arrear-info"><strong>{item.name}</strong><small>{item.unit}</small></div><div className="arrear-amount"><strong>{item.due}</strong><small>{item.days}</small></div></div>)}</div><button className="full-link warning-link" onClick={() => setActive('Payments')}>Review arrears <ArrowUpRight size={14} /></button></div></section>
          </> : <PlaceholderView active={active} onAction={() => setModal('payment')} />}
        </div>
        <footer className="footer"><span>© 2026 RentFlow Kenya</span><span>Secure rent management, made simple.</span><span><ShieldCheck size={13} /> Demo workspace</span></footer>
      </main>
      <div className="mobile-nav">{nav.slice(0, 4).map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon size={19} /><span>{label === 'Overview' ? 'Home' : label}</span></button>)}</div>
      {notice && <div className="toast"><Check size={16} />{notice}</div>}
      {modal && <Modal type={modal} close={() => setModal(null)} confirm={() => { setModal(null); showNotice(modal === 'payment' ? 'Payment saved as manually recorded' : 'Property draft created') }} />}
    </div>
  )
}

function Metric({ icon: Icon, label, value, trend, tone, danger }: { icon: typeof Home; label: string; value: string; trend: string; tone: string; danger?: boolean }) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18} /></div><div className="metric-label">{label}</div><strong className="metric-value">{value}</strong><span className={danger ? 'metric-trend danger-text' : 'metric-trend'}>{danger ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{trend}</span></div>
}

function PlaceholderView({ active, onAction }: { active: string; onAction: () => void }) {
  const copy: Record<string, { icon: typeof Home; description: string; action: string }> = { Properties: { icon: Building2, description: 'Manage buildings, units, occupancy, and property documents.', action: 'Add property' }, Tenants: { icon: Users, description: 'Keep tenant information, leases, deposits, and payment history organized.', action: 'Add tenant' }, Payments: { icon: CreditCard, description: 'Record confirmed payments, review arrears, and download receipts.', action: 'Record payment' }, Expenses: { icon: Wallet, description: 'Track repairs, utilities, maintenance, and operating expenses.', action: 'Add expense' }, Maintenance: { icon: Wrench, description: 'Review and update maintenance requests from your tenants.', action: 'View requests' }, Reports: { icon: FileText, description: 'Export income, arrears, expenses, and occupancy reports.', action: 'Create report' }, Messages: { icon: MessageSquare, description: 'Stay in touch with tenants about rent, maintenance, and announcements.', action: 'New message' } }
  const item = copy[active] ?? copy.Properties; const Icon = item.icon
  return <div className="placeholder"><div className="placeholder-icon"><Icon size={28} /></div><p className="eyebrow">RENTFLOW WORKSPACE</p><h2>{active}</h2><p>{item.description}</p><div className="placeholder-actions"><button className="button primary" onClick={onAction}><Plus size={16} /> {item.action}</button><button className="button secondary" onClick={() => {}}>Import sample data</button></div><small>This view is ready for your real records. Demo data will never be presented as confirmed financial activity.</small></div>
}

function Modal({ type, close, confirm }: { type: 'payment' | 'property'; close: () => void; confirm: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><div className="modal-head"><div><p className="eyebrow">{type === 'payment' ? 'MANUAL RECORD' : 'PROPERTY SETUP'}</p><h2>{type === 'payment' ? 'Record a payment' : 'Add a property'}</h2></div><button className="more-button" onClick={close} aria-label="Close"><X size={18} /></button></div>{type === 'payment' ? <><label>Tenant<select><option>Jane Doe · Sunrise 103</option><option>John Doe · Sunrise 101</option></select></label><label>Amount paid<div className="input-prefix"><span>KSh</span><input defaultValue="14000" /></div></label><div className="form-row"><label>Payment method<select><option>M-Pesa (manual)</option><option>Bank transfer</option><option>Cash</option></select></label><label>Reference ID<input placeholder="e.g. QWE12345" /></label></div><div className="modal-note"><ShieldCheck size={16} /><span>Only record payments you have verified. M-Pesa is integration-ready, but this form does not claim provider confirmation.</span></div></> : <><label>Property name<input placeholder="e.g. Sunrise Apartments" /></label><div className="form-row"><label>Location<input placeholder="Kasarani, Nairobi" /></label><label>Property type<select><option>Apartment building</option><option>Rooms / bedsitters</option><option>Commercial</option></select></label></div><label>Address<input placeholder="Street address" /></label><label>Description<textarea placeholder="A short description of the property" rows={3} /></label></>}<div className="modal-actions"><button className="button secondary" onClick={close}>Cancel</button><button className="button primary" onClick={confirm}><Check size={16} /> {type === 'payment' ? 'Save payment' : 'Create property'}</button></div></div></div>
}
