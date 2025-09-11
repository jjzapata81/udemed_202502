import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class Storage {
  supabaseUrl = 'https://juitpvqvrrzfhdffjvzs.supabase.co'
  supabase = createClient(this.supabaseUrl, SUPABASE_KEY)

  async uploadFile(imageFile: File, username: string) { // Esta funcion no era asincrona pero al hacer un llamado de una funcion asincrona dentro de otra, esta tambien debe ser asincrona y se coloca el async
    // const imageFile = event.target.files[0]

    const fileName = uuidv4(); // Genera un nombre unico para el archivo

    const { data, error } = await this.supabase.storage // Esta es una función asíncrona, por eso tiene await
      .from('instapic') // Nombre del bucket
      .upload(`${username}/${fileName}`, imageFile) // Nombre del archivo con el cual yo lo guardo y el archivo que estoy subiendo
    // se usa el {username} para almacenar segun el usuario que suba la imagen

    console.log('data', data);
    console.log('error', error);
  }

}
