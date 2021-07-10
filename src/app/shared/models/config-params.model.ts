import { CampoGenerico } from './campo-generico.model';

export interface ConfigPrams {
  pagina?: number;
  limite?: number;
  pesquisa?: string;
  campo?: CampoGenerico;
}