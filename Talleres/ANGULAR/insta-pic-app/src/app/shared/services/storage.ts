import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment.dev';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {



  supabaseUrl = SUPABASE_URL
  supabaseKey = SUPABASE_KEY
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  async uploadFile(imageFile: File, username: string) {
    try {
      // Check if user is authenticated
      const { data: { user } } = await this.supabase.auth.getUser();
      
      if (!user) {
        console.error('User not authenticated');
        return { success: false, error: 'User not authenticated' };
      }

      const fileName = uuidv4();
      const filePath = `${username}/${fileName}`;
      
      const { data, error } = await this.supabase.storage
        .from('instapic')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
      }

      console.log('Upload successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: 'Upload failed' };
    }
  }


}

