import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DiagnosisResult {
  disease: string
  confidence: number
  recommendations: Recommendation[]
  imageUrl?: string
}

export interface Recommendation {
  id: string
  title: string
  description: string
  type: 'treatment' | 'vaccine' | 'fertilizer' | 'pesticide'
  products: string[]
}

interface AppStore {
  language: string
  setLanguage: (language: string) => void
  
  diagnosisResult: DiagnosisResult | null
  setDiagnosisResult: (result: DiagnosisResult) => void
  clearDiagnosisResult: () => void
  
  uploadedImage: string | null
  setUploadedImage: (image: string) => void
  clearUploadedImage: () => void
  
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  error: string | null
  setError: (error: string | null) => void
  
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      
      diagnosisResult: null,
      setDiagnosisResult: (result) => set({ diagnosisResult: result }),
      clearDiagnosisResult: () => set({ diagnosisResult: null }),
      
      uploadedImage: null,
      setUploadedImage: (image) => set({ uploadedImage: image }),
      clearUploadedImage: () => set({ uploadedImage: null }),
      
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      error: null,
      setError: (error) => set({ error }),
      
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'farmaid-ai-store',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
      }),
    }
  )
)
