// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

export function Providers({children}) {
  return (
    <NextUIProvider>
      <SessionProvider>
      <main className="light text-foreground bg-background">
        {children}
      </main>
      </SessionProvider>
    </NextUIProvider>
  )
}