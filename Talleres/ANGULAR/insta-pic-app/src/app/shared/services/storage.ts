import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-sc'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class Storage {

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  async uploadFile(imagefile:File, username:string) {
    //const file = event.target,files[0];
    const fileName = uuidv4();
    const { data, error } = await this.supabase.storage
      .from('instapic')
      .upload(`${username}/avatar1.png`, imagefile)
    console.log(data);
    console.log(error);
  }


}
