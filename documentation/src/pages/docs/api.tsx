import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SEO } from "@/components/seo"
import Link from "next/link"
import { ArrowLeft, Globe, Key, AlertCircle, Zap, Database, Shield } from "lucide-react"

export default function API() {
  return (
    <>
      <SEO 
        title="API Integration Guide"
        description="Learn how to integrate APIs, handle authentication, manage data fetching, and implement error handling in your React Native Boilerplate app."
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">API Integration</h1>
                <p className="text-muted-foreground">Complete guide to API integration and data management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-6 w-6" />
                  API Integration Overview
                </CardTitle>
                <CardDescription>
                  The React Native Boilerplate provides a robust API integration setup with Axios, TanStack Query, authentication handling, and comprehensive error management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">HTTP Client</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Axios with interceptors</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Database className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Data Fetching</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">TanStack Query for caching</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <Key className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Authentication</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Token-based auth</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HTTP Client Setup */}
            <Card>
              <CardHeader>
                <CardTitle>HTTP Client Configuration</CardTitle>
                <CardDescription>
                  Setting up Axios with interceptors and base configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Base Axios Configuration</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '@/config'
import { storage } from '@/services/storage'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor for auth token
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await storage.getToken()
    
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: \`Bearer \${token}\`,
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = await storage.getRefreshToken()
        if (refreshToken) {
          const response = await refreshAuthToken(refreshToken)
          await storage.setToken(response.data.accessToken)
          
          // Retry original request
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await storage.clearTokens()
        // Navigate to login screen
      }
    }
    
    return Promise.reject(error)
  }
)

export { apiClient }`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">API Configuration</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// config/api.ts
export const config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',
  API_TIMEOUT: 30000,
  
  // API Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
    },
    user: {
      profile: '/user/profile',
      update: '/user/profile',
    },
    posts: {
      list: '/posts',
      create: '/posts',
      detail: (id: string) => \`/posts/\${id}\`,
      update: (id: string) => \`/posts/\${id}\`,
      delete: (id: string) => \`/posts/\${id}\`,
    },
  },
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Services */}
            <Card>
              <CardHeader>
                <CardTitle>API Service Layer</CardTitle>
                <CardDescription>
                  Organizing API calls into reusable service functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Authentication Service</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/api/authService.ts
import { apiClient } from './client'
import { config } from '@/config'

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(config.endpoints.auth.login, credentials)
    return response.data
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(config.endpoints.auth.register, userData)
    return response.data
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post(config.endpoints.auth.refresh, {
      refreshToken,
    })
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post(config.endpoints.auth.logout)
  },
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">User Service</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/api/userService.ts
import { apiClient } from './client'
import { config } from '@/config'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface UpdateUserRequest {
  name?: string
  avatar?: string
}

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get(config.endpoints.user.profile)
    return response.data
  },

  updateProfile: async (updates: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.put(config.endpoints.user.update, updates)
    return response.data
  },

  uploadAvatar: async (file: FormData): Promise<{ url: string }> => {
    const response = await apiClient.post('/user/avatar', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Generic API Service</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/api/baseService.ts
import { apiClient } from './client'

export class BaseApiService<T> {
  constructor(private endpoint: string) {}

  async getAll(params?: Record<string, any>): Promise<T[]> {
    const response = await apiClient.get(this.endpoint, { params })
    return response.data
  }

  async getById(id: string): Promise<T> {
    const response = await apiClient.get(\`\${this.endpoint}/\${id}\`)
    return response.data
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await apiClient.post(this.endpoint, data)
    return response.data
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await apiClient.put(\`\${this.endpoint}/\${id}\`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(\`\${this.endpoint}/\${id}\`)
  }
}

// Usage example
export const postsService = new BaseApiService<Post>('/posts')`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TanStack Query Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-6 w-6" />
                  TanStack Query Integration
                </CardTitle>
                <CardDescription>
                  Using TanStack Query for efficient data fetching and caching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Query Client Setup</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// providers/QueryProvider.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Custom Query Hooks</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// hooks/queries/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/api'

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userService.getProfile,
    enabled: !!storage.getToken(), // Only fetch if authenticated
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updatedUser) => {
      // Update cache
      queryClient.setQueryData(['user', 'profile'], updatedUser)
      
      // Show success message
      showToast('Profile updated successfully', 'success')
    },
    onError: (error) => {
      showToast('Failed to update profile', 'error')
    },
  })
}

// Posts queries
export const usePosts = (params?: PostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => postsService.getAll(params),
    keepPreviousData: true, // For pagination
  })
}

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsService.getById(id),
    enabled: !!id,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postsService.create,
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries(['posts'])
    },
  })
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Optimistic Updates</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// hooks/queries/useOptimisticPost.ts
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      postsService.update(id, data),
    
    // Optimistic update
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['posts', id])

      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(['posts', id])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', id], (old: Post) => ({
        ...old,
        ...data,
      }))

      // Return context with snapshot
      return { previousPost, id }
    },

    // If mutation fails, rollback
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', context.id], context.previousPost)
      }
    },

    // Always refetch after error or success
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(['posts', variables.id])
    },
  })
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Handling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-6 w-6" />
                  Error Handling
                </CardTitle>
                <CardDescription>
                  Comprehensive error handling strategies for API calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Error Types & Handling</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// types/api.ts
