export interface ReviewReply {
  id: number;
  parent_id: number;
  reviewer: string;
  reviewer_email: string;
  date_created: string;
  reply: string;
  verified: boolean;
  is_admin: boolean;
  status?: 'approved' | 'pending' | 'spam' | 'trash';
  replies?: ReviewReply[]; // Nested replies
}

export interface Review {
  id: number;
  product_id: number;
  reviewer: string;
  reviewer_email: string;
  date_created: string;
  date_created_gmt: string;
  review: string;
  rating: number;
  verified: boolean;
  status?: 'approved' | 'pending' | 'spam' | 'trash';
  replies?: ReviewReply[];
  reply_count?: number;
}

export interface ReviewFormData {
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  product_id: number;
  recaptcha_token?: string;
}

export interface ReplyFormData {
  reviewer: string;
  reviewer_email: string;
  reply: string;
  parent_id: number;
  product_id: number;
  recaptcha_token?: string;
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_counts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  total_pages: number;
}

export interface CreateReviewResponse {
  id: number;
  product_id: number;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  date_created: string;
  status: string;
}