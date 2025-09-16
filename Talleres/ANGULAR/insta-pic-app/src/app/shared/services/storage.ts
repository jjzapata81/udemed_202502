import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment'
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  supabaseUrl = SUPABASE_URL
  supabaseKey = SUPABASE_KEY
  supabase = createClient(this.supabaseUrl, this.supabaseKey)

  async uploadFile(imageFile:File, username:string) {
  
    const FileName = uuidv4();
    //const { data, error } = await this.supabase.storage
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${FileName}`, imageFile)
      .then(response=>{
        console.log(response)
        return response;
      })
      .catch(error=>console.error(error));
    //console.log('data', data);
    // //console.log('error', error);
    
  }

  getImageUrl(fullPaht:string) {
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPaht}`;
  }

  
}
