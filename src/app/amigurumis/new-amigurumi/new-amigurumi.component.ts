import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Amigurumi } from 'src/app/shared/models/amigurumi.model';
import { AmigurumisService } from 'src/app/core/amigurumis.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta.model';

@Component({
  selector: 'amg-new-amigurumi',
  templateUrl: './new-amigurumi.component.html',
  styleUrls: ['./new-amigurumi.component.scss']
})
export class NewAmigurumiComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  categorias: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private amigurumiService: AmigurumisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    // id em URL
    this.id = this.activatedRoute.snapshot.params.id;

    // Caso existir ID em URL, passa objeto com dados para edição
    // Caso contrário, cria novo formulário em branco
    if (this.id) {
      this.amigurumiService.visualizar(this.id)
      .subscribe((amigurumi: Amigurumi) => this.criarFormulario(amigurumi));
    } else {
      this.criarFormulario(this.criarAmigurumiEmBranco());
    }

    // Valores em array<string> com Categorias
    this.categorias = [
      'Animais',
      'Filmes',
      'Natureza',
      'Natal',
      'Pessoas',
      'Pokemóns',
      'Outros'
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const amigurumi = this.cadastro.getRawValue() as Amigurumi;
    if (this.id) {
      amigurumi.id = this.id;
      this.editar(amigurumi);
    } else {
      this.salvar(amigurumi);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  // Criar Formulário
  private criarFormulario(amigurumi: Amigurumi): void {
    this.cadastro = this.fb.group({
      nome: [amigurumi.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [amigurumi.urlFoto, [Validators.minLength(10)]],
      criadoEm: [amigurumi.criadoEm, [Validators.required]],
      material: [amigurumi.material],
      altura: [amigurumi.altura],
      largura: [amigurumi.largura],
      peso: [amigurumi.peso],
      categoriaId: [amigurumi.categoriaId, [Validators.required]]
    });
  }

  // Criar novo Amigurumi
  private criarAmigurumiEmBranco(): Amigurumi {
    return {
      id: null,
      nome: null,
      urlFoto: null,
      altura: null,
      largura: null,
      peso: null,
      material: null,
      criadoEm: null,
      categoriaId: null
    } as Amigurumi;
  }

  // Salvar Amigurumi
  private salvar(amigurumi: Amigurumi): void {
    this.amigurumiService.salvar(amigurumi).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo Amigurumi',
          corBtnSucesso: 'primary',
          corBtnCancelar: 'accent',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('amigurumis');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  // Editar Amigurumi
  private editar(amigurumi: Amigurumi): void {
    this.amigurumiService.editar(amigurumi).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('amigurumis'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
