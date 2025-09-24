import { Component, signal } from '@angular/core';
import { EjemploSimpleComponent } from './ejemplo-simple.component';

@Component({
  selector: 'app-root',
  imports: [EjemploSimpleComponent],
  template: `
    <h1>Proyecto de Ciclos de Vida</h1>
    <app-ejemplo-simple></app-ejemplo-simple>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ciclos-vida-demo');
}
