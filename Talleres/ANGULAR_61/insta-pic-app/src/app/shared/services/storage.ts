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

  uploadFile(imageFile: File, userName: string) {
    const fileName = uuidv4();
    const { data, error } = await this.supabase.storage.from('instapic').upload(`${userName}/${fileName}.png`, imageFile)
    console.log(data);
    console.log(error);

  }
}
