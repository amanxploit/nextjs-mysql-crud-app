import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';



export const metadata ={
  title: 'Next.js CRUD with MySQL',
  description: 'A complete CRUD application with Next.js and MySQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}){
  return <>
  
  <html lang='en'>
    <body suppressHydrationWarning>
      <Navbar/>
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        {children}
      </main>
      <Toaster position="top-right"></Toaster>
    </body>
  </html>
  </>
}
