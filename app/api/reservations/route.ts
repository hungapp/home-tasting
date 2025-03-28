import { NextResponse } from "next/server"
import { getTimeSlots, createReservation } from "../data"

export async function GET() {
  try {
    // Return the current state of time slots
    const timeSlots = await getTimeSlots();
    return NextResponse.json(timeSlots);
  } catch (error) {
    console.error("Failed to fetch time slots:", error);
    return NextResponse.json({ error: "Failed to fetch time slots" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, timeSlotId, guestCount, dietaryPreference, notes, waiverAgreed, paymentConfirmed, paymentAmount } = data;

    // Validate the request
    if (!name || !email || !timeSlotId || !guestCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get all time slots
    const timeSlots = await getTimeSlots();
    
    // Find the time slot
    const timeSlot = timeSlots.find((slot) => slot.id === timeSlotId);
    
    if (!timeSlot) {
      return NextResponse.json({ error: "Time slot not found" }, { status: 404 });
    }

    // Check if there's enough capacity
    if (guestCount > timeSlot.available) {
      return NextResponse.json(
        {
          error: "Not enough capacity for this reservation",
          remainingCapacity: timeSlot.available,
        },
        { status: 400 },
      );
    }

    // Create a reservation
    const reservation = await createReservation({
      name,
      email,
      phone,
      timeSlotId,
      guestCount,
      dietaryPreference,
      notes,
      waiverAgreed,
      paymentConfirmed,
      paymentAmount,
      waiverDate: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        timeSlot: timeSlot.time,
        guestCount,
      },
    });
  } catch (error) {
    console.error("Failed to create reservation:", error);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
