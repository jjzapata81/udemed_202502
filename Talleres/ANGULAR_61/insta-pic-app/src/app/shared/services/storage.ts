import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class Storage {

  private supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

   uploadFile(imageFile:File, username:string) {
  
    const fileName = uuidv4();
    console.log("2- llamando a supabase")
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile)
      .then((response) => {
        console.log(response);

        if (response.data) {
          return response.data.fullPath;
        }
        if (response.error) {
          throw response.error;
        }
        console.log("3- respuesta de supabase")
        
      });
      //console.log("4 - servicio de storage finalizado")
  }
  getUrl(fullPath:string) {
    return `${SUPABASE_URL}storage/v1/object/public/${fullPath}`
  }


}
