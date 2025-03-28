"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  
  // Get reservation details from URL parameters
  const name = searchParams.get("name") || ""
  const email = searchParams.get("email") || ""
  const time = searchParams.get("time") || ""
  const date = searchParams.get("date") || "Saturday, April 12, 2025"
  const guests = searchParams.get("guests") || "1"
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold tracking-tight mb-4">Reservation Confirmed!</h1>
      <p className="text-gray-300 mb-6">
        Thank you for your reservation. We look forward to hosting you!
      </p>
      
      <div className="bg-gray-800 rounded-md p-6 max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4 text-left">Reservation Details</h2>
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">Name:</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date:</span>
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time:</span>
            <span className="font-medium">{time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Guests:</span>
            <span className="font-medium">{guests} {parseInt(guests) === 1 ? "person" : "people"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="font-medium">{email}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-6">
        A confirmation email has been sent to {email} with these details.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-[#5D0C1D] px-6 py-3 text-sm font-medium text-white hover:bg-[#5D0C1D]/90"
      >
        Return to Home
      </Link>
    </div>
  )
}

// Loading fallback for the Suspense boundary
function ConfirmationLoading() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Loading...</h1>
      <div className="bg-gray-800 rounded-md p-6 max-w-md mx-auto mb-8">
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b bg-[#5D0C1D] text-white">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hanoi-phoria-logo-full.png"
            alt="Hanoi Phoria Logo"
            width={200}
            height={60}
            className="h-14 w-auto"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Menu
          </Link>
          <Link href="/register" className="text-sm font-medium hover:underline underline-offset-4">
            Register
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
            Admin
          </Link>
        </nav>
      </header>
      <main className="flex-1 bg-black text-white">
        <div className="container max-w-4xl py-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium mb-6 hover:underline text-[#5D0C1D]">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          
          <Suspense fallback={<ConfirmationLoading />}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-[#5D0C1D] text-white">
        <p className="text-xs text-gray-200">© 2025 Hanoi Phoria. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-200">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-200">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
