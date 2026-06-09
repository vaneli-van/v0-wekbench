"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Check,
  ArrowLeft,
  ArrowRight,
  FileText,
  UploadCloud,
  Mail,
  Info,
  Plus,
  Trash2,
  ImageIcon,
  PartyPopper,
  PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, title: "Company basics", time: "3 min" },
  { id: 2, title: "Demo RFQ walkthrough", time: "4 min" },
  { id: 3, title: "Upload your first RFQ", time: "5 min" },
  { id: 4, title: "Margin & FX defaults", time: "4 min" },
  { id: 5, title: "Brand your quotes", time: "4 min" },
  { id: 6, title: "Invite teammates", time: "3 min" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)

  const next = () => {
    if (step >= STEPS.length) {
      setDone(true)
    } else {
      setStep((s) => s + 1)
    }
  }
  const back = () => setStep((s) => Math.max(1, s - 1))

  if (done) {
    return <Confirmation onDashboard={() => router.push("/")} />
  }

  const current = STEPS.find((s) => s.id === step)!

  return (
    <TooltipProvider delayDuration={150}>
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        {/* Top bar: brand + progress + skip */}
        <header className="flex shrink-0 items-center gap-6 border-b border-border px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
              ToolBox
            </span>
          </div>

          {/* Step indicator */}
          <ol className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2">
            {STEPS.map((s) => {
              const status = s.id < step ? "done" : s.id === step ? "current" : "upcoming"
              return (
                <li key={s.id} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                        status === "done" && "bg-primary text-primary-foreground",
                        status === "current" && "bg-primary/10 text-primary ring-2 ring-primary/30",
                        status === "upcoming" && "bg-secondary text-muted-foreground",
                      )}
                    >
                      {status === "done" ? <Check className="size-3.5" /> : s.id}
                    </span>
                    <span
                      className={cn(
                        "hidden text-xs font-medium lg:inline",
                        status === "current" ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                  {s.id < STEPS.length && (
                    <span
                      className={cn(
                        "h-px w-4 sm:w-8",
                        s.id < step ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </li>
              )
            })}
          </ol>

          <button
            onClick={() => router.push("/")}
            className="shrink-0 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip for now
          </button>
        </header>

        {/* Body */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-y-auto px-6 py-6">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Step {step} of {STEPS.length} · {current.time}
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                {current.title}
              </h1>
            </div>
            <div className="flex-1">
              {step === 1 && <StepCompany />}
              {step === 2 && <StepDemo />}
              {step === 3 && <StepUpload onUseDemo={() => setStep(2)} />}
              {step === 4 && <StepDefaults />}
              {step === 5 && <StepBrand />}
              {step === 6 && <StepInvite />}
            </div>
          </div>
        </main>

        {/* Bottom bar */}
        <footer className="flex shrink-0 items-center justify-between border-t border-border bg-card px-6 py-3.5">
          <Button
            variant="ghost"
            onClick={back}
            disabled={step === 1}
            className="gap-1.5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            {step === 6 && (
              <span className="text-xs text-muted-foreground">This step is optional</span>
            )}
            <Button onClick={next} className="gap-1.5">
              {step === STEPS.length ? "Finish setup" : "Continue"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

/* ---------- Step 1: Company basics ---------- */
function StepCompany() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name" className="sm:col-span-2">
          <Input placeholder="e.g. Western Premium Ltd" defaultValue="" />
        </Field>
        <Field label="Country">
          <Select defaultValue="GH">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GH">Ghana</SelectItem>
              <SelectItem value="NG">Nigeria</SelectItem>
              <SelectItem value="CI">Côte d&apos;Ivoire</SelectItem>
              <SelectItem value="SN">Senegal</SelectItem>
              <SelectItem value="KE">Kenya</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Business type">
          <Select defaultValue="vendor">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="si">System Integrator</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
              <SelectItem value="multiple">Multiple</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Team size">
          <Select defaultValue="6-20">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1–5 people</SelectItem>
              <SelectItem value="6-20">6–20 people</SelectItem>
              <SelectItem value="21-50">21–50 people</SelectItem>
              <SelectItem value="50+">50+ people</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <aside className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/40 p-4">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </div>
        <p className="text-sm font-medium text-foreground">Sample data included</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We&apos;ll set up your workspace with sample data so you can explore the full
          RFQ-to-quote workflow before connecting your own.
        </p>
      </aside>
    </div>
  )
}

/* ---------- Step 2 & 3: extraction preview ---------- */
const SAMPLE_ITEMS = [
  {
    description: "Business Laptop",
    brand: "Dell",
    spec: 'Core i7, 16GB RAM, 512GB SSD, 14" FHD',
    qty: 25,
    confidence: 98,
  },
  {
    description: "Managed Network Switch",
    brand: "Cisco",
    spec: "48-Port Gigabit PoE+, Layer 3",
    qty: 12,
    confidence: 94,
  },
  {
    description: "Online UPS",
    brand: "APC",
    spec: "10kVA Rack-mount, Double Conversion",
    qty: 8,
    confidence: 89,
  },
  {
    description: "Wireless Access Point",
    brand: "Ubiquiti",
    spec: "WiFi 6, Ceiling mount, PoE",
    qty: 30,
    confidence: 76,
  },
]

function ExtractionSplit() {
  return (
    <div className="grid h-full gap-4 lg:grid-cols-2">
      {/* PDF preview */}
      <div className="flex flex-col rounded-lg border border-border bg-secondary/30">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <FileText className="size-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Meridian-RFQ-2026-0418.pdf</span>
          <span className="ml-auto text-[11px] text-muted-foreground">248 KB</span>
        </div>
        <div className="flex-1 overflow-hidden p-5">
          <div className="mx-auto flex h-full max-w-sm flex-col gap-3 rounded-md bg-card p-5 shadow-sm">
            <div className="h-2.5 w-32 rounded bg-foreground/20" />
            <div className="h-2 w-48 rounded bg-foreground/10" />
            <div className="mt-2 h-2 w-full rounded bg-foreground/10" />
            <div className="h-2 w-5/6 rounded bg-foreground/10" />
            <div className="mt-3 space-y-2 rounded border border-border p-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-6 rounded bg-foreground/15" />
                  <div className="h-2 flex-1 rounded bg-foreground/10" />
                  <div className="h-2 w-8 rounded bg-foreground/15" />
                </div>
              ))}
            </div>
            <div className="mt-auto h-2 w-40 rounded bg-foreground/10" />
          </div>
        </div>
      </div>

      {/* Extracted items */}
      <div className="flex flex-col rounded-lg border border-border">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Extracted line items</span>
          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            {SAMPLE_ITEMS.length} found
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {SAMPLE_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.description}</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {item.brand}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.spec}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium tabular-nums text-foreground">×{item.qty}</p>
                <span
                  className={cn(
                    "text-[11px] font-medium tabular-nums",
                    item.confidence >= 90
                      ? "text-primary"
                      : item.confidence >= 80
                        ? "text-muted-foreground"
                        : "text-amber-600",
                  )}
                >
                  {item.confidence}% match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepDemo() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          This is what happens when a real RFQ arrives — ToolBox reads the document and extracts
          every line item automatically. <span className="text-foreground">Try uploading one of yours next.</span>
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <ExtractionSplit />
      </div>
    </div>
  )
}

