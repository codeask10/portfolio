import { NextResponse } from "next/server";
import { getApprovedFeedbacks } from "@/lib/googleSheets";

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const feedbacks = await getApprovedFeedbacks();
    return NextResponse.json({ feedbacks });
  } catch (err) {
    console.error("Failed to fetch feedbacks:", err);
    return NextResponse.json({ feedbacks: [] });
  }
}
