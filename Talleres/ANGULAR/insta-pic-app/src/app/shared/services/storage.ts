import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

  async uploadFile(imageFile: File, username: string) {
    const fileName = uuidv4();
    // const { data, error } = await this.supabase.storage
    //   .from('instapic')
    //   .upload(`${username}/${fileName}`, imageFile);
    console.log('2 - Desde el servicio');
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile)
      .then((response) => {
        console.log('3 - Response', response);
        return response;
      })
      .catch((error) => console.log(error));
    console.log(`4 - Después de llamar a supabase `);
    // console.log(data);
    // console.error(error);
  }

  getImageUrl(fullPath: string) {
    return `${environment.SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
  }
}
