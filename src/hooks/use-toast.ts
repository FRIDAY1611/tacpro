"use client"

import { useState, useCallback } from "react"
import { nanoid } from "nanoid"

interface Toast {
  id: string
  message: string
  type?: "success" | "error" | "info"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type?: "success" | "error" | "info") => {
    const id = nanoid()
    setToasts((prev) => [...prev, { id, message, type }])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, type?: "success" | "error" | "info") => {
      return addToast(message, type)
    },
    [addToast]
  )

  return { toasts, addToast, removeToast, toast }
}
