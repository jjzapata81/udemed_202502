import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '../../../environments/environments';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  supabaseUrl = 'https://zpjpouaviwoohlwcgrns.supabase.co'
  supabase = createClient(this.supabaseUrl, SUPABASE_KEY)

  /*async uploadFile(imageFile:File, username:string){
    //const imageFile = event.target.files[0]
    const fileName = uuidv4();
    const { data, error } = await this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile);

      console.log(data);
      console.log(error);
    }*/

    
  async uploadFile(imageFile:File, username:string){
    //const imageFile = event.target.files[0]
    const fileName = uuidv4();
    console.log('Desde el servicio');
    return  this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile)
      .then(response => {return response})
      .catch(error => console.log(error));
      }

  getimageUrl(fullPath:string){
    return `${this.supabaseUrl}/storage/v1/object/public/${fullPath}`;
  }
}