export interface Movie {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  downloadUrl: string;
  createdAt: string;
  isLocalVideo?: boolean;
}

export interface MovieRequest {
  id: string;
  title: string;
  releaseDate?: string;
  viewerName?: string;
  createdAt: string;
}
