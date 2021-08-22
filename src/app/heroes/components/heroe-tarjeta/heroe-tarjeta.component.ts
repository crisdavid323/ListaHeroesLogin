import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent implements OnInit {


  @Input() heroe!: Heroe;

  constructor( private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    
     
  }

}