function StepUpload({ onUseDemo }: { onUseDemo: () => void }) {
  const [hasFile, setHasFile] = useState(false)

  return (
    <div className="grid h-full gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setHasFile(true)}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
            hasFile
              ? "border-primary/40 bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-secondary/40",
          )}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            {hasFile ? <Check className="size-6 text-primary" /> : <UploadCloud className="size-6" />}
          </div>
          {hasFile ? (
            <div>
              <p className="text-sm font-medium text-foreground">Meridian-RFQ.pdf uploaded</p>
              <p className="text-xs text-muted-foreground">Extraction complete — see preview</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-foreground">
                Drag &amp; drop your RFQ here
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">PDF or Excel · or click to browse</p>
            </div>
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">or paste email</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Textarea
            placeholder="Paste the RFQ email content here..."
            className="min-h-24 resize-none pl-9"
            onChange={(e) => setHasFile(e.target.value.length > 0)}
          />
        </div>

        <button
          onClick={onUseDemo}
          className="self-start text-xs font-medium text-primary hover:underline"
        >
          Use the demo instead
        </button>
      </div>

      {/* Live extraction */}
      <div className="flex flex-col rounded-lg border border-border">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Live extraction</span>
        </div>
        {hasFile ? (
          <div className="flex-1 overflow-y-auto">
            {SAMPLE_ITEMS.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{item.description}</span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {item.brand}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.spec}</p>
                </div>
                <p className="shrink-0 text-sm font-medium tabular-nums text-foreground">×{item.qty}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <FileText className="size-5" />
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a file or paste an email to see extracted line items appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Step 4: defaults ---------- */
function StepDefaults() {
  const [margin, setMargin] = useState(15)
  const [fx, setFx] = useState(3)

  return (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <SliderField
        label="Default margin"
        hint="Applied to landed cost to produce your sell price. You can override this per quote."
        value={margin}
        suffix="%"
        min={0}
        max={50}
        onChange={setMargin}
      />
      <SliderField
        label="FX buffer above mid-rate"
        hint="A cushion added to the live mid-market rate to protect against currency swings before payment."
        value={fx}
        suffix="%"
        min={0}
        max={10}
        step={0.5}
        onChange={setFx}
      />
      <Field
        label="Default quote validity"
        hint="How long a quote stays valid before prices need refreshing."
      >
        <Select defaultValue="30">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="14">14 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="60">60 days</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field
        label="Default payment terms"
        hint="The payment window shown on quotes and invoices by default."
      >
        <Select defaultValue="net30">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="net14">Net 14</SelectItem>
            <SelectItem value="net30">Net 30</SelectItem>
            <SelectItem value="net60">Net 60</SelectItem>
            <SelectItem value="net90">Net 90</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

/* ---------- Step 5: brand ---------- */
function StepBrand() {
  const [company, setCompany] = useState("Western Premium Ltd")
  const [address, setAddress] = useState("12 Liberation Road, Accra, Ghana")
  const [taxId, setTaxId] = useState("GHA-C00254178")
  const [hasLogo, setHasLogo] = useState(false)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setHasLogo((v) => !v)}
          className="flex items-center gap-3 rounded-lg border border-dashed border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-secondary/40"
        >
          <div className="flex size-12 items-center justify-center rounded-md bg-secondary text-muted-foreground">
            {hasLogo ? (
              <span className="text-sm font-bold text-foreground">WP</span>
            ) : (
              <ImageIcon className="size-5" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {hasLogo ? "Logo uploaded" : "Upload company logo"}
            </p>
            <p className="text-xs text-muted-foreground">PNG or SVG, square works best</p>
          </div>
        </button>

        <Field label="Company name">
          <Input value={company} onChange={(e) => setCompany(e.target.value)} />
        </Field>
        <Field label="Business address">
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="min-h-16 resize-none"
          />
        </Field>
        <Field label="Tax ID">
          <Input value={taxId} onChange={(e) => setTaxId(e.target.value)} />
        </Field>
      </div>

      {/* Live quote preview */}
      <div className="flex flex-col rounded-lg border border-border bg-secondary/30 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Live quote preview
        </p>
        <div className="flex flex-1 flex-col rounded-md bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-sm font-bold text-foreground">
                {hasLogo ? "WP" : <ImageIcon className="size-4 text-muted-foreground" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{company || "Your Company"}</p>
                <p className="max-w-44 text-[11px] leading-tight text-muted-foreground">
                  {address || "Business address"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-foreground">QUOTE</p>
              <p className="text-[11px] text-muted-foreground">Q-2026-0042</p>
            </div>
          </div>
          <div className="space-y-2 py-4">
            {SAMPLE_ITEMS.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{item.description}</span>
                <span className="tabular-nums text-muted-foreground">×{item.qty}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto border-t border-border pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-semibold tabular-nums text-foreground">₵ 486,200</span>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Tax ID: {taxId || "—"} · Valid 30 days · Net 30
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Step 6: invite ---------- */
function StepInvite() {
  const [rows, setRows] = useState([
    { email: "", role: "member" },
    { email: "", role: "member" },
  ])

  const update = (i: number, key: "email" | "role", val: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)))
  const add = () => setRows((r) => [...r, { email: "", role: "member" }])
  const remove = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i))

  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-sm text-muted-foreground">
        Invite the people you work with on quotes. You can always do this later from Settings.
      </p>
      <div className="flex flex-col gap-2.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Input
              type="email"
              placeholder="teammate@company.com"
              value={row.email}
              onChange={(e) => update(i, "email", e.target.value)}
              className="flex-1"
            />
            <Select value={row.role} onValueChange={(v) => update(i, "role", v)}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(i)}
              disabled={rows.length === 1}
              aria-label="Remove teammate"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={add} className="mt-3 gap-1.5">
        <Plus className="size-4" />
        Add another
      </Button>
    </div>
  )
}

/* ---------- Confirmation ---------- */
function Confirmation({ onDashboard }: { onDashboard: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <PartyPopper className="size-7" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground text-balance">
        You&apos;re ready.
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
        Your workspace is set up with sample data and your first RFQ is processed. Jump in and start
        building quotes.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button onClick={onDashboard} size="lg" className="gap-1.5">
          Go to dashboard
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" className="gap-1.5">
          <PlayCircle className="size-4" />
          Watch 3-minute tour
        </Button>
      </div>
    </div>
  )
}

/* ---------- Shared field helpers ---------- */
function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        {hint && <HintTip text={hint} />}
      </div>
      {children}
    </div>
  )
}

function SliderField({
  label,
  hint,
  value,
  suffix,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  hint: string
  value: number
  suffix: string
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label className="text-sm font-medium text-foreground">{label}</Label>
          <HintTip text={hint} />
        </div>
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  )
}

function HintTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" aria-label="What this means" className="text-muted-foreground hover:text-foreground">
          <Info className="size-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-56 text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  )
}
