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

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  amigurumis: Amigurumi[] = [];
  filtrosListagem: FormGroup;
  categorias: Array<string>;

  constructor(
    private amigurumisService: AmigurumisService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      nome: [''],
      categoria: ['']
    });

    this.filtrosListagem.get('nome').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('categoria').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'categoria', valor: val};
      this.resetarConsulta();
    });

    this.categorias = ['Personagens (Filmes)', 'Animais', 'Pessoas', 'Natureza', 'Outros'];

    this.listarAmigurumis();
  }

  onScroll(): void {
    this.listarAmigurumis();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/amigurumis/' + id);
  }

  private listarAmigurumis(): void {
    this.config.pagina++;
    this.amigurumisService.listar(this.config)
      .subscribe((amigurumis: Amigurumi[]) => this.amigurumis.push(...amigurumis));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.amigurumis = [];
    this.listarAmigurumis();
  }
}