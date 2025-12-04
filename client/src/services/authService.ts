import { apiClient } from '../utils/apiClient';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import type {
    User,
    Admin,
    Doctor,
    Pharmacist,
    Pathologist,
    LoginResponse,
    AuthResult,
    UserRole
} from '../types';

/**
 * Authentication Service
 * Mirrors Flutter's AuthService class
 */
class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Get stored auth token
     */
    getToken(): string | null {
        const token = localStorage.getItem(API_CONFIG.TOKEN_KEY);
        console.log(`🔑 [AUTH] Retrieved token: ${token ? `EXISTS (${token.substring(0, 20)}...)` : 'NULL'}`);
        return token;
    }

    /**
     * Save auth token
     */
    private saveToken(token: string): void {
        localStorage.setItem(API_CONFIG.TOKEN_KEY, token);
        console.log(`💾 [AUTH] Token saved: ${token.substring(0, 20)}...`);
    }

    /**
     * Clear auth token and user data
     */
    private clearToken(): void {
        localStorage.removeItem(API_CONFIG.TOKEN_KEY);
        localStorage.removeItem('user_data');
        console.log('🗑️ [AUTH] Token and user data cleared');
    }

    /**
     * Parse user based on role
     */
    private parseUserRole(userData: any): User | Admin | Doctor | Pharmacist | Pathologist {
        const role = userData.role as UserRole;

        switch (role) {
            case 'admin':
                return userData as Admin;
            case 'doctor':
                return userData as Doctor;
            case 'pharmacist':
                return userData as Pharmacist;
            case 'pathologist':
                return userData as Pathologist;
            default:
                return userData as User;
        }
    }

    /**
     * Sign in with email and password
     */
    async signIn(email: string, password: string): Promise<AuthResult> {
        try {
            console.log(`📤 [AUTH] Signing in: ${email}`);

            const response = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.auth.login,
                { email, password }
            );

            const { accessToken, user: userData } = response;

            // Save token
            this.saveToken(accessToken);

            // Parse user based on role
            const user = this.parseUserRole(userData);

            console.log(`✅ [AUTH] Login successful: ${user.email} (${user.role})`);

            return { user, token: accessToken };
        } catch (error) {
            console.error('❌ [AUTH] Login failed:', error);
            throw error;
        }
    }

    /**
     * Validate token and get user data
     */
    async getUserData(): Promise<AuthResult | null> {
        try {
            const token = this.getToken();

            if (!token) {
                console.log('⚠️ [AUTH] No token found');
                return null;
            }

            console.log('📤 [AUTH] Validating token...');

            // Call validate-token endpoint
            const userData = await apiClient.post(API_ENDPOINTS.auth.validateToken);

            const user = this.parseUserRole(userData);

            console.log(`✅ [AUTH] Token valid: ${user.email} (${user.role})`);

            return { user, token };
        } catch (error) {
            console.error('❌ [AUTH] Token validation failed:', error);
            this.clearToken();
            return null;
        }
    }

    /**
     * Sign out
     */
    async signOut(): Promise<void> {
        try {
            console.log('📤 [AUTH] Signing out...');

            // Optionally call logout endpoint
            // await apiClient.post(API_ENDPOINTS.auth.logout);

            this.clearToken();
            console.log('✅ [AUTH] Signed out successfully');
        } catch (error) {
            console.error('❌ [AUTH] Logout error:', error);
            // Clear token anyway
            this.clearToken();
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Change password
     */
    async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
        try {
            console.log('📤 [AUTH] Changing password...');

            await apiClient.post(API_ENDPOINTS.auth.changePassword, {
                currentPassword,
                newPassword,
            });

            console.log('✅ [AUTH] Password changed successfully');
            return true;
        } catch (error) {
            console.error('❌ [AUTH] Password change failed:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const authService = AuthService.getInstance();
export default authService;
