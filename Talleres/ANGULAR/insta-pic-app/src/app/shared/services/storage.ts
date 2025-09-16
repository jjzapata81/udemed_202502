import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { v4 as uuidv4 } from 'uuid';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async uploadFile(imageFile: File, username: string) {
    const fileName = uuidv4();
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile);
      .then(response=>{
        return response;
      })
      .catch(error=>console.error(error))

    
  }
  getImageUrl(fullPath:string){
    return '${SUPABASE_URL}/storage/v1/object/public/${fullPath}';
  }
}
