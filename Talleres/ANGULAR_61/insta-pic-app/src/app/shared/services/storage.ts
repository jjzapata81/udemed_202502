import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class Storage {

  private supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  uploadPicture(imageFile:File, username:string) {
    return this.uploadFile(imageFile, username, 'instapic')
  }

  uploadAvatar(imageFile:File, username:string) {
    return this.uploadFile(imageFile, username, 'avatar')
  }

  uploadFile(imageFile:File, username:string, bucket:string) {
    const fileName = uuidv4();
    return this.supabase.storage
      .from(bucket)
      .upload(`${username}/${fileName}`, imageFile)
      .then(response=>{
        if(response.data){
          return response.data.fullPath;
        }
        throw response.error;
      });
  }

  getUrl(fullPath:string){
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPath}`
  }

}
