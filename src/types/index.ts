// ============================================
// Auth Types
// ============================================

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  username: string;
  email: string;
  token: string;
}

// ============================================
// User Types
// ============================================

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  profilePictureUrl: string | null;
  createdAt: string;
}

export interface UpdateProfileRequest {
  bio?: string | null;
  profilePictureUrl?: string | null;
}

export interface UserSearchResult {
  id: number;
  username: string;
  email: string;
  profilePictureUrl: string | null;
}

// ============================================
// Project Types
// ============================================

export interface Project {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  ownerUsername: string;
  createdAt: string;
  memberCount: number;
  taskCount: number;
  myRole: string;
}

export interface ProjectDetail {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  ownerUsername: string;
  createdAt: string;
  myRole: string;
  members: ProjectMember[];
  columns: Column[];
}

export interface ProjectMember {
  userId: number;
  username: string;
  profilePictureUrl: string | null;
  role: string;
  joinedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string | null;
}

export interface UpdateProjectRequest {
  name: string;
  description?: string | null;
}

export interface AddProjectMemberRequest {
  email: string;
  role: string;
}

// ============================================
// Column Types
// ============================================

export interface Column {
  id: number;
  projectId: number;
  name: string;
  order: number;
  tasks: Task[];
}

export interface CreateColumnRequest {
  name: string;
  order: number;
}

export interface UpdateColumnRequest {
  name: string;
  order: number;
}

// ============================================
// Task Types
// ============================================

export interface Task {
  id: number;
  projectId: number;
  columnId: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: string;
  order: number;
  createdById: number;
  createdByUsername: string;
  createdAt: string;
  commentCount: number;
  assignments: TaskAssignment[];
}

export interface TaskAssignment {
  userId: number;
  username: string;
  profilePictureUrl: string | null;
  assignedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority: string;
  columnId: number;
  order: number;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  dueDate?: string | null;
  priority?: string;
  columnId?: number;
  order?: number;
}

export interface AssignTaskRequest {
  userId: number;
}

// ============================================
// Comment Types
// ============================================

export interface Comment {
  id: number;
  taskId: number;
  userId: number;
  username: string;
  profilePictureUrl: string | null;
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: number;
  content: string;
  type: string | null;
  relatedId: number | null;
  isRead: boolean;
  createdAt: string;
}

// ============================================
// API Error
// ============================================

export interface ApiError {
  message: string;
}