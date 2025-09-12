import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environments';
import {v4 as uuidv4} from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class Storage {

  constructor() { }

private supabaseUrl = SUPABASE_URL
supabaseKey = SUPABASE_KEY
supabase = createClient(this.supabaseUrl, this.supabaseKey)
  
async uploadFile(imageFile:File, username:string) {
    //const avatarFile = event.target.files[0]
    const fileName= uuidv4() ;
    const { data, error } = await this.supabase.storage
      .from('ejemplo')
      .upload(`${username}/${fileName}.png`, imageFile)
    console.log('data', data)
    console.log('error', error)
  }
}
