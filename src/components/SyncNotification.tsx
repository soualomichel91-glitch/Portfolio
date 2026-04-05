'use client'

import { Check, RefreshCw, Info, AlertTriangle } from 'lucide-react'
import { SyncNotification as SyncNotificationType } from '@/hooks/useSyncNotification'

interface SyncNotificationProps {
  notification: SyncNotificationType
  onHide: (id: string) => void
}

export default function SyncNotification({ notification, onHide }: SyncNotificationProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <Check size={16} />
      case 'info':
        return <Info size={16} />
      case 'warning':
        return <AlertTriangle size={16} />
      default:
        return <Check size={16} />
    }
  }

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      case 'warning':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-green-500 text-white'
    }
  }

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg animate-slide-in ${getStyles()}`}
      style={{ 
        animation: 'slide-in 0.3s ease-out',
        maxWidth: '300px'
      }}
    >
      <RefreshCw size={16} className="animate-spin" />
      <span className="text-sm font-medium truncate">{notification.message}</span>
      {getIcon()}
      <button
        onClick={() => onHide(notification.id)}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </div>
  )
}

export function SyncNotificationContainer({ 
  notifications, 
  onHide 
}: { 
  notifications: SyncNotificationType[]
  onHide: (id: string) => void 
}) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <SyncNotification
          key={notification.id}
          notification={notification}
          onHide={onHide}
        />
      ))}
    </div>
  )
}
