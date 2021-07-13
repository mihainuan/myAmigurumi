import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AmigurumisService } from 'src/app/core/amigurumis.service';
import { Amigurumi } from 'src/app/shared/models/amigurumi.model';
import { Alerta } from 'src/app/shared/models/alerta.model';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'amg-view-amigurumis',
  templateUrl: './view-amigurumi.component.html',
  styleUrls: ['./view-amigurumi.component.scss']
})
export class ViewAmigurumiComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  amigurumi: Amigurumi;
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private amigurumisService: AmigurumisService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/amigurumis/novo/' + this.id);
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.amigurumisService.excluir(this.id)
        .subscribe(() => this.voltar());
      }
    });
  }

  private visualizar(): void {
    this.amigurumisService.visualizar(this.id).subscribe((amigurumi: Amigurumi) => this.amigurumi = amigurumi);
  }

  voltar(): void {
    this.router.navigateByUrl('/amigurumis');
  }

}
