/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChatUser {
  id: number;
  chat_id: number;
  username: string;
  first_name: string;
  last_name: string | null;
  phone_number: string | null;
  language_code: string;
  latitude: string | null;
  longitude: string | null;
  last_message: ChatMessage | null;
  has_unread_messages: boolean;
}

export interface ChatMessage {
  id: number;
  user: any;
  message: string;
  message_type: number;
  message_id: number;
  reply_to_message_id: number | null;
  is_read: boolean;
  created_at: string;
}
