import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '../../../environments/environment'
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  supabaseUrl = 'https://ecwujqenxmfrezolyzpm.supabase.co'
  supabaseKey = SUPABASE_KEY
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  async uploadFile(imageFile:File, username:string) {
  
    const FileName = uuidv4();
    const { data, error } = await this.supabase.storage
      .from('instapic')
      .upload(`${username}/${FileName}`, imageFile)

    console.log('data', data);
    console.log('error', error);
    

  }

  
}
