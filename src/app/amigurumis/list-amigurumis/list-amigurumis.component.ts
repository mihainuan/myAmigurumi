import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { AmigurumisService } from 'src/app/core/amigurumis.service';
import { Amigurumi } from 'src/app/shared/models/amigurumi.model';
import { ConfigPrams } from 'src/app/shared/models/config-params.model';

@Component({
  selector: 'amg-list-amigurumis',
  templateUrl: './list-amigurumis.component.html',
  styleUrls: ['./list-amigurumis.component.scss']
})
export class ListAmigurumisComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  // Inicialização de parâmetros HTTP
  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };

  // Inputs para lista e filtros
  amigurumis: Amigurumi[] = [];
  filtrosListagem: FormGroup;
  categorias: Array<string>;

  constructor(
    private amigurumisService: AmigurumisService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    // Inicializa valores de filtros (reset)
    this.filtrosListagem = this.fb.group({
      nome: [''],
      categoria: ['']
    });

    // Método para captar alterações no input de pesquisa
    this.filtrosListagem.get('nome').valueChanges
      .pipe(debounceTime(420))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });

    // Método para captar alterações no menu de categorias
    this.filtrosListagem.get('categoria').valueChanges.subscribe((val: string) => {
      if (val) {
        this.config.campo = { tipo: 'categoria', valor: val };
        this.resetarConsulta();
      } else {
        this.config = {};
        this.resetarConsulta();
      }
    });

    // Array de Categorias
    this.categorias = [
      'Animais',
      'Filmes',
      'Natureza',
      'Natal',
      'Pessoas',
      'Pokemóns',
      'Outros'
    ];

    // Inicializar a lista de Amigurumis
    this.listarAmigurumis();
  }

  // Scroller
  onScroll(): void {
    console.log('Scroller ON...');
    this.listarAmigurumis();
  }

  // Abrir Detalhe de Amigurumi (por id)
  abrir(id: number): void {
    this.router.navigateByUrl('/amigurumis/' + id);
  }

  // Listar e concatenar 6 Amigurumis a cada nova chamada (config)
  private listarAmigurumis(): void {
    this.config.pagina++;
    this.amigurumisService.listar(this.config)
      .subscribe((amigurumis: Amigurumi[]) => this.amigurumis.push(...amigurumis));
  }

  // Limpar Array de Amigurumis (lista)
  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.amigurumis = [];
    this.listarAmigurumis();
  }
}
