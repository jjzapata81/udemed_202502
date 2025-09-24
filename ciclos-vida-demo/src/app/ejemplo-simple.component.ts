import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ejemplo-simple',
  standalone: true,
  templateUrl: './ejemplo-simple.component.html',
  styleUrls: ['./ejemplo-simple.component.css']
})
export class EjemploSimpleComponent implements OnInit, OnDestroy {
  
  mensaje = '';
  contador = 0;
  private timer: any;

  ngOnInit(): void {
    this.mensaje = 'Componente inicializado en OnInit';
    console.log('ngOnInit ejecutado - Componente iniciado');
    console.log('Iniciando timer...');

    this.timer = setInterval(() => {
      this.contador++;
      console.log('Contador:', this.contador);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.mensaje = 'Componente sera destruido';
    console.log('ngOnDestroy ejecutado - Limpiando recursos');
    console.log('Deteniendo timer...');

    if (this.timer) {
      clearInterval(this.timer);
      console.log('Timer limpiado');
    }
  }
}