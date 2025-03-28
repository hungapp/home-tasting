"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// Types
type TimeSlot = {
  id: string
  time: string
  capacity: number
  registered: number
  available: number
}

type Reservation = {
  id?: string
  name?: string
  email?: string
  phone?: string
  timeSlotId?: string
  guestCount?: number
  dietaryPreference?: string
  notes?: string
  createdAt?: string
}

export default function AdminPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("reservations")

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch time slots
        const timeSlotsResponse = await fetch("/api/reservations")
        if (!timeSlotsResponse.ok) {
          throw new Error(`Failed to fetch time slots: ${timeSlotsResponse.status}`)
        }

        const timeSlotsData = await timeSlotsResponse.json()
        setTimeSlots(timeSlotsData)

        // Fetch reservations
        const reservationsResponse = await fetch("/api/admin/reservations")
        if (!reservationsResponse.ok) {
          throw new Error(`Failed to fetch reservations: ${reservationsResponse.status}`)
        }

        const reservationsData = await reservationsResponse.json()
        // Filter out any reservations that don't have required fields
        const validReservations = reservationsData.filter(
          (res: Reservation) => res && res.id && res.name && res.email && res.timeSlotId,
        )
        setReservations(validReservations)
      } catch (err: any) {
        setError(err.message || "Failed to load data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter reservations based on search term - with null checks
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      reservation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      reservation.phone?.includes(searchTerm) ||
      false,
  )

  // Get time slot name by ID
  const getTimeSlotName = (id?: string) => {
    if (!id) return "Unknown"
    const slot = timeSlots.find((slot) => slot.id === id)
    return slot ? slot.time : "Unknown"
  }

  // Handle reservation deletion
  const handleDeleteReservation = async (id?: string) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Invalid reservation ID",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to cancel this reservation?")) {
      return
    }

    try {
      // Real API call
      const response = await fetch(`/api/admin/reservations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      // Remove from local state
      setReservations((prev) => prev.filter((res) => res.id !== id))

      // Refresh time slots
      const timeSlotsResponse = await fetch("/api/reservations")
      if (timeSlotsResponse.ok) {
        const timeSlotsData = await timeSlotsResponse.json()
        setTimeSlots(timeSlotsData)
      }

      toast({
        title: "Reservation cancelled",
        description: "The reservation has been successfully cancelled.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to cancel reservation",
        variant: "destructive",
      })
    }
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

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
        <span className="ml-4 text-sm font-medium bg-white/20 px-2 py-1 rounded">Admin</span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Back to Site
          </Link>
        </nav>
      </header>

      <main className="flex-1 bg-black text-white">
        <div className="container py-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-[#5D0C1D] hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Site
            </Link>
            <h1 className="text-2xl font-bold ml-4">Admin Dashboard</h1>
          </div>

          {error && (
            <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive mb-6">
              {error}
            </div>
          )}

          <Tabs defaultValue="reservations" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
              <TabsTrigger value="time-slots">Time Slots</TabsTrigger>
            </TabsList>

            <TabsContent value="reservations" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Reservations</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reservations..."
                    className="pl-8 bg-gray-900 border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading reservations...</div>
              ) : filteredReservations.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  {searchTerm ? "No reservations match your search" : "No reservations found"}
                </div>
              ) : (
                <div className="rounded-md border border-gray-800">
                  <Table>
                    <TableHeader className="bg-gray-900">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Time Slot</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id} className="border-gray-800">
                          <TableCell className="font-medium">{reservation.name || "N/A"}</TableCell>
                          <TableCell>
                            <div>{reservation.email || "N/A"}</div>
                            <div className="text-sm text-gray-400">{reservation.phone || "N/A"}</div>
                          </TableCell>
                          <TableCell>{getTimeSlotName(reservation.timeSlotId)}</TableCell>
                          <TableCell>{reservation.guestCount || "N/A"}</TableCell>
                          <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReservation(reservation.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="time-slots" className="space-y-4">
              <h2 className="text-xl font-semibold">Time Slots</h2>

              {loading ? (
                <div className="text-center py-8">Loading time slots...</div>
              ) : timeSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No time slots found</div>
              ) : (
                <div className="rounded-md border border-gray-800">
                  <Table>
                    <TableHeader className="bg-gray-900">
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((slot) => (
                        <TableRow key={slot.id} className="border-gray-800">
                          <TableCell className="font-medium">{slot.time}</TableCell>
                          <TableCell>{slot.capacity}</TableCell>
                          <TableCell>{slot.registered}</TableCell>
                          <TableCell>{slot.available}</TableCell>
                          <TableCell>
                            {slot.available === 0 ? (
                              <Badge variant="destructive">Fully Booked</Badge>
                            ) : slot.available <= 2 ? (
                              <Badge variant="default" className="bg-yellow-600">
                                Almost Full
                              </Badge>
                            ) : (
                              <Badge variant="default" className="bg-green-600">
                                Available
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-[#5D0C1D] text-white">
        <p className="text-xs text-gray-200">© 2025 Hanoi Phoria. All rights reserved.</p>
        <p className="text-xs text-gray-200 sm:ml-auto">Admin Dashboard</p>
      </footer>
    </div>
  )
}

