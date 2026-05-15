export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface Chapter {
  id?: number;
  course_id?: number;
  chapter_name: string;
  content_text: string;
  content_images?: string[];
  video_url?: string;
  order_index: number;
}

export interface Course {
  id: number;
  title: string;
  category?: string;
  description?: string;
  thumbnail_url?: string;
  averageRating?: number;
  totalRatings?: number;
  chapterCount?: number;
  chapters?: Chapter[];
  content?: CourseContent[];
  created_at?: string;
  userProgress?: number;
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
  content_id?: number;
  chapter_id?: number;
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
