import { NextResponse } from "next/server"
import { getReservations } from "../../data"

// Simple admin authentication middleware
// In a real app, you would use a proper auth system
const checkAdminAuth = (request: Request) => {
  // This is a very basic check - in production use a real auth system
  // For demo purposes, we're allowing all access
  return true
}

export async function GET(request: Request) {
  // Check admin authentication
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Return all reservations
    const reservations = await getReservations();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
  }
}