export interface ApiError {
  message: string
  status: number
  code?: string
  details?: Record<string, any>
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public fields: Record<string, string[]>) {
    super(message)
    this.name = 'ValidationError'
  }
}

// utils/errorHandler.ts
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    
    return {
      message: data.message || 'An error occurred',
      status,
      code: data.code,
      details: data.details,
    }
  } else if (error.request) {
    // Network error
    throw new NetworkError('Network connection failed')
  } else {
    // Other error
    throw new Error(error.message || 'An unexpected error occurred')
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Error Boundary for API Errors</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// components/ErrorBoundary.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ApiErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('API Error Boundary caught an error:', error, errorInfo)
    
    // Log to crash reporting service
    crashlytics().recordError(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorMessage}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return this.props.children
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Global Error Handler Hook</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// hooks/useErrorHandler.ts
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const useErrorHandler = () => {
  const navigation = useNavigation()

  const handleError = useCallback((error: any) => {
    const apiError = handleApiError(error)

    switch (apiError.status) {
      case 401:
        // Unauthorized - redirect to login
        Alert.alert(
          'Session Expired',
          'Please log in again to continue.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        )
        break

      case 403:
        // Forbidden
        Alert.alert('Access Denied', 'You do not have permission to perform this action.')
        break

      case 422:
        // Validation errors
        if (apiError.details) {
          const fieldErrors = Object.entries(apiError.details)
            .map(([field, errors]) => \`\${field}: \${errors.join(', ')}\`)
            .join('\\n')
          
          Alert.alert('Validation Error', fieldErrors)
        }
        break

      case 500:
        // Server error
        Alert.alert('Server Error', 'Something went wrong on our end. Please try again later.')
        break

      default:
        // Generic error
        Alert.alert('Error', apiError.message)
    }
  }, [navigation])

  return { handleError }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Authentication Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-6 w-6" />
                  Authentication Flow
                </CardTitle>
                <CardDescription>
                  Implementing secure authentication with token management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Authentication Hook</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { storage } from '@/services/storage'
import { authService } from '@/services/api'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = await storage.getToken()
      if (token) {
        const userProfile = await userService.getProfile()
        setUser(userProfile)
        setIsAuthenticated(true)
      }
    } catch (error) {
      // Token invalid, clear storage
      await storage.clearTokens()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      
      // Store tokens
      await storage.setToken(response.accessToken)
      await storage.setRefreshToken(response.refreshToken)
      
      // Update state
      setUser(response.user)
      setIsAuthenticated(true)
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn('Logout API call failed:', error)
    } finally {
      // Clear local storage and state
      await storage.clearTokens()
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Token Storage Service</h4>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`// services/storage/tokenStorage.ts
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV({
  id: 'auth-storage',
  encryptionKey: 'auth-encryption-key',
})

export const tokenStorage = {
  setToken: (token: string) => {
    storage.set('accessToken', token)
  },

  getToken: (): string | undefined => {
    return storage.getString('accessToken')
  },

  setRefreshToken: (token: string) => {
    storage.set('refreshToken', token)
  },

  getRefreshToken: (): string | undefined => {
    return storage.getString('refreshToken')
  },

  clearTokens: () => {
    storage.delete('accessToken')
    storage.delete('refreshToken')
  },

  hasValidToken: (): boolean => {
    const token = storage.getString('accessToken')
    if (!token) return false

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch {
      return false
    }
  },
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>API Best Practices</CardTitle>
                <CardDescription>
                  Guidelines for efficient and maintainable API integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Do</h5>
                      <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                        <li>• Use TypeScript interfaces for API responses</li>
                        <li>• Implement proper error handling and user feedback</li>
                        <li>• Cache data appropriately with TanStack Query</li>
                        <li>• Use optimistic updates for better UX</li>
                        <li>• Implement request/response interceptors</li>
                        <li>• Handle authentication token refresh automatically</li>
                        <li>• Use environment variables for API configuration</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Don't</h5>
                      <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                        <li>• Store sensitive data in unencrypted storage</li>
                        <li>• Make API calls directly in components</li>
                        <li>• Ignore network errors or timeout handling</li>
                        <li>• Hard-code API endpoints</li>
                        <li>• Skip request validation</li>
                        <li>• Forget to handle loading states</li>
                        <li>• Use synchronous storage operations</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Performance Tips</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <strong className="text-blue-800 dark:text-blue-200">Pagination:</strong>
                        <span className="text-blue-700 dark:text-blue-300 ml-2">Use infinite queries for large datasets</span>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                        <strong className="text-green-800 dark:text-green-200">Debouncing:</strong>
                        <span className="text-green-700 dark:text-green-300 ml-2">Debounce search API calls</span>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                        <strong className="text-purple-800 dark:text-purple-200">Background Sync:</strong>
                        <span className="text-purple-700 dark:text-purple-300 ml-2">Sync data when app becomes active</span>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
                        <strong className="text-orange-800 dark:text-orange-200">Request Deduplication:</strong>
                        <span className="text-orange-700 dark:text-orange-300 ml-2">Prevent duplicate API calls</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/docs/configuration" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold mb-2">Configuration</h4>
                    <p className="text-sm text-muted-foreground">Learn about environment setup and configuration</p>
                  </Link>
                  <Link href="/docs/best-practices" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold mb-2">Best Practices</h4>
                    <p className="text-sm text-muted-foreground">Development guidelines and code standards</p>
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  )
} 