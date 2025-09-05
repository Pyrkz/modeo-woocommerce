import { useState, useEffect } from 'react';
import { authApi } from '@/features/auth/api/auth.api';
import { config } from '@/lib/config';

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser>({
    id: 0,
    name: '',
    email: '',
    isLoggedIn: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      
      try {
        // Use the existing auth API instead of custom endpoint
        const response = await authApi.checkAuth();
        
        if (response.success && response.user) {
          setUser({
            id: response.user.id,
            name: response.user.name || response.user.displayName || '',
            email: response.user.email || '',
            isLoggedIn: true
          });
        } else {
          // Fallback to Modeo endpoint
          try {
            const modeoResponse = await fetch(
              `${config.getApiUrl()}/wp-json/modeo/v1/current-user`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              }
            );

            if (modeoResponse.ok) {
              const modeoUserData = await modeoResponse.json();
              
              if (modeoUserData.isLoggedIn) {
                setUser({
                  id: modeoUserData.id,
                  name: modeoUserData.name || '',
                  email: modeoUserData.email || '',
                  isLoggedIn: true
                });
                return;
              }
            }
          } catch {
          }

          // If both methods fail, set anonymous user
          setUser({
            id: 0,
            name: '',
            email: '',
            isLoggedIn: false
          });
        }
      } catch {
        setUser({
          id: 0,
          name: '',
          email: '',
          isLoggedIn: false
        });
      }

      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  return { user, loading };
}