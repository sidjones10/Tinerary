// Validation utility functions

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function sanitizeString(input: string): string {
  // Basic sanitization to prevent XSS
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

export function validateItineraryDates(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false
  }

  // End date should be after or equal to start date
  return end >= start
}

