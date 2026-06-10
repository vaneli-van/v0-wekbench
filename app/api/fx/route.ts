import { NextResponse } from "next/server"

// Live Ghana Cedi FX rates via the free open.er-api.com endpoint (no API key required).
// Base currency: GHS. We surface the inverse so it reads "1 USD = X GHS".
export const revalidate = 1800 // cache for 30 minutes

const TARGETS = ["USD", "EUR", "GBP", "CNY", "ZAR", "AED"] as const

const FALLBACK: Record<string, number> = {
  USD: 0.064,
  EUR: 0.059,
  GBP: 0.05,
  CNY: 0.46,
  ZAR: 1.17,
  AED: 0.235,
}

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/GHS", {
      next: { revalidate: 1800 },
    })

    if (!res.ok) throw new Error(`Upstream ${res.status}`)
    const data = await res.json()
    const rates: Record<string, number> = data?.rates ?? {}

    const result = TARGETS.map((code) => {
      const ghsToCode = rates[code] ?? FALLBACK[code]
      // 1 unit of foreign currency in GHS = 1 / (GHS -> code)
      const perUnitInGhs = ghsToCode ? 1 / ghsToCode : 0
      return { code, perGhs: ghsToCode, perUnitInGhs }
    })

    return NextResponse.json({
      base: "GHS",
      updated: data?.time_last_update_utc ?? new Date().toUTCString(),
      live: true,
      rates: result,
    })
  } catch {
    const result = TARGETS.map((code) => ({
      code,
      perGhs: FALLBACK[code],
      perUnitInGhs: FALLBACK[code] ? 1 / FALLBACK[code] : 0,
    }))
    return NextResponse.json({
      base: "GHS",
      updated: new Date().toUTCString(),
      live: false,
      rates: result,
    })
  }
}
