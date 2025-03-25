// API response types

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export type PaginationParams = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export type FilterParams = {
  [key: string]: string | number | boolean | string[] | number[] | null
}

export type ApiError = {
  status: number
  message: string
  code?: string
  details?: any
}

