import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

@Injectable({ providedIn: 'root' })
export class ChatService {

  messages = signal<any[]>([]);
  private currentChannel: any = null;

  constructor() {
   this.listenToMessages();
  }

  async sendMessage(senderId: string, receiverId: string, content: string) {
    await supabase.from('messages').insert([{ sender_id: senderId, receiver_id: receiverId, content }]);
  }

  listenToMessages() {
    supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          this.messages.update((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
  }

  async fetchMessages(senderId: string, receiverId: string) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`)
      .order('created_at', { ascending: true });

    this.messages.set(data || []);
  }

  subscribeToMessages(userTo: string, callback: (payload: any) => void) {
    return supabase
      .channel(`messages-to-${userTo}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter:`receiver_id=eq.${userTo}` }, callback)
  }
  /*subscribeToChat(receiverId: string, onNewMessage?: (payload: any) => void) {
    // Limpia canal anterior si existe
    if (this.currentChannel) {
      supabase.removeChannel(this.currentChannel);
    }

    this.currentChannel = supabase
      .channel(`chat-}${receiverId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id.eq.${receiverId},receiver_id.eq.${receiverId}`
        },
        (payload) => {
          this.messages.update((prev) => [...prev, payload.new]);
          if (onNewMessage) onNewMessage(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Chat realtime subscription active');
        }
      });
  }*/
} 