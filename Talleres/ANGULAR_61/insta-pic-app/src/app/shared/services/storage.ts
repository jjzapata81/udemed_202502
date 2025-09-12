import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environment/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class Storage {


supabaseUrl = SUPABASE_URL
supabaseKey = SUPABASE_KEY;
private supabase = createClient(this.supabaseUrl, this.supabaseKey)

async uploadFile(imageFile:File, username: string) {
    //
    const fileName=  uuidv4();
    const { data, error } = await this.supabase.storage
    .from('instapic')
    .upload(`${username}/${fileName}`, imageFile);
    console.log(data);
    console.log(error);
}

}