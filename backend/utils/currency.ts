// Currency utility functions

type CurrencyOptions = {
  currency?: string
  locale?: string
  decimals?: number
}

export function formatCurrency(amount: number, options: CurrencyOptions = {}): string {
  const { currency = "USD", locale = "en-US", decimals = 2 } = options

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  // In a real app, you would use an API like Open Exchange Rates or similar
  // For now, we'll use a simple mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock conversion rates (in a real app, these would come from an API)
      const rates: Record<string, Record<string, number>> = {
        USD: { EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.35 },
        EUR: { USD: 1.09, GBP: 0.86, JPY: 162.5, CAD: 1.47 },
        GBP: { USD: 1.27, EUR: 1.16, JPY: 189.2, CAD: 1.71 },
        JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.009 },
        CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.74 },
      }

      // If same currency, no conversion needed
      if (fromCurrency === toCurrency) {
        resolve(amount)
        return
      }

      // If we have a direct conversion rate
      if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
        resolve(amount * rates[fromCurrency][toCurrency])
        return
      }

      // If we need to convert through USD
      if (
        fromCurrency !== "USD" &&
        rates[fromCurrency] &&
        rates[fromCurrency]["USD"] &&
        rates["USD"] &&
        rates["USD"][toCurrency]
      ) {
        const usdAmount = amount * rates[fromCurrency]["USD"]
        resolve(usdAmount * rates["USD"][toCurrency])
        return
      }

      // Fallback: no conversion possible
      resolve(amount)
    }, 200) // Simulate API delay
  })
}

export function getCurrencySymbol(currencyCode: string): string {
  try {
    return (
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || currencyCode
    )
  } catch (error) {
    return currencyCode
  }
}

