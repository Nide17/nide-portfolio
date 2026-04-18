import { dashboardTabs } from '../constants'
import type { TabKey } from '../types'

interface DashboardToolbarProps {
    activeTab: TabKey
    query: string
    isRefreshing: boolean
    onTabChange: (tab: TabKey) => void
    onQueryChange: (value: string) => void
    onRefresh: () => void
}

export function DashboardToolbar({
    activeTab,
    query,
    isRefreshing,
    onTabChange,
    onQueryChange,
    onRefresh,
}: DashboardToolbarProps) {
    return (
        <div className="border-b border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    {dashboardTabs.map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => onTabChange(key)}
                            className={
                                activeTab === key
                                    ? 'rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white'
                                    : 'rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
                            }
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder="Search current tab"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
                    />
                    <button
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className="rounded-xl border border-slate-300 px-4 py-2.5 text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>
        </div>
    )
}
