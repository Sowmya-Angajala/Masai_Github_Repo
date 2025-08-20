export interface FeedbackFormData {
  id: string;
  name: string;
  email?: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date string
  tags?: string[]; // optional
}

export type FeedbackFilter = {
  rating?: number; // exact rating filter
  from?: string;   // ISO date
  to?: string;     // ISO date
  search?: string; // text search in name/comment
}
