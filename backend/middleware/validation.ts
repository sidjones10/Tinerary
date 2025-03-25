import { type NextRequest, NextResponse } from "next/server"

type ValidationSchema = {
  [key: string]: {
    type: "string" | "number" | "boolean" | "object" | "array"
    required?: boolean
    min?: number
    max?: number
    pattern?: RegExp
    enum?: any[]
    custom?: (value: any) => boolean
  }
}

export function validateBody(schema: ValidationSchema) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json()
      const errors: { [key: string]: string } = {}

      // Validate each field against the schema
      for (const [field, rules] of Object.entries(schema)) {
        const value = body[field]

        // Check required fields
        if (rules.required && (value === undefined || value === null || value === "")) {
          errors[field] = `${field} is required`
          continue
        }

        // Skip validation for optional fields that are not provided
        if (value === undefined || value === null) {
          continue
        }

        // Type validation
        const typeOfValue = Array.isArray(value) ? "array" : typeof value
        if (typeOfValue !== rules.type && !(rules.type === "array" && Array.isArray(value))) {
          errors[field] = `${field} must be a ${rules.type}`
          continue
        }

        // String validations
        if (rules.type === "string") {
          if (rules.min !== undefined && value.length < rules.min) {
            errors[field] = `${field} must be at least ${rules.min} characters`
          }

          if (rules.max !== undefined && value.length > rules.max) {
            errors[field] = `${field} must be at most ${rules.max} characters`
          }

          if (rules.pattern && !rules.pattern.test(value)) {
            errors[field] = `${field} has an invalid format`
          }
        }

        // Number validations
        if (rules.type === "number") {
          if (rules.min !== undefined && value < rules.min) {
            errors[field] = `${field} must be at least ${rules.min}`
          }

          if (rules.max !== undefined && value > rules.max) {
            errors[field] = `${field} must be at most ${rules.max}`
          }
        }

        // Array validations
        if (rules.type === "array") {
          if (rules.min !== undefined && value.length < rules.min) {
            errors[field] = `${field} must have at least ${rules.min} items`
          }

          if (rules.max !== undefined && value.length > rules.max) {
            errors[field] = `${field} must have at most ${rules.max} items`
          }
        }

        // Enum validations
        if (rules.enum && !rules.enum.includes(value)) {
          errors[field] = `${field} must be one of: ${rules.enum.join(", ")}`
        }

        // Custom validation
        if (rules.custom && !rules.custom(value)) {
          errors[field] = `${field} is invalid`
        }
      }

      if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 400 })
      }

      // If validation passes, continue
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }
  }
}

