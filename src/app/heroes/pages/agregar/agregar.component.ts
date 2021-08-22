import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    al_img: ''
  };
  publushers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]


  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroePorId(id))
    ).subscribe(heroe => this.heroe = heroe);

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroesService.updateHeroe(this.heroe).subscribe(heroe =>
        this.mostrarSnackbar('Registro actualizado'))
    } else {
      // Crear
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/edit/', heroe.id]);
        this.mostrarSnackbar('Registro creado');
      })
    }
  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '22%',
      data: { ...this.heroe }
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.deleteHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
              this.mostrarSnackbar('Registro eliminado');
            })
        }
      }
    )
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
