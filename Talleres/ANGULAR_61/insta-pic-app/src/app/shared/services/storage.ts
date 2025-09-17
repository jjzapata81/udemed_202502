import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  supabaseUrl = SUPABASE_URL
  supabaseKey = SUPABASE_KEY
  private supabase = createClient(this.supabaseUrl, this.supabaseKey)

  async uploadFile(imageFile: File, userName: string) {
    const fileName = uuidv4();
    return this.supabase.storage.from('instapic').upload(`${userName}/${fileName}`, imageFile).then(response => {
      console.log(response);
      console.log("3 - supabase response");
      if (response.data) {
        return response.data.fullPath;
      }
      throw response.error;
    });

  }

  getUrl(fullPath: string) {
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPath}`
  }
}
