import type { Message } from '../types'
import { EmptyState, ListSkeleton } from './DashboardPrimitives'

interface MessagesTabProps {
    currentLoading: boolean
    deletingKey: string | null
    messages: Message[]
    onDeleteMessage: (messageId: number) => void
}

export function MessagesTab({ currentLoading, deletingKey, messages, onDeleteMessage }: MessagesTabProps) {
    if (currentLoading) {
        return <ListSkeleton />
    }

    if (messages.length === 0) {
        return <EmptyState text="No messages found." />
    }

    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h3 className="font-semibold text-slate-900 wrap-break-word">{message.sender_name}</h3>
                            <p className="break-all text-sm text-slate-600">{message.sender_email}</p>
                            <p className="mt-2 text-sm font-medium text-slate-800 wrap-break-word">{message.subject}</p>
                            <p className="mt-2 text-sm text-slate-600 wrap-break-word">{message.body}</p>
                            <p className="mt-3 text-xs text-slate-500">{new Date(message.created_at).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => onDeleteMessage(message.id)}
                            disabled={deletingKey === `message-${message.id}`}
                            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                        >
                            {deletingKey === `message-${message.id}` ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
