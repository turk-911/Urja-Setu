import "./globals.css"
// import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils"
// import Header from "@/components/header"
import { BrowserRouter as Router } from 'react-router-dom'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Router>
          {/* <Header /> */}
          <main className="flex-1">{children}</main>
        </Router>
      </body>
    </html>
  )
}

