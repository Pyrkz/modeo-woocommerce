import { api } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/env';
import { User, WPUserResponse, AuthApiResponse } from '@/types/auth';

// Transform WordPress user response to our User type
function transformWPUser(wpUser: WPUserResponse): User {
  return {
    id: wpUser.id,
    name: wpUser.name,
    email: wpUser.email,
    firstName: wpUser.first_name || undefined,
    lastName: wpUser.last_name || undefined,
    displayName: wpUser.nickname || wpUser.name,
    avatar: wpUser.avatar_urls?.['96'] || undefined,
    roles: wpUser.roles || [],
    isLoggedIn: true,
  };
}

export const authApi = {
  // Check current authentication status with WordPress
  async checkAuth(): Promise<AuthApiResponse> {
    console.log('🔐 Auth check started, calling:', API_ENDPOINTS.AUTH_STATUS);
    
    try {
      // Use the new authentication status endpoint from our WordPress plugin
      const response = await api.get<{
        authenticated: boolean;
        method?: string;
        user?: {
          id: number;
          name: string;
          email: string;
          first_name: string;
          last_name: string;
          nickname: string;
          avatar_urls: Record<string, string>;
          roles: string[];
          capabilities: string[];
        };
      }>(API_ENDPOINTS.AUTH_STATUS);
      
      console.log('🔐 Auth API response:', response);
      
      if (response.success && response.data?.authenticated && response.data.user) {
        // Transform to our User type
        const userData = response.data.user;
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          firstName: userData.first_name || undefined,
          lastName: userData.last_name || undefined,
          displayName: userData.name,
          avatar: userData.avatar_urls?.['96'] || undefined,
          roles: userData.roles || [],
          isLoggedIn: true,
        };
        
        console.log('🔐 User authenticated:', user);
        
        return {
          success: true,
          user,
          message: `User authenticated via ${response.data.method || 'wordpress_cookies'}`,
        };
      }
      
      console.log('🔐 User not authenticated via custom endpoint');
      return {
        success: false,
        message: 'User not authenticated',
      };
    } catch (error) {
      console.error('🔐 Custom auth check failed, trying fallback:', error);
      
      // Try fallback to standard WordPress /users/me endpoint
      try {
        console.log('🔐 Trying WordPress /users/me fallback');
        const fallbackResponse = await api.get<{
          id: number;
          name: string;
          email: string;
          first_name: string;
          last_name: string;
          nickname: string;
          avatar_urls: Record<string, string>;
          roles: string[];
        }>(API_ENDPOINTS.USER_ME);
        
        if (fallbackResponse.success && fallbackResponse.data?.id) {
          const userData = fallbackResponse.data;
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            firstName: userData.first_name || undefined,
            lastName: userData.last_name || undefined,
            displayName: userData.name,
            avatar: userData.avatar_urls?.['96'] || undefined,
            roles: userData.roles || [],
            isLoggedIn: true,
          };
          
          console.log('🔐 User authenticated via fallback:', user);
          
          return {
            success: true,
            user,
            message: 'User authenticated via WordPress /users/me fallback',
          };
        }
      } catch (fallbackError) {
        console.error('🔐 Fallback auth also failed:', fallbackError);
      }
      
      return {
        success: false,
        message: 'Authentication check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Get user profile
  async getUserProfile(userId: number): Promise<AuthApiResponse> {
    try {
      const response = await api.get<WPUserResponse>(
        `${API_ENDPOINTS.WP_API}/users/${userId}`
      );
      
      if (response.success && response.data) {
        return {
          success: true,
          user: transformWPUser(response.data),
        };
      }
      
      return {
        success: false,
        message: 'User not found',
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch user profile',
      };
    }
  },

  // Build login URL with redirect
  buildLoginUrl(returnUrl?: string): string {
    const baseUrl = API_ENDPOINTS.LOGIN;
    if (!returnUrl) return baseUrl;
    
    return `${baseUrl}?redirect_to=${encodeURIComponent(returnUrl)}`;
  },

  // Build register URL with redirect
  buildRegisterUrl(returnUrl?: string): string {
    const baseUrl = API_ENDPOINTS.REGISTER;
    const fragment = '#register';
    
    if (!returnUrl) return `${baseUrl}${fragment}`;
    
    return `${baseUrl}?redirect_to=${encodeURIComponent(returnUrl)}${fragment}`;
  },

  // Build logout URL with redirect
  buildLogoutUrl(returnUrl?: string): string {
    const baseUrl = API_ENDPOINTS.LOGOUT;
    if (!returnUrl) return baseUrl;
    
    return `${baseUrl}?redirect_to=${encodeURIComponent(returnUrl)}`;
  },

  // Login via API (for development/testing)
  async loginWithCredentials(username: string, password: string): Promise<AuthApiResponse> {
    try {
      const response = await api.post<{
        success: boolean;
        token: string;
        user: {
          id: number;
          name: string;
          email: string;
          first_name: string;
          last_name: string;
        };
      }>(API_ENDPOINTS.AUTH_LOGIN, {
        username,
        password,
      });

      if (response.success && response.data?.success) {
        const userData = response.data.user;
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          displayName: userData.name,
          roles: ['customer'],
          isLoggedIn: true,
        };

        return {
          success: true,
          user,
          message: 'Login successful',
        };
      }

      return {
        success: false,
        message: 'Login failed',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};