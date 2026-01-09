export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserProfile {
  id: number;
  email: string;
  user_type: "author" | "institution";
  title?: string;
  full_name?: string;
  institute?: string;
  designation?: string;
  institution_name?: string;
  bio?: string;
  cv?: string;
  degree?: string;
  gender?: string;
  research_interests?: string;
  website?: string;
  profile_pic?: string;
}

export interface AuthState {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthorRegisterRequest {
  email: string;
  password: string;
  confirm_password: string;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
}

export interface InstitutionRegisterRequest {
  email: string;
  password: string;
  confirm_password: string;
  institution_name: string;
}

export interface LoginResponse {
  message: string;
  tokens: AuthTokens;
  user: UserProfile;
}

export interface RegisterResponse {
  message: string;
  tokens: AuthTokens;
  user: {
    email: string;
    user_type: "author" | "institution";
  };
}

export interface RefreshTokenResponse {
  message: string;
  access: string;
}

// Helper type for API errors
export interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
}
