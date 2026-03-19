import { useState, useCallback } from 'react'
import type { PageId } from '@/types'

export function useActivePage(initialPage: PageId = 'dashboard') {
  const [activePage, setActivePage] = useState<PageId>(initialPage)

  const navigate = useCallback((page: PageId) => {
    setActivePage(page)
  }, [])

  return { activePage, navigate } as const
}
