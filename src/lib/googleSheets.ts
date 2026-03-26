import { google } from "googleapis";

function parsePrivateKey(key: string | undefined): string {
  if (!key) return "";
  // Handle both literal \n (from .env files) and already-decoded newlines
  let parsed = key;
  // Remove surrounding quotes if present
  if (parsed.startsWith('"') && parsed.endsWith('"')) {
    parsed = parsed.slice(1, -1);
  }
  // Replace literal \n with real newlines
  parsed = parsed.replaceAll(String.raw`\n`, "\n");
  return parsed;
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: parsePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = "Sheet1";

export type FeedbackRow = {
  name: string;
  designation: string;
  company: string;
  exCompany: string;
  rating: number;
  imageUrl: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
};

export async function appendFeedback(row: FeedbackRow) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:I`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          row.name,
          row.designation,
          row.company,
          row.exCompany,
          row.rating,
          row.imageUrl,
          row.message,
          row.status,
          row.timestamp,
        ],
      ],
    },
  });
}

export async function getApprovedFeedbacks(): Promise<FeedbackRow[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:I`,
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return [];

  // Skip header row
  return rows
    .slice(1)
    .filter((row) => row[7]?.toLowerCase() === "approved")
    .map((row) => ({
      name: row[0] ?? "",
      designation: row[1] ?? "",
      company: row[2] ?? "",
      exCompany: row[3] ?? "",
      rating: parseInt(row[4] ?? "5", 10),
      imageUrl: row[5] ?? "",
      message: row[6] ?? "",
      status: "approved" as const,
      timestamp: row[8] ?? "",
    }));
}
