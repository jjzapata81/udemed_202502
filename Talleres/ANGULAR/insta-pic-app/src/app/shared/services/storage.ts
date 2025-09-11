import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  supabaseUrl = 'https://pdzvshdwgyelirimnppr.supabase.co';
  supabase = createClient(this.supabaseUrl, environment.SUPABASE_KEY);

  async uploadFile(imageFile: File, username: string) {
    const fileName = uuidv4();
    const { data, error } = await this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile);
    console.log(data);
    console.error(error);
  }
}
