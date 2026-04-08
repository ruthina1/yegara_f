export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  averageRating?: number;
  totalRatings?: number;
  content?: CourseContent[];
}

export interface CourseContent {
  id: number;
  course_id: number;
  title: string;
  content_type: 'video' | 'quiz' | 'pdf';
  content_url: string;
  order_index: number;
}

export interface Progress {
  id: number;
  user_id: number;
  course_id: number;
  content_id: number;
  completed: boolean;
  progress_percentage: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
