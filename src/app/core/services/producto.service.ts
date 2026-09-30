import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto, ProductoApi } from '../interfaces/producto.interface';

interface RespuestaApi {
  meals: ProductoApi[] | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly urlApi =
    'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

  constructor(private http: HttpClient) {}

  obtenerProductos(limite: number = 4): Observable<Producto[]> {
    return this.http.get<RespuestaApi>(this.urlApi).pipe(
      map((respuesta: RespuestaApi): Producto[] =>
        (respuesta.meals ?? [])
          .slice(0, limite)
          .map((item: ProductoApi): Producto => ({
            id: Number(item.idMeal),
            nombre: item.strMeal,
            precio: 99,
            imagen: item.strMealThumb,
            descripcion: item.strInstructions
          }))
      )
    );
  }
}