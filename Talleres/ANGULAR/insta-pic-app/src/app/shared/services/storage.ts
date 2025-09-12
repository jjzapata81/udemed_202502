import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'


@Injectable({
  providedIn: 'root'
})
export class Storage {

const supabaseUrl = 'https://icmszpeppmuiovwdjurj.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
  
uploadFile() {
    const avatarFile = event.target.files[0]
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload('public/avatar1.png', avatarFile)
  }
}
