import type { Download } from '../types'
import { EmptyState, ListSkeleton } from './DashboardPrimitives'

interface DownloadsTabProps {
    currentLoading: boolean
    deletingKey: string | null
    downloads: Download[]
    onDeleteDownload: (downloadId: number) => void
}

export function DownloadsTab({ currentLoading, deletingKey, downloads, onDeleteDownload }: DownloadsTabProps) {
    if (currentLoading) {
        return <ListSkeleton />
    }

    if (downloads.length === 0) {
        return <EmptyState text="No downloads found." />
    }

    return (
        <div className="space-y-4">
            {downloads.map((download) => (
                <div key={download.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="font-medium text-slate-900 wrap-break-word">{download.document_name}</p>
                            <p className="mt-1 break-all text-sm text-slate-600">
                                {download.ip_address}
                                {download.country ? ` • ${download.country}` : ''}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                                {[download.device, download.operating_system, download.browser].filter(Boolean).join(' • ') || 'Unknown device'}
                            </p>
                            {download.referrer && <p className="mt-2 break-all text-xs text-slate-500">Referrer: {download.referrer}</p>}
                            <p className="mt-2 text-xs text-slate-500">{new Date(download.created_at).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => onDeleteDownload(download.id)}
                            disabled={deletingKey === `download-${download.id}`}
                            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                        >
                            {deletingKey === `download-${download.id}` ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
