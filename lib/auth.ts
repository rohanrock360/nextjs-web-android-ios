// Auth utility functions for localStorage-based authentication

export interface User {
  email: string;
  verified: boolean;
}

export interface Session {
  email: string;
}

// Generate a random 6-digit OTP
// TEMPORARY: Using fixed OTP 123456 for testing
export function generateOTP(): string {
 return '123456'; // Fixed OTP for testing
  // return Math.floor(100000 + Math.random() * 900000).toString();
}

// Get all registered users from localStorage
function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('otp_auth_users');
  return users ? JSON.parse(users) : [];
}

// Save all users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('otp_auth_users', JSON.stringify(users));
}

// Check if user exists and get their data
export function getUser(email: string): User | null {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// Save a new verified user
export function saveUser(email: string): void {
  const users = getUsers();
  
  // Check if user already exists
  const existingIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingIndex >= 0) {
    // Update existing user
    users[existingIndex] = { email, verified: true };
  } else {
    // Add new user
    users.push({ email, verified: true });
  }
  
  saveUsers(users);
}

// Store OTP for verification (in production, this would be server-side)
export function setStoredOTP(email: string, otp: string): void {
  if (typeof window === 'undefined') return;
  const key = `otp_${email.toLowerCase()}`;
  localStorage.setItem(key, JSON.stringify({ otp, timestamp: Date.now() }));
}

// Get stored OTP for verification
export function getStoredOTP(email: string): { otp: string; timestamp: number } | null {
  if (typeof window === 'undefined') return null;
  const key = `otp_${email.toLowerCase()}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Clear stored OTP after use
export function clearStoredOTP(email: string): void {
  if (typeof window === 'undefined') return;
  const key = `otp_${email.toLowerCase()}`;
  localStorage.removeItem(key);
}

// Set current session
export function setSession(email: string): void {
  if (typeof window === 'undefined') return;
  const session: Session = { email };
  localStorage.setItem('otp_auth_session', JSON.stringify(session));
}

// Get current session
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  const session= localStorage.getItem('otp_auth_session');
  return session ? JSON.parse(session) : null;
}

// Clear current session
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('otp_auth_session');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

// Get authenticated user's email
export function getAuthenticatedUser(): string | null {
  const session = getSession();
  return session?.email || null;
}
