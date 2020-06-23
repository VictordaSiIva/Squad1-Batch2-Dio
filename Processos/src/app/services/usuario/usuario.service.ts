import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/usuario.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getProcessos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario`, options)
      .pipe(tap(data => data))
  }

  getProcesso(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/${id}`, options)
      .pipe(tap(data => data))
  }

  salvar(usuario: Usuario): Observable<any> {


    if (usuario.id === '') {
      return this.http.post(`${environment.apiUrl}/usuario`, usuario, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/usuario`, usuario, options)
      .pipe(tap(data => { data }))
    }
  }

  deletar(id: string) {
    return this.http.delete(`${environment.apiUrl}/usuario/${id}`, options)

  }
}
