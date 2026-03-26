import { NextRequest, NextResponse } from "next/server";
import { appendFeedback } from "@/lib/googleSheets";
import { sendFeedbackNotification } from "@/lib/email";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

function validateInput(body: Record<string, unknown>) {
  const errors: string[] = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2)
    errors.push("Name is required (min 2 characters)");

  if (!body.designation || typeof body.designation !== "string")
    errors.push("Designation is required");

  if (!body.company || typeof body.company !== "string")
    errors.push("Current company is required");

  if (!body.message || typeof body.message !== "string" || body.message.trim().length < 10)
    errors.push("Feedback message is required (min 10 characters)");

  const rating = Number(body.rating);
  if (!rating || rating < 1 || rating > 5)
    errors.push("Rating must be between 1 and 5");

  if (body.image && typeof body.image === "string") {
    const sizeEstimate = (body.image.length * 3) / 4;
    if (sizeEstimate > MAX_IMAGE_SIZE)
      errors.push("Image must be under 5MB");

    if (
      !body.image.startsWith("data:image/jpeg") &&
      !body.image.startsWith("data:image/png") &&
      !body.image.startsWith("data:image/webp")
    )
      errors.push("Image must be JPEG, PNG, or WebP");
  }

  return errors;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate
    const errors = validateInput(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    // Upload image if provided
    let imageUrl = "";
    if (body.image && typeof body.image === "string" && body.image.startsWith("data:image/")) {
      try {
        imageUrl = await uploadToCloudinary(body.image);
      } catch {
        // Non-blocking: continue without image
        console.error("Image upload failed, continuing without image");
      }
    }

    // Store in Google Sheet
    const timestamp = new Date().toISOString();
    try {
      await appendFeedback({
        name: body.name.trim(),
        designation: body.designation.trim(),
        company: body.company.trim(),
        exCompany: body.exCompany?.trim() ?? "",
        rating: Number(body.rating),
        imageUrl,
        message: body.message.trim(),
        status: "pending",
        timestamp,
      });
    } catch (sheetErr) {
      console.error("Google Sheets error:", sheetErr);
      return NextResponse.json(
        { error: "Failed to save feedback. Please try again." },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking)
    sendFeedbackNotification({
      name: body.name.trim(),
      designation: body.designation.trim(),
      company: body.company.trim(),
      rating: Number(body.rating),
      message: body.message.trim(),
    }).catch((err) => console.error("Email notification failed:", err));

    return NextResponse.json({ success: true, message: "Feedback submitted successfully!" });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
