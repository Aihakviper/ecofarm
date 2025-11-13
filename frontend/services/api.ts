import axios, { AxiosInstance } from 'axios'
import { DiagnosisResult } from '@/store/useAppStore'

interface PredictPayload {
  image: File | string
  language?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  type: string
  image?: string
  vendor?: string
  rating?: number
}

export interface Expert {
  id: string
  name: string
  specialty: string
  location: string
  phone?: string
  email?: string
  whatsapp?: string
  rating?: number
  experience?: number
}

export interface RecommendationItem {
  id: string
  title: string
  description: string
}

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add request interceptor for auth token if needed
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  /**
   * Upload image and get disease prediction
   */
  async predict(payload: PredictPayload): Promise<DiagnosisResult> {
    try {
      const formData = new FormData()
      
      if (payload.image instanceof File) {
        formData.append('image', payload.image)
      } else {
        formData.append('image', payload.image)
      }
      
      if (payload.language) {
        formData.append('language', payload.language)
      }

      const response = await this.api.post<ApiResponse<DiagnosisResult>>(
        '/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.data.success && response.data.data) {
        return response.data.data
      }
      throw new Error(response.data.message || 'Prediction failed')
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Get product recommendations based on diagnosis
   */
  async getRecommendations(diseaseId: string): Promise<RecommendationItem[]> {
    try {
      const response = await this.api.get<ApiResponse<RecommendationItem[]>>(
        `/recommendations/${diseaseId}`
      )
      return response.data.data || []
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Get list of expert vet/agronomists
   */
  async getExperts(filters?: { location?: string; type?: string }): Promise<Expert[]> {
    try {
      const response = await this.api.get<ApiResponse<Expert[]>>('/experts', {
        params: filters,
      })
      return response.data.data || []
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Get products for marketplace
   */
  async getProducts(filters?: { type?: string; disease?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> {
    try {
      const response = await this.api.get<ApiResponse<Product[]>>('/products', {
        params: filters,
      })
      return response.data.data || []
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Submit feedback on diagnosis result
   */
  async submitFeedback(diagnosisId: string, helpful: boolean, notes?: string): Promise<boolean> {
    try {
      const response = await this.api.post<ApiResponse<void>>(
        `/feedback/${diagnosisId}`,
        { helpful, notes }
      )
      return response.data.success
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.api.get<ApiResponse<void>>('/health')
      return response.data.success
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as ApiResponse<void>)?.message || error.message
      return new Error(message)
    }
    return new Error('An unexpected error occurred')
  }
}

export const apiService = new ApiService()
