// Date utility functions

export function formatDate(date: Date | string, format = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date

  if (isNaN(d.getTime())) {
    return "Invalid date"
  }

  switch (format) {
    case "short":
      return d.toLocaleDateString()
    case "long":
      return d.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    case "time":
      return d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    case "datetime":
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    case "iso":
      return d.toISOString()
    default:
      return d.toLocaleDateString()
  }
}

export function getDaysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate
  const end = typeof endDate === "string" ? new Date(endDate) : endDate

  // Set to noon to avoid DST issues
  start.setHours(12, 0, 0, 0)
  end.setHours(12, 0, 0, 0)

  // Calculate difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export function addDays(date: Date | string, days: number): Date {
  const result = typeof date === "string" ? new Date(date) : new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1
  const d2 = typeof date2 === "string" ? new Date(date2) : date2

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export function getDateRange(startDate: Date | string, endDate: Date | string): Date[] {
  const start = typeof startDate === "string" ? new Date(startDate) : new Date(startDate)
  const end = typeof endDate === "string" ? new Date(endDate) : new Date(endDate)

  // Set to midnight to ensure full days
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const dates: Date[] = []
  const currentDate = new Date(start)

  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

