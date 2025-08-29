import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  jugadores = [
    { nombre: 'Jugador 1', vida: 100 },
    { nombre: 'Jugador 2', vida: 100 }
  ];

  turno = 0; // 0 = Jugador 1, 1 = Jugador 2
  ganador: string | null = null;

  atacar() {
    if (this.ganador) return;

    const atacante = this.turno;
    const defensor = atacante === 0 ? 1 : 0;

    const dano = Math.floor(Math.random() * 16) + 5;
    this.jugadores[defensor].vida -= dano;

    if (this.jugadores[defensor].vida <= 0) {
      this.ganador = this.jugadores[atacante].nombre;
    }

    this.turno = defensor;
  }

  reiniciar() {
    this.jugadores = [
      { nombre: 'Jugador 1', vida: 100 },
      { nombre: 'Jugador 2', vida: 100 }
    ];
    this.turno = 0;
    this.ganador = null;
  }
}
