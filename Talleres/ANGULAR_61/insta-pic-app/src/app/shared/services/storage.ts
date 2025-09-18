import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment.dev';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class Storage {

  private supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  uploadFile(imageFile:File, username:string) {
    const fileName = uuidv4();
    console.log("2 - Llamando a supabase")
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile)
      .then(response=>{
        console.log(response);
        console.log("3 - Supabase responde");
        if(response.data){
          return response.data.fullPath;
        }
        throw response.error;
      });
    //console.log("4 - Servicio storage termina");
  }

  getUrl(fullPath:string){
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPath}`
  }

}
