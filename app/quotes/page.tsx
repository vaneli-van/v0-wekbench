import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { quotesList } from "@/lib/data"
import { Plus, FileText } from "lucide-react"

export default function QuotesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <PageHeader
        title="Quotes"
        description="Versioned quotes generated from priced RFQs. Track approvals, buyer responses, and conversions to orders."
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            New quote
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Valid until</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotesList.map((q) => (
                <TableRow key={q.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <FileText className="size-4" />
                      </span>
                      <div>
                        <p className="font-medium">{q.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {q.version} · {q.date}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{q.buyer}</TableCell>
                  <TableCell className="text-muted-foreground">{q.subject}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{q.value}</TableCell>
                  <TableCell className="text-muted-foreground">{q.validUntil}</TableCell>
                  <TableCell>
                    <StatusBadge status={q.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
