import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async uploadFile(imageFile: File, username: string) {
    try {
      const fileName = uuidv4();
      const fileExt = imageFile.name.split('.').pop();
      const filePath = fileExt ? `${username}/${fileName}.${fileExt}` : `${username}/${fileName}`;

      const { data, error } = await this.supabase.storage
        .from('instapic')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || undefined,
        });

      if (error) {
        console.error('Upload error:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err: any) {
      console.error('Upload error:', err);
      return { data: null, error: err };
    }
  }

  getImageUrl(path: string) {
    return `${SUPABASE_URL}/storage/v1/object/public/instapic/${path}`;
  }
}