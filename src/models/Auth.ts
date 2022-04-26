export interface RefreshTokenPost {
  refreshToken: string;
}

export interface TokenProps {
  accessToken: string;
  refreshToken?: string;
}
