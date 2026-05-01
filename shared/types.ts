export type MessageDirection = 'incoming' | 'outgoing';
export type ChatPriority = 'high' | 'medium' | 'low';
export type ScheduleStatus = 'pending' | 'sent' | 'failed';
export type AutomationTrigger = 'keyword' | 'contact' | 'time';
export type ToneType = 'formal' | 'casual' | 'concise' | 'personal';

export interface User {
  id: string;
  name: string;
  email: string;
  settings: Record<string, any>;
  createdAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  contactName: string;
  lastMessage: string | null;
  priority: ChatPriority;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  direction: MessageDirection;
  timestamp: string;
  read: boolean;
  createdAt: string;
}

export interface ScheduledMessage {
  id: string;
  chatId: string;
  content: string;
  sendAt: string;
  status: ScheduleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Automation {
  id: string;
  userId: string;
  triggerType: AutomationTrigger;
  condition: string;
  action: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AILog {
  id: string;
  userId: string;
  input: string;
  output: string;
  modelUsed: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
