import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'Dalone | Bocados Artesanales',
  description: 'Tienda virtual',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
