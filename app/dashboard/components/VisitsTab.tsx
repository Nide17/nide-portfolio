import type { Visit } from '../types'
import { EmptyState, ListSkeleton } from './DashboardPrimitives'

interface VisitsTabProps {
    currentLoading: boolean
    deletingKey: string | null
    visits: Visit[]
    onDeleteVisit: (visitId: number) => void
}

export function VisitsTab({ currentLoading, deletingKey, visits, onDeleteVisit }: VisitsTabProps) {
    if (currentLoading) {
        return <ListSkeleton />
    }

    if (visits.length === 0) {
        return <EmptyState text="No visits found." />
    }

    return (
        <div className="space-y-4">
            {visits.map((visit) => (
                <div key={visit.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="break-all font-medium text-slate-900">
                                {visit.ip_address}
                                {visit.country ? ` • ${visit.country}` : ''}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                                {[visit.device, visit.operating_system, visit.browser].filter(Boolean).join(' • ') || 'Unknown device'}
                            </p>
                            {visit.country && <p className="mt-2 break-all text-xs text-slate-500">Country: {visit.country}</p>}
                            {visit.path && <p className="mt-2 break-all text-xs text-slate-500">Path: {visit.path}</p>}
                            {visit.referrer && <p className="mt-1 break-all text-xs text-slate-500">Referrer: {visit.referrer}</p>}
                            <p className="mt-2 text-xs text-slate-500">{new Date(visit.created_at).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => onDeleteVisit(visit.id)}
                            disabled={deletingKey === `visit-${visit.id}`}
                            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                        >
                            {deletingKey === `visit-${visit.id}` ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
