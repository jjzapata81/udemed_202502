
import { createClient } from '@supabase/supabase-js'
import { Injectable } from '@angular/core';
import { SUPABASE_KEY } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  
  supabaseUrl = 'https://ymnlcjxtwothirvjjrxb.supabase.co'
  supabase = createClient(this.supabaseUrl, SUPABASE_KEY)

  async uploadFile(imageFile: File, username: string){
    
    const FileName = uuidv4();
    const { data, error } = await this.supabase.storage
      .from('instapic')
      .upload(`${username}/${FileName}`, imageFile);
  }

}