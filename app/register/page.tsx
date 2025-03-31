"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

// Types for time slot data
type TimeSlot = {
  id: string
  time: string
  capacity: number
  registered: number
  available: number
}

export default function RegisterPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [guests, setGuests] = useState<string>("1")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    waiverAgreed: false,
    paymentConfirmed: false,
  })

  // Fetch time slots from the API
  useEffect(() => {
    async function fetchTimeSlots() {
      try {
        setLoading(true)
        const response = await fetch("/api/reservations")

        if (!response.ok) {
          throw new Error(`Failed to fetch time slots: ${response.status}`)
        }

        const data = await response.json()
        setTimeSlots(data)
      } catch (err: any) {
        setError(err.message || "Failed to load time slots. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeSlots()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const selectedSlot = timeSlots.find((slot) => slot.id === selectedTimeSlot)
      if (!selectedSlot) {
        throw new Error("Please select a valid time slot")
      }

      // API call
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timeSlotId: selectedTimeSlot,
          guestCount: Number.parseInt(guests),
          waiverDate: new Date().toISOString(),
          paymentAmount: Number.parseInt(guests) * 10,
          paymentConfirmed: formData.paymentConfirmed,
        }),
      })

      // Handle API response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const responseData = await response.json()

      // Send confirmation email
      try {
        await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.email,
            subject: "Hanoi Phoria Tasting Reservation Confirmation",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .header { background-color: #5D0C1D; color: white; padding: 20px; text-align: center; }
                  .content { padding: 20px; }
                  .reservation-details { background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0; }
                  .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>Hanoi Phoria</h1>
                  <p>Home Tasting Experience</p>
                </div>
                
                <div class="content">
                  <h2>Reservation Confirmation</h2>
                  <p>Dear ${formData.name},</p>
                  <p>Thank you for reserving a spot at our home tasting experience. We're excited to have you join us!</p>
                  
                  <div class="reservation-details">
                    <h3>Your Reservation Details:</h3>
                    <p><strong>Date:</strong> Saturday, April 12, 2025</p>
                    <p><strong>Time:</strong> ${selectedSlot.time}</p>
                    <p><strong>Number of Guests:</strong> ${guests} ${Number.parseInt(guests) === 1 ? 'person' : 'people'}</p>
                    <p><strong>Location:</strong> 123 Main Street, Boston, MA 02115</p>
                  </div>
                  
                  <p>If you need to cancel or modify your reservation, please contact us at least 24 hours in advance.</p>
                  
                  <p>We look forward to hosting you!</p>
                  
                  <p>Best regards,<br>The Hanoi Phoria Team</p>
                </div>
                
                <div class="footer">
                  <p>© 2025 Hanoi Phoria. All rights reserved.</p>
                </div>
              </body>
              </html>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue with the flow even if email fails
      }

      // Show success message
      toast({
        title: "Reservation confirmed!",
        description: `Your tasting is scheduled for Saturday, April 12, 2025 at ${selectedSlot.time} for ${guests} guest(s)`,
      })

      // Redirect to confirmation page
      window.location.href = `/register/confirmation?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&time=${encodeURIComponent(selectedSlot.time)}&guests=${encodeURIComponent(guests)}`;

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Find the selected time slot
  const selectedSlot = timeSlots.find((slot) => slot.id === selectedTimeSlot)
  const remainingCapacity = selectedSlot ? selectedSlot.available : 0

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
        </nav>
      </header>
      <main className="flex-1 bg-black text-white">
        <div className="container max-w-4xl py-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium mb-6 hover:underline text-[#5D0C1D]">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Menu
          </Link>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reserve Your Tasting Experience</h1>
              <p className="text-gray-300 mt-2">Select a time slot that works for you and your friends.</p>
            </div>

            {error && (
              <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="bg-gray-900 border-gray-700"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="bg-gray-900 border-gray-700"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    required
                    className="bg-gray-900 border-gray-700"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Tasting Details</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white">Date</Label>
                    <div className="p-3 bg-gray-900 border border-gray-700 rounded-md text-white">
                      Saturday, April 12, 2025
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Preferred Time</Label>
                    <Select onValueChange={setSelectedTimeSlot} value={selectedTimeSlot}>
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 text-white border-gray-700">
                        {timeSlots.map((slot) => (
                          <SelectItem
                            key={slot.id}
                            value={slot.id}
                            disabled={slot.available <= 0}
                            className={cn(slot.available <= 0 && "text-gray-500 line-through")}
                          >
                            {slot.time} {slot.available <= 0 ? "(Fully Booked)" : `(${slot.available} spots left)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Number of Guests</Label>
                    <Select
                      value={guests}
                      onValueChange={setGuests}
                      disabled={!selectedTimeSlot || remainingCapacity === 0}
                    >
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 text-white border-gray-700">
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem
                            key={num}
                            value={num.toString()}
                            disabled={num > remainingCapacity}
                            className={cn(num > remainingCapacity && "text-gray-500")}
                          >
                            {num} {num === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTimeSlot && remainingCapacity > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum 4 guests per reservation. This time slot can accommodate up to {remainingCapacity} more
                        guests.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any allergies, special requests, or other information we should know?"
                  className="min-h-[100px] bg-gray-900 border-gray-700"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-4 border border-gray-800 rounded-md p-6 bg-gray-900/50">
                <h2 className="text-xl font-semibold">Menu Tasting Waiver</h2>
                <p className="text-sm text-gray-300">Date: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-sm prose-invert">
                  <p>
                    I, <span className="font-semibold">{formData.name || "[Participant Name]"}</span>, understand that
                    this menu tasting event hosted by Hanoi Phoria is not a commercial food sale but a private gathering
                    to sample Pho Hanoi for feedback purposes. I acknowledge that Hanoi Phoria is not a licensed food
                    vendor and that food is prepared in a home kitchen. In consideration of participating, I voluntarily
                    assume all risks related to food consumption (e.g., allergies, illness). I agree to contribute $10 per person
                    to help cover ingredient costs, understanding this is not a purchase of food.

                    Additionally, I agree to provide honest and candid feedback about the food tasting experience by completing 
                    a feedback form at the end of the meal.
                  </p>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="waiver"
                    checked={formData.waiverAgreed}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, waiverAgreed: checked === true }))}
                  />
                  <label
                    htmlFor="waiver"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms of the waiver.
                  </label>
                </div>
                
                {formData.waiverAgreed && (
                  <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <h3 className="text-sm font-semibold mb-2">Payment Instructions</h3>
                      <p className="text-xs text-gray-300">
                        Please send your payment of ${Number(guests) * 10} using one of the following methods:
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center">
                          <span className="text-xs font-medium w-16">Venmo:</span>
                          <span className="text-xs">@duongtrang510</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium w-16">Zelle:</span>
                          <span className="text-xs">8574379884</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="payment"
                        checked={formData.paymentConfirmed}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, paymentConfirmed: checked === true }))}
                      />
                      <label
                        htmlFor="payment"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Check if you have made a payment in the amount of ${Number(guests) * 10}
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-[#5D0C1D] hover:bg-[#5D0C1D]/90"
                disabled={!selectedTimeSlot || remainingCapacity === 0 || loading || !formData.waiverAgreed || !formData.paymentConfirmed}
              >
                {loading ? "Submitting..." : "Confirm Reservation"}
              </Button>
            </form>
          </div>
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

