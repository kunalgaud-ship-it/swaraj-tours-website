import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, BadgeCheck, CalendarDays, CarFront, Check, CircleAlert,
  ClipboardList, FileText, LayoutDashboard, LoaderCircle, LogOut, Plus, Save, Search,
  Settings2, ShieldCheck, Trash2,
} from 'lucide-react';
import { applySiteConfig, CollectionKey, getEditableSiteConfig, SiteConfig, stripBundledImageUrls } from '../admin/siteConfig';

type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
interface BookingRecord {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  trip_type: string;
  pickup_city: string;
  drop_city: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string | null;
  vehicle_name: string;
  passengers: number;
  estimated_fare: number | null;
  status: BookingStatus;
  created_at: string;
}

type AdminTab = 'overview' | 'bookings' | 'rates' | 'content';
const ACCESS_KEY = 'swaraj-admin-access-token';
const REFRESH_KEY = 'swaraj-admin-refresh-token';
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const collections: { key: CollectionKey; label: string }[] = [
  { key: 'packages', label: 'Tour packages' },
  { key: 'destinations', label: 'Destinations' },
  { key: 'services', label: 'Services' },
  { key: 'offers', label: 'Offers' },
  { key: 'faqs', label: 'FAQs' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'travelGuides', label: 'Travel guides' },
  { key: 'routeHubs', label: 'Route hubs' },
];

const statusOptions: BookingStatus[] = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];

async function refreshAdminSession() {
  const refreshToken = sessionStorage.getItem(REFRESH_KEY);
  if (!refreshToken || !supabaseUrl || !publishableKey) return '';
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!response.ok) return '';
  const session = await response.json();
  sessionStorage.setItem(ACCESS_KEY, session.access_token);
  sessionStorage.setItem(REFRESH_KEY, session.refresh_token);
  return session.access_token as string;
}

async function adminFetch(path: string, init: RequestInit = {}) {
  const send = (token: string) => fetch(path, {
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  let token = sessionStorage.getItem(ACCESS_KEY) || '';
  let response = await send(token);
  if (response.status === 401) {
    token = await refreshAdminSession();
    if (token) response = await send(token);
  }
  return response;
}

async function readError(response: Response, fallback: string) {
  try {
    const body = await response.json();
    return typeof body.error === 'string' ? body.error : fallback;
  } catch {
    return fallback;
  }
}

const inr = (amount: number | null | undefined) =>
  typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : '—';

const displayDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('overview');
  const [signedIn, setSignedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getEditableSiteConfig());
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [activeCollection, setActiveCollection] = useState<CollectionKey>('packages');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');

  useEffect(() => {
    document.title = 'Admin | Swaraj Tours and Travels';
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
  }, []);

  const refreshPanelData = async () => {
    setLoading(true);
    setError('');
    try {
      const [configResponse, bookingsResponse] = await Promise.all([
        adminFetch('/api/admin/site-config'),
        adminFetch('/api/admin/bookings'),
      ]);
      if (!configResponse.ok) throw new Error(await readError(configResponse, 'Could not load admin settings.'));
      if (!bookingsResponse.ok) throw new Error(await readError(bookingsResponse, 'Could not load booking enquiries.'));
      const configResult = await configResponse.json();
      const bookingsResult = await bookingsResponse.json();
      const config = (configResult.config || {}) as SiteConfig;
      applySiteConfig(config);
      setSiteConfig(getEditableSiteConfig());
      setBookings(Array.isArray(bookingsResult.bookings) ? bookingsResult.bookings : []);
      setSignedIn(true);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Could not connect to the admin service.';
      setError(message);
      if (/sign-in|unauthorized|admin/i.test(message)) {
        sessionStorage.removeItem(ACCESS_KEY);
        sessionStorage.removeItem(REFRESH_KEY);
        setSignedIn(false);
      }
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_KEY)) void refreshPanelData();
    else setCheckingSession(false);
    // Only validate the saved session once when the admin route opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!supabaseUrl || !publishableKey) {
      setError('Admin sign-in is not configured yet. Follow ADMIN_SETUP.md to connect the database.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { apikey: publishableKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!response.ok) throw new Error(await readError(response, 'Email or password is incorrect.'));
      const session = await response.json();
      sessionStorage.setItem(ACCESS_KEY, session.access_token);
      sessionStorage.setItem(REFRESH_KEY, session.refresh_token);
      await refreshPanelData();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sign in.');
      setLoading(false);
      setCheckingSession(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    setSignedIn(false);
    setBookings([]);
    setNotice('');
    setError('');
  };

  const saveConfig = async (nextConfig: SiteConfig) => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await adminFetch('/api/admin/site-config', {
        method: 'PUT',
        body: JSON.stringify({ config: stripBundledImageUrls(nextConfig) }),
      });
      if (!response.ok) throw new Error(await readError(response, 'Could not save website changes.'));
      setSiteConfig(nextConfig);
      applySiteConfig(nextConfig);
      setNotice('Saved. Refresh the public website to show the new content and rates.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save website changes.');
    } finally {
      setSaving(false);
    }
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    setError('');
    setNotice('');
    try {
      const response = await adminFetch('/api/admin/bookings', {
        method: 'PATCH',
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error(await readError(response, 'Could not update booking status.'));
      setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
      setNotice('Booking status updated.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not update booking status.');
    }
  };

  const activeRecords = (siteConfig[activeCollection] || []) as unknown as Record<string, unknown>[];
  const selectedRecord = activeRecords[selectedIndex] || activeRecords[0] || null;
  const visibleBookings = useMemo(() => bookings.filter((booking) => {
    const haystack = `${booking.booking_ref} ${booking.customer_name} ${booking.customer_phone} ${booking.pickup_city} ${booking.drop_city}`.toLowerCase();
    return (bookingFilter === 'all' || booking.status === bookingFilter) && haystack.includes(bookingSearch.trim().toLowerCase());
  }), [bookings, bookingFilter, bookingSearch]);

  if (checkingSession) {
    return <div className="grid min-h-screen place-items-center bg-slate-950 text-white"><LoaderCircle className="h-8 w-8 animate-spin text-amber-400" /></div>;
  }

  if (!signedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-slate-900">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-7 py-8 text-white sm:px-9">
            <a href="/" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to website</a>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-500 text-slate-950"><ShieldCheck className="h-6 w-6" /></div>
            <h1 className="text-2xl font-black">Swaraj Admin</h1>
            <p className="mt-1 text-sm text-slate-300">Sign in to manage bookings, fares and website content.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 px-7 py-7 sm:px-9">
            <label className="block text-sm font-bold text-slate-700">Admin email
              <input autoComplete="username" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" placeholder="you@example.com" />
            </label>
            <label className="block text-sm font-bold text-slate-700">Password
              <input autoComplete="current-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100" placeholder="Your admin password" />
            </label>
            {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-800">{error}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 disabled:opacity-60">
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Secure sign in
            </button>
            {!supabaseUrl || !publishableKey ? (
              <p className="rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-900">Connect the secure database and login first. Follow the <strong>ADMIN_SETUP.md</strong> guide in the website project files.</p>
            ) : <p className="text-center text-[11px] text-slate-500">Only an account approved as an admin can open this panel.</p>}
          </form>
        </div>
      </main>
    );
  }

  const tabItems: { key: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'bookings', label: 'Booking enquiries', icon: ClipboardList },
    { key: 'rates', label: 'Rates & fleet', icon: CarFront },
    { key: 'content', label: 'Website content', icon: FileText },
  ];

  const updateCollection = (key: CollectionKey, records: Record<string, unknown>[]) => {
    setSiteConfig((current) => ({ ...current, [key]: records }) as SiteConfig);
  };

  const changeSelectedField = (field: string, value: unknown) => {
    const nextRecords = activeRecords.map((record, index) => index === selectedIndex ? { ...record, [field]: value } : record);
    updateCollection(activeCollection, nextRecords);
  };

  const addRecord = () => {
    const source = selectedRecord || {};
    const copy = JSON.parse(JSON.stringify(source)) as Record<string, unknown>;
    const now = Date.now();
    if ('id' in copy) copy.id = `${String(copy.id || activeCollection)}-${now}`;
    if ('title' in copy) copy.title = `New ${String(copy.title || 'item')}`;
    else if ('name' in copy) copy.name = `New ${String(copy.name || 'item')}`;
    else if ('hub' in copy) copy.hub = `New hub ${now}`;
    const next = [...activeRecords, copy];
    updateCollection(activeCollection, next);
    setSelectedIndex(next.length - 1);
  };

  const removeRecord = () => {
    if (activeRecords.length <= 1 || !window.confirm('Delete this item from the website?')) return;
    updateCollection(activeCollection, activeRecords.filter((_, index) => index !== selectedIndex));
    setSelectedIndex(Math.max(0, selectedIndex - 1));
  };

  const updateCompanyField = (field: string, value: unknown) => {
    setSiteConfig((current) => ({
      ...current,
      companyInfo: { ...(current.companyInfo || {}), [field]: value } as SiteConfig['companyInfo'],
    }));
  };

  const tabTitle = tabItems.find((item) => item.key === tab)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-amber-400"><CarFront className="h-5 w-5" /></span>
            <span className="min-w-0"><strong className="block truncate text-sm font-black sm:text-base">Swaraj Admin</strong><span className="hidden text-[11px] font-medium text-slate-500 sm:block">Bookings, fares and website content</span></span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/" className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:flex"><ArrowLeft className="h-3.5 w-3.5" /> Website</a>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"><LogOut className="h-3.5 w-3.5" /><span className="hidden sm:inline">Sign out</span></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-3 py-4 sm:px-6 sm:py-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm lg:sticky lg:top-[78px] lg:h-fit lg:flex-col lg:overflow-visible">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.key} onClick={() => { setTab(item.key); setError(''); setNotice(''); }} className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-colors sm:text-sm ${tab === item.key ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`}><Icon className="h-4 w-4" /><span>{item.label}</span></button>;
          })}
          <div className="hidden border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-500 lg:block">Changes are saved to the website database. Refresh the public site after saving.</div>
        </nav>

        <main className="min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">Swaraj Tours and Travels</p><h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{tabTitle}</h1></div>
            {tab !== 'overview' && <button onClick={() => void refreshPanelData()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"><LoaderCircle className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : 'hidden'}`} /> Refresh</button>}
          </div>

          {(error || notice) && <div role={error ? 'alert' : 'status'} className={`mb-4 flex items-start gap-2 rounded-xl border p-3 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
            {error ? <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" /> : <Check className="mt-0.5 h-4 w-4 shrink-0" />}<span>{error || notice}</span>
          </div>}

          {tab === 'overview' && (
            <section className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total enquiries" value={bookings.length} icon={ClipboardList} />
                <StatCard label="New enquiries" value={bookings.filter((booking) => booking.status === 'new').length} icon={CalendarDays} accent="amber" />
                <StatCard label="Vehicles" value={siteConfig.vehicles?.length || 0} icon={CarFront} />
                <StatCard label="Website sections" value={collections.length + 1} icon={FileText} accent="blue" />
              </div>
              <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="mb-4 flex items-center justify-between"><h2 className="font-black">Recent enquiries</h2><button onClick={() => setTab('bookings')} className="text-xs font-bold text-blue-700 hover:underline">View all</button></div>
                  {bookings.length ? <div className="space-y-2">{bookings.slice(0, 5).map((booking) => <BookingSummary key={booking.id} booking={booking} />)}</div> : <EmptyState title="No enquiries yet" detail="New website booking requests will show here after the database is connected." />}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <h2 className="mb-4 font-black">Quick actions</h2>
                  <div className="grid gap-2">
                    <button onClick={() => setTab('rates')} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50"><span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-50 text-amber-700"><Settings2 className="h-4 w-4" /></span><span><strong className="block text-sm">Update a fare</strong><small className="text-xs text-slate-500">Edit per-km and starting prices</small></span></button>
                    <button onClick={() => setTab('content')} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700"><FileText className="h-4 w-4" /></span><span><strong className="block text-sm">Edit website content</strong><small className="text-xs text-slate-500">Packages, FAQs, offers and more</small></span></button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {tab === 'bookings' && (
            <section className="space-y-4">
              <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_200px]">
                <label className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={bookingSearch} onChange={(event) => setBookingSearch(event.target.value)} placeholder="Search name, phone, route or ref" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500" /></label>
                <select value={bookingFilter} onChange={(event) => setBookingFilter(event.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500"><option value="all">All statuses</option>{statusOptions.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select>
              </div>
              {visibleBookings.length ? <div className="space-y-3">{visibleBookings.map((booking) => <BookingCard key={booking.id} booking={booking} onStatusChange={(status) => void updateBookingStatus(booking.id, status)} />)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><EmptyState title="No booking enquiries found" detail="Booking requests are saved here after the database is set up." /></div>}
            </section>
          )}

          {tab === 'rates' && (
            <section className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4"><h2 className="font-black">Vehicle fares</h2><p className="mt-1 text-xs text-slate-500">Changes update the fleet, booking form and fare calculator.</p></div>
                <div className="space-y-3">{(siteConfig.vehicles || []).map((vehicle, index) => <div key={vehicle.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[minmax(150px,1fr)_repeat(4,minmax(90px,0.7fr))] sm:items-end">
                  <div className="min-w-0"><p className="truncate text-sm font-extrabold">{vehicle.name}</p><p className="text-[11px] text-slate-500">{vehicle.seats} seats · {vehicle.category}</p></div>
                  <NumberEditor label="₹ / km" value={vehicle.ratePerKm} onChange={(value) => patchVehicle(index, 'ratePerKm', value)} />
                  <NumberEditor label="One-way from ₹" value={vehicle.oneWayStartingPrice} onChange={(value) => patchVehicle(index, 'oneWayStartingPrice', value)} />
                  <NumberEditor label="Min km / day" value={vehicle.minKmPerDay} onChange={(value) => patchVehicle(index, 'minKmPerDay', value)} />
                  <NumberEditor label="Driver / day ₹" value={vehicle.driverAllowancePerDay} onChange={(value) => patchVehicle(index, 'driverAllowancePerDay', value)} />
                  {vehicle.localStartingPrice !== undefined && <div className="sm:col-start-2"><NumberEditor label="Local package ₹" value={vehicle.localStartingPrice} onChange={(value) => patchVehicle(index, 'localStartingPrice', value)} /></div>}
                </div>)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4"><h2 className="font-black">Popular route starting fares</h2><p className="mt-1 text-xs text-slate-500">The fare shown on the route cards and booking messages.</p></div>
                <div className="grid gap-2 md:grid-cols-2">{(siteConfig.routes || []).map((route, index) => <label key={route.id} className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5"><span className="min-w-0"><strong className="block truncate text-xs">{route.from} → {route.to}</strong><small className="text-[10px] text-slate-500">{route.routeType} · {route.distanceKm} km</small></span><span className="w-28 shrink-0"><NumberEditor label="Starting ₹" value={route.startingPrice} onChange={(value) => patchRoute(index, value)} /></span></label>)}</div>
              </div>
              <SaveBar saving={saving} onSave={() => void saveConfig(siteConfig)} />
            </section>
          )}

          {tab === 'content' && (
            <section className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-black">Business profile</h2><p className="mt-1 text-xs text-slate-500">Contact details used across the website.</p></div></div>
                <div className="grid gap-3 sm:grid-cols-2">{Object.entries(siteConfig.companyInfo || {}).map(([field, value]) => <EditableField key={field} field={field} value={value} onChange={(next) => updateCompanyField(field, next)} />)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div><h2 className="font-black">Website sections</h2><p className="mt-1 text-xs text-slate-500">Edit the text and details visitors see on the website.</p></div>
                  <div className="flex items-center gap-2"><button onClick={addRecord} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-bold hover:bg-slate-50"><Plus className="h-3.5 w-3.5" /> Copy item</button><button onClick={removeRecord} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
                  <label className="text-xs font-bold text-slate-600">Section
                    <select value={activeCollection} onChange={(event) => { setActiveCollection(event.target.value as CollectionKey); setSelectedIndex(0); }} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500">{collections.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select>
                  </label>
                  <label className="text-xs font-bold text-slate-600">Item
                    <select value={selectedIndex} onChange={(event) => setSelectedIndex(Number(event.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500">{activeRecords.map((record, index) => <option key={`${String(record.id || record.title || index)}-${index}`} value={index}>{String(record.title || record.name || record.question || record.hub || record.id || `Item ${index + 1}`)}</option>)}</select>
                  </label>
                </div>
                {selectedRecord ? <div className="mt-4 grid gap-3 sm:grid-cols-2">{Object.entries(selectedRecord).map(([field, value]) => <EditableField key={field} field={field} value={value} onChange={(next) => changeSelectedField(field, next)} />)}</div> : <EmptyState title="No items in this section" detail="Add an item in the next update." />}
              </div>
              <SaveBar saving={saving} onSave={() => void saveConfig(siteConfig)} />
            </section>
          )}
        </main>
      </div>
    </div>
  );

  function patchVehicle(index: number, field: 'ratePerKm' | 'oneWayStartingPrice' | 'minKmPerDay' | 'driverAllowancePerDay' | 'localStartingPrice', value: number) {
    const vehicles = [...(siteConfig.vehicles || [])];
    vehicles[index] = { ...vehicles[index], [field]: value };
    setSiteConfig((current) => ({ ...current, vehicles }));
  }

  function patchRoute(index: number, value: number) {
    const routes = [...(siteConfig.routes || [])];
    routes[index] = { ...routes[index], startingPrice: value };
    setSiteConfig((current) => ({ ...current, routes }));
  }
}

function statusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function StatCard({ label, value, icon: Icon, accent = 'slate' }: { label: string; value: number; icon: typeof LayoutDashboard; accent?: 'slate' | 'amber' | 'blue' }) {
  const colors = accent === 'amber' ? 'bg-amber-50 text-amber-700' : accent === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700';
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-500">{label}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${colors}`}><Icon className="h-4 w-4" /></span></div><p className="mt-3 text-3xl font-black tracking-tight">{value.toLocaleString('en-IN')}</p></div>;
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="grid min-h-36 place-items-center text-center"><div><div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-400"><ClipboardList className="h-5 w-5" /></div><strong className="text-sm">{title}</strong><p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{detail}</p></div></div>;
}

