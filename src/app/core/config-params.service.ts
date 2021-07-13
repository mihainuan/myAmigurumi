import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigPrams } from '../shared/models/config-params.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigPrams): HttpParams {

    let httpParams = new HttpParams();

    // Parâmetro de página
    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    }

    // Parâmetro de Limite
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString());
    }

    // Parâmetro Query de pesquisa (texto)
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa);
    }

    // Parâmetro Query de tipoe e campo (texto)
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }

    // Ordenação padrão (mais recentes)
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');

    return httpParams;
  }
}
