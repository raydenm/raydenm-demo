import "styles/tailwind.css"
import { CookiesProvider } from 'app/context/cookiesContext'
import { Toaster } from "components/ui/toaster"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <CookiesProvider> */}
          {children}
          <Toaster />
        {/* </CookiesProvider> */}
      </body>
    </html>
  )
}