function BookingSummary({ booking }: { booking: BookingRecord }) {
  return <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"><div className="min-w-0"><p className="truncate text-xs font-extrabold">{booking.customer_name || 'Traveler'} <span className="font-medium text-slate-500">· {booking.pickup_city} → {booking.drop_city}</span></p><p className="mt-0.5 text-[10px] text-slate-500">{booking.booking_ref} · {displayDate(booking.created_at)}</p></div><BookingStatusBadge status={booking.status} /></div>;
}

function BookingCard({ booking, onStatusChange }: { booking: BookingRecord; onStatusChange: (status: BookingStatus) => void }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-black">{booking.customer_name || 'Traveler'}</h2><BookingStatusBadge status={booking.status} /></div><p className="mt-1 text-xs font-semibold text-slate-500">{booking.booking_ref} · {displayDate(booking.created_at)}</p></div>
      <select aria-label="Booking status" value={booking.status} onChange={(event) => onStatusChange(event.target.value as BookingStatus)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold outline-none focus:border-amber-500">{statusOptions.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select>
    </div>
    <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 xl:grid-cols-4">
      <BookingInfo label="Route" value={`${booking.pickup_city} → ${booking.drop_city}`} />
      <BookingInfo label="Pickup" value={`${displayDate(booking.pickup_date)} · ${booking.pickup_time || 'Time not set'}`} />
      <BookingInfo label="Vehicle & passengers" value={`${booking.vehicle_name} · ${booking.passengers}`} />
      <BookingInfo label="Estimate" value={inr(booking.estimated_fare)} />
      <BookingInfo label="Phone" value={booking.customer_phone} href={`tel:${booking.customer_phone}`} />
      <BookingInfo label="Email" value={booking.customer_email || 'Not provided'} href={booking.customer_email ? `mailto:${booking.customer_email}` : undefined} />
      <BookingInfo label="Trip type" value={booking.trip_type.replace('-', ' ')} />
      {booking.return_date && <BookingInfo label="Return date" value={displayDate(booking.return_date)} />}
    </div>
  </article>;
}

function BookingInfo({ label, value, href }: { label: string; value: string; href?: string }) {
  return <div className="min-w-0 rounded-lg bg-slate-50 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>{href ? <a href={href} className="mt-0.5 block truncate font-bold text-blue-700 hover:underline">{value}</a> : <p className="mt-0.5 break-words font-bold text-slate-800">{value}</p>}</div>;
}

function BookingStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: 'bg-amber-100 text-amber-800', contacted: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-emerald-100 text-emerald-800', completed: 'bg-slate-200 text-slate-700',
    cancelled: 'bg-rose-100 text-rose-800',
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ${styles[status] || styles.new}`}><BadgeCheck className="h-3 w-3" />{statusLabel(status)}</span>;
}

function NumberEditor({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="block min-w-0 text-[10px] font-bold text-slate-500">{label}<input type="number" min="0" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm font-extrabold text-slate-900 outline-none focus:border-amber-500" /></label>;
}

function EditableField({ field, value, onChange }: { field: string; value: unknown; onChange: (value: unknown) => void }) {
  const label = field.replace(/([A-Z])/g, ' $1');
  const textArray = Array.isArray(value) && value.every((item) => typeof item === 'string');
  const structured = (Array.isArray(value) && !textArray) || (value !== null && typeof value === 'object');
  const [jsonText, setJsonText] = useState(() => structured ? JSON.stringify(value, null, 2) : '');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    if (structured) setJsonText(JSON.stringify(value, null, 2));
    // Keep a structured editor in sync when switching records.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [structured, JSON.stringify(value)]);

  if (field === 'id') return <label className="block text-xs font-bold capitalize text-slate-500">{label}<input value={String(value ?? '')} readOnly className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-mono text-slate-500" /></label>;

  if (typeof value === 'boolean') return <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 text-xs font-bold capitalize text-slate-700"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-amber-500" />{label}</label>;

  if (structured) return <label className="block text-xs font-bold capitalize text-slate-500 sm:col-span-2">{label}
    <textarea rows={Math.min(12, Math.max(4, jsonText.split('\n').length))} value={jsonText} onChange={(event) => { setJsonText(event.target.value); try { onChange(JSON.parse(event.target.value)); setJsonError(''); } catch { setJsonError('Enter valid JSON to save this field.'); } }} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-mono text-xs text-slate-800 outline-none focus:border-amber-500" />
    {jsonError && <span className="mt-1 block font-semibold text-rose-700">{jsonError}</span>}
  </label>;

  if (textArray) return <label className="block text-xs font-bold capitalize text-slate-500 sm:col-span-2">{label}<textarea rows={4} value={(value as string[]).join('\n')} onChange={(event) => onChange(event.target.value.split('\n'))} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-amber-500" /><span className="mt-1 block text-[10px] font-medium normal-case text-slate-400">One entry per line.</span></label>;

  return <label className="block text-xs font-bold capitalize text-slate-500">{label}<input type={typeof value === 'number' ? 'number' : 'text'} value={String(value ?? '')} onChange={(event) => onChange(typeof value === 'number' ? Number(event.target.value) || 0 : event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-amber-500" /></label>;
}

function SaveBar({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  return <div className="sticky bottom-2 z-10 flex justify-end rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur"><button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-60">{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? 'Saving…' : 'Save changes'}</button></div>;
}
