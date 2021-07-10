import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amigurumi } from '../shared/models/amigurumi.model';
import { ConfigPrams } from '../shared/models/config-params.model';
import { ConfigParamsService } from './config-params.service';

const API_Url = 'http://localhost:3000/amigurumis/';

@Injectable({
  providedIn: 'root'
})
export class AmigurumisService {

  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService) { }

  salvar(amigurumi: Amigurumi): Observable<Amigurumi> {
    return this.http.post<Amigurumi>(API_Url, amigurumi);
  }

  editar(amigurumi: Amigurumi): Observable<Amigurumi> {
    return this.http.put<Amigurumi>(API_Url + amigurumi.id, amigurumi);
  }

  listar(config: ConfigPrams): Observable<Amigurumi[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Amigurumi[]>(API_Url, {params: configPrams});
  }

  visualizar(id: number): Observable<Amigurumi> {
    return this.http.get<Amigurumi>(API_Url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(API_Url + id);
  }
}