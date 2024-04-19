import {  Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../interfaces/pipes/interfaces';

@Pipe({
  name: 'buscador',
  standalone:true
})

export class BuscadorPipe implements PipeTransform {

  transform(listCategorias: Categoria[], valorBuscado: any): any {
    if( !valorBuscado){
       return  listCategorias
    }
        const encontrados =  listCategorias.filter( categoria =>  {
            if(  String( categoria.nombreCategoria).indexOf(valorBuscado) > -1 ){
                return categoria
            }
            return null
          } )

    return encontrados;
  }

}
