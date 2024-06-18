'use client'

import { hasCookie, setCookie } from 'cookies-next'
import { Loader2 } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'
import { useState } from 'react'

export const CookiesContext = createContext<any>(null)

export const CookiesProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    if (!hasCookie('token') && pathname !== '/login') {
      router.push('/login')
    }
  }, [pathname])

  return (
    <CookiesContext.Provider value={{}}>
      {children}
    </CookiesContext.Provider>
  )
}