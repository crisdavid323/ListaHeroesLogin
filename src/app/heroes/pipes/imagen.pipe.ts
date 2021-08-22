import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
  // pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if (!heroe.id && !heroe.al_img){
      return 'assets/no-image.png';
    }else if (heroe.al_img){
      return heroe.al_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }

  }

}
