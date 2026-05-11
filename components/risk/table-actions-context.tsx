"use client"

import { createContext, useContext, useCallback, useRef } from "react"

type TableActionsContextType = {
  registerAddHandler: (handler: (() => void) | null) => void
  registerImportRef: (ref: HTMLButtonElement | null) => void
  triggerAdd: () => void
  triggerImport: () => void
}

const TableActionsContext = createContext<TableActionsContextType | null>(null)

export function TableActionsProvider({ children }: { children: React.ReactNode }) {
  const addHandlerRef = useRef<(() => void) | null>(null)
  const importBtnRef = useRef<HTMLButtonElement | null>(null)

  const registerAddHandler = useCallback((handler: (() => void) | null) => {
    addHandlerRef.current = handler
  }, [])

  const registerImportRef = useCallback((ref: HTMLButtonElement | null) => {
    importBtnRef.current = ref
  }, [])

  const triggerAdd = useCallback(() => {
    addHandlerRef.current?.()
  }, [])

  const triggerImport = useCallback(() => {
    importBtnRef.current?.click()
  }, [])

  return (
    <TableActionsContext.Provider value={{ registerAddHandler, registerImportRef, triggerAdd, triggerImport }}>
      {children}
    </TableActionsContext.Provider>
  )
}

export function useTableActions() {
  return useContext(TableActionsContext)
}
