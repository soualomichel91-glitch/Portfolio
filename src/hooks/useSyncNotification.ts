'use client'

import { useState, useCallback } from 'react'

export interface SyncNotification {
  id: string
  message: string
  type: 'success' | 'info' | 'warning'
}

export function useSyncNotification() {
  const [notifications, setNotifications] = useState<SyncNotification[]>([])

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString()
    const notification: SyncNotification = { id, message, type }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto-suppression après 3 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }, [])

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return {
    notifications,
    showNotification,
    hideNotification
  }
}
