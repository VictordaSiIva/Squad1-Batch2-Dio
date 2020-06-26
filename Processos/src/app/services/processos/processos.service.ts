import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Processos } from 'src/app/shared/processos.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {

  constructor(private http: HttpClient) { }

  getProcessos(): Observable<Processos[]> {
    return this.http.get<Processos[]>(`${environment.apiUrl}/processo`, options)
      .pipe(tap(data => data))
  }

  getProcesso(id: string) {
    return this.http.get<Processos>(`${environment.apiUrl}/processo/${id}`, options)
      .pipe(tap(data => data))
  }

  salvar(processo: Processos): Observable<any> {


    if (processo.id === '') {
      return this.http.post(`${environment.apiUrl}/processo`, processo, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/processo`, processo, options)
      .pipe(tap(data => { data }))
    }
  }

  deletar(id: string) {
    return this.http.delete(`${environment.apiUrl}/processo/${id}`, options)

  }

}
