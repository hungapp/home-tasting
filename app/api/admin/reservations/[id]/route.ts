import { NextResponse } from "next/server"
import { deleteReservation } from "../../../data"

// Simple admin authentication middleware
const checkAdminAuth = (request: Request) => {
  // This is a very basic check - in production use a real auth system
  return true
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Check admin authentication
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = params.id

  try {
    // Delete the reservation
    await deleteReservation(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete reservation:", error);
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 });
  }
}
