"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Hotel, Plane, Utensils, MapPin, Plus, Minus, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExpenseCategory {
  name: string
  icon: React.ReactNode
  min: number
  max: number
  value: number
  enabled: boolean
}

interface Currency {
  code: string
  name: string
  symbol: string
  exchangeRate: number // Rate relative to USD
}

export function ExpenseEstimator() {
  const [destination, setDestination] = useState("")
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(3)
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      name: "Accommodation",
      icon: <Hotel className="h-5 w-5" />,
      min: 50,
      max: 500,
      value: 150,
      enabled: true,
    },
    {
      name: "Transportation",
      icon: <Plane className="h-5 w-5" />,
      min: 100,
      max: 2000,
      value: 400,
      enabled: true,
    },
    {
      name: "Food & Dining",
      icon: <Utensils className="h-5 w-5" />,
      min: 20,
      max: 200,
      value: 60,
      enabled: true,
    },
    {
      name: "Activities",
      icon: <MapPin className="h-5 w-5" />,
      min: 0,
      max: 200,
      value: 40,
      enabled: true,
    },
  ])

  // Define available currencies
  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1 },
    { code: "EUR", name: "Euro", symbol: "€", exchangeRate: 0.93 },
    { code: "GBP", name: "British Pound", symbol: "£", exchangeRate: 0.79 },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", exchangeRate: 150.14 },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", exchangeRate: 1.38 },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", exchangeRate: 1.52 },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", exchangeRate: 7.24 },
    { code: "INR", name: "Indian Rupee", symbol: "₹", exchangeRate: 83.36 },
    { code: "MXN", name: "Mexican Peso", symbol: "Mex$", exchangeRate: 16.82 },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", exchangeRate: 5.05 },
  ]

  // Get the current currency object
  const getCurrentCurrency = (): Currency => {
    return currencies.find((c) => c.code === selectedCurrency) || currencies[0]
  }

  // Convert USD to selected currency
  const convertCurrency = (amountInUSD: number): number => {
    const currency = getCurrentCurrency()
    return amountInUSD * currency.exchangeRate
  }

  // Format currency for display
  const formatCurrency = (amount: number): string => {
    const currency = getCurrentCurrency()

    // Handle special formatting for JPY and other currencies without decimals
    if (currency.code === "JPY" || currency.code === "KRW") {
      return `${currency.symbol}${Math.round(amount).toLocaleString()}`
    }

    return `${currency.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`
  }

  // Update category min/max values when currency changes
  useEffect(() => {
    const baseCategoryValues = [
      { name: "Accommodation", min: 50, max: 500, value: 150 },
      { name: "Transportation", min: 100, max: 2000, value: 400 },
      { name: "Food & Dining", min: 20, max: 200, value: 60 },
      { name: "Activities", min: 0, max: 200, value: 40 },
    ]

    const updatedCategories = categories.map((category) => {
      const baseCategory = baseCategoryValues.find((c) => c.name === category.name)
      if (!baseCategory) return category

      return {
        ...category,
        min: Math.round(convertCurrency(baseCategory.min)),
        max: Math.round(convertCurrency(baseCategory.max)),
        value: Math.round(convertCurrency(baseCategory.value)),
      }
    })

    setCategories(updatedCategories)
  }, [selectedCurrency])

  const updateCategoryValue = (index: number, value: number) => {
    const newCategories = [...categories]
    newCategories[index].value = value
    setCategories(newCategories)
  }

  const toggleCategory = (index: number) => {
    const newCategories = [...categories]
    newCategories[index].enabled = !newCategories[index].enabled
    setCategories(newCategories)
  }

  const calculateTotal = () => {
    return categories
      .filter((cat) => cat.enabled)
      .reduce((total, cat) => {
        if (cat.name === "Transportation") {
          return total + cat.value * travelers // Transportation is per person, not per day
        }
        if (cat.name === "Accommodation") {
          return total + cat.value * days // Accommodation is per day, not per person
        }
        return total + cat.value * days * travelers
      }, 0)
  }

  const handleTravelersChange = (change: number) => {
    const newValue = travelers + change
    if (newValue >= 1 && newValue <= 20) {
      setTravelers(newValue)
    }
  }

  const handleDaysChange = (change: number) => {
    const newValue = days + change
    if (newValue >= 1 && newValue <= 30) {
      setDays(newValue)
    }
  }

  // Auto-detect currency based on destination (simplified example)
  const detectCurrencyFromDestination = (dest: string) => {
    const destLower = dest.toLowerCase()

    if (destLower.includes("japan") || destLower.includes("tokyo")) {
      return "JPY"
    } else if (destLower.includes("uk") || destLower.includes("london") || destLower.includes("england")) {
      return "GBP"
    } else if (
      destLower.includes("europe") ||
      destLower.includes("paris") ||
      destLower.includes("rome") ||
      destLower.includes("berlin")
    ) {
      return "EUR"
    } else if (destLower.includes("canada") || destLower.includes("toronto") || destLower.includes("vancouver")) {
      return "CAD"
    } else if (destLower.includes("australia") || destLower.includes("sydney")) {
      return "AUD"
    } else if (destLower.includes("china") || destLower.includes("beijing") || destLower.includes("shanghai")) {
      return "CNY"
    } else if (destLower.includes("india") || destLower.includes("mumbai") || destLower.includes("delhi")) {
      return "INR"
    } else if (destLower.includes("mexico") || destLower.includes("cancun")) {
      return "MXN"
    } else if (destLower.includes("brazil") || destLower.includes("rio")) {
      return "BRL"
    }

    return "USD" // Default
  }

  // Handle destination change and auto-detect currency
  const handleDestinationChange = (dest: string) => {
    setDestination(dest)

    // Only auto-detect if the destination is substantially changed
    if (dest.length > 3 && Math.abs(dest.length - destination.length) > 2) {
      const detectedCurrency = detectCurrencyFromDestination(dest)
      setSelectedCurrency(detectedCurrency)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-orange-500" />
          Trip Expense Estimator
        </CardTitle>
        <CardDescription>Estimate your trip budget based on destination, duration, and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="flex items-center border rounded-md">
              <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="City, Country"
                className="border-0"
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Travel Dates</Label>
            <div className="grid grid-cols-2 gap-2">
              <DatePicker />
              <DatePicker />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number of Travelers</Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleTravelersChange(-1)}
                disabled={travelers <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium">{travelers}</div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTravelersChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Number of Days</Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDaysChange(-1)}
                disabled={days <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium">{days}</div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDaysChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
            Currency
          </Label>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Currency will be auto-detected based on your destination, but you can change it manually.
          </p>
        </div>

        <Tabs defaultValue="categories">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Expense Categories</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4 pt-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center">
                    <div className="mr-2 text-orange-500">{category.icon}</div>
                    {category.name}
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatCurrency(category.value)}
                      {category.name === "Food & Dining" || category.name === "Activities"
                        ? "/person/day"
                        : category.name === "Accommodation"
                          ? "/night"
                          : "/person"}
                    </span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={category.enabled}
                        onChange={() => toggleCategory(index)}
                        id={`toggle-${index}`}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                    </div>
                  </div>
                </div>

                {category.enabled && (
                  <div className="space-y-1">
                    <Slider
                      value={[category.value]}
                      min={category.min}
                      max={category.max}
                      step={5}
                      onValueChange={(value) => updateCategoryValue(index, value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(category.min)}</span>
                      <span>{formatCurrency(category.max)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="summary" className="pt-4">
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Estimated Total:</span>
                  <span className="text-xl font-bold text-orange-600">{formatCurrency(calculateTotal())}</span>
                </div>
                <p className="text-sm text-orange-700">
                  This estimate is based on {travelers} {travelers === 1 ? "traveler" : "travelers"} for {days}{" "}
                  {days === 1 ? "day" : "days"} in {getCurrentCurrency().code}.
                </p>
              </div>

              <div className="space-y-2">
                {categories
                  .filter((cat) => cat.enabled)
                  .map((category, index) => {
                    let totalForCategory = 0
                    if (category.name === "Transportation") {
                      totalForCategory = category.value * travelers
                    } else if (category.name === "Accommodation") {
                      totalForCategory = category.value * days
                    } else {
                      totalForCategory = category.value * days * travelers
                    }

                    return (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <div className="flex items-center">
                          <div className="mr-2 text-orange-500">{category.icon}</div>
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">{formatCurrency(totalForCategory)}</span>
                      </div>
                    )
                  })}
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add to Trip Budget
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

