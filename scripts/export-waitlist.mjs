// Exports the waitlist collection to CSV or JSON.
//
//   npm run export:waitlist                            -> exports/waitlistv2-<timestamp>.csv
//   npm run export:waitlist -- --json                  -> same data as JSON
//   npm run export:waitlist -- --stdout                -> print instead of writing a file
//   npm run export:waitlist -- --collection waitlist   -> the legacy phone-keyed collection
//
// Runs through the Admin SDK, which bypasses security rules — that is why the
// site's own rules can keep reads closed to the public. Requires a service
// account key; see the error message in main() for how to get one.
//
// Reads only. Nothing here writes, updates or deletes a document.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** Where the site writes today. `waitlist` is the legacy phone-keyed one. */
const DEFAULT_COLLECTION = "waitlistv2";

/** Only these may be exported — a typo must not silently produce an empty file. */
const COLLECTIONS = [DEFAULT_COLLECTION, "waitlist"];

/**
 * Flattens a Firestore document into one spreadsheet row.
 *
 * Both collections go through here, so no column assumes which one it came
 * from: the ID is a phone number in `waitlist` and an email in `waitlistv2`,
 * and a field absent from one collection exports as blank rather than missing.
 */
export function toRow(id, d) {
  return {
    id,
    fullName: d.fullName ?? "",
    city: d.city ?? "",
    email: d.email ?? "",
    phone: d.phone ?? "",
    role: d.role ?? "",
    // Firestore Timestamp -> ISO 8601, which both Excel and Sheets parse.
    createdAt: d.createdAt?.toDate?.().toISOString() ?? "",
    source: d.source ?? "",
    os: d.device?.os ?? "",
    browser: d.device?.browser ?? "",
    deviceType: d.device?.type ?? "",
    userAgent: d.device?.userAgent ?? "",
  };
}

export function toCsv(items) {
  const headers = Object.keys(items[0]);
  const lines = [headers.map(csvCell).join(",")];
  for (const item of items) lines.push(headers.map((h) => csvCell(item[h])).join(","));
  // Excel assumes the system encoding without a BOM and mangles the accented
  // and Devanagari characters that show up in Indian names and cities.
  return "﻿" + lines.join("\r\n") + "\r\n";
}

export function csvCell(value) {
  const text = String(value ?? "");
  // A leading =, +, - or @ makes Excel and Sheets treat the cell as a formula,
  // so a name like "=cmd|..." would execute on open. Prefixing a tab defuses it
  // without changing what the reader sees.
  const safe = /^[=+\-@]/.test(text) ? `\t${text}` : text;
  return /[",\r\n\t]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

async function main() {
  const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT ?? "service-account.json";
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const toStdout = args.includes("--stdout");

  const flagIndex = args.indexOf("--collection");
  const collection = flagIndex === -1 ? DEFAULT_COLLECTION : args[flagIndex + 1];
  if (!COLLECTIONS.includes(collection)) {
    console.error(`Unknown collection "${collection ?? ""}". Use one of: ${COLLECTIONS.join(", ")}`);
    process.exit(1);
  }

  if (!existsSync(resolve(keyPath))) {
    console.error(
      `Service account key not found at: ${keyPath}\n\n` +
        `Get one from the Firebase console:\n` +
        `  Project settings -> Service accounts -> Generate new private key\n\n` +
        `Save it as service-account.json in the project root (already gitignored),\n` +
        `or point FIREBASE_SERVICE_ACCOUNT at it.\n\n` +
        `This file IS a real secret — unlike the NEXT_PUBLIC_* config, it grants\n` +
        `full read/write access to your database. Never commit it.`,
    );
    process.exit(1);
  }

  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  initializeApp({ credential: cert(JSON.parse(readFileSync(resolve(keyPath), "utf8"))) });

  // Streamed rather than get()'d so memory stays flat however long the list grows.
  const rows = [];
  for await (const doc of getFirestore().collection(collection).orderBy("createdAt").stream()) {
    rows.push(toRow(doc.id, doc.data()));
  }

  if (!rows.length) {
    console.error(`No documents in "${collection}" — nothing to export.`);
    process.exit(0);
  }

  const output = asJson ? JSON.stringify(rows, null, 2) : toCsv(rows);

  if (toStdout) {
    console.log(output);
    process.exit(0);
  }

  // Timestamped filenames so repeated exports never silently overwrite an earlier one.
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  mkdirSync(resolve("exports"), { recursive: true });
  const file = resolve("exports", `${collection}-${stamp}.${asJson ? "json" : "csv"}`);
  writeFileSync(file, output, "utf8");
  console.log(`Exported ${rows.length} signup(s) from ${collection} -> ${file}`);
  process.exit(0);
}

// Only run when invoked directly, so the formatting helpers stay importable.
if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
