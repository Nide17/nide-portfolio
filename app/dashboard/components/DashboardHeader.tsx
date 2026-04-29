import { StatCard } from './DashboardPrimitives'

interface DashboardHeaderProps {
    userName?: string
    projectCount: number
    messageCount: number
    visitCount: number
    downloadCount: number
    onLogout: () => void
}

export function DashboardHeader({
    userName,
    projectCount,
    messageCount,
    visitCount,
    downloadCount,
    onLogout,
}: DashboardHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                {userName ? (
                    <>
                        <p className="mt-2 text-2xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                            Welcome back, {userName}!
                        </p>
                        <p className="text-slate-600">Manage content & activities.</p>
                    </>
                ) : (
                    <>
                        <p className="mt-2 text-slate-600">Welcome!.</p>
                        <p className="mt-1 text-sm text-slate-500">Manage content & activities.</p>
                    </>
                )}
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard label="Projects" value={projectCount} />
                    <StatCard label="Messages" value={messageCount} />
                    <StatCard label="Visits" value={visitCount} />
                    <StatCard label="Downloads" value={downloadCount} />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onLogout}
                        className="rounded-xl border border-slate-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
