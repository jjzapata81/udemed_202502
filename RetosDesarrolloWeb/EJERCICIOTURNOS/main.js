class Jugador {
  constructor(nombre, vida) {
    this.nombre = nombre;
    this.vida = vida;
  }

  // Utilizamos la biblioteca Math para calcular el daño y el método random() para obtener un número aleatorio
  atacar(oponente) {
    const dmg = Math.floor(Math.random() * 16) + 5;
    oponente.vida -= dmg;

    alert(
      `${this.nombre} ataca a ${oponente.nombre} y le causa ${dmg} de daño.\n` +
      `Vida de ${oponente.nombre}: ${Math.max(0, oponente.vida)}`
    );

    if (oponente.vida <= 0) {
      alert(`${oponente.nombre} ha sido derrotado.\n¡${this.nombre} es el ganador!`);
      return true;
    }
    return false;
  }
}

class Juego {
  constructor(jugador1, jugador2) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.turno = 0;
  }

  iniciar() {
    alert("EMPIEZA LOS JUEGOS DEL HAMBRE(por turnos)");
    this.siguienteTurno();
  }

  siguienteTurno() {
    const atacante = this.turno % 2 === 0 ? this.jugador1 : this.jugador2;
    const defensor = this.turno % 2 === 0 ? this.jugador2 : this.jugador1;

    prompt(`Turno de ${atacante.nombre}. Presiona ENTER para atacar...`);

    const fin = atacante.atacar(defensor);
    if (!fin) {
      this.turno++;
      this.siguienteTurno();
    }
  }
}
// Esto es una función para manejar la interfaz de usuario
// document.getElementById() sirve para obtener un elemento del DOM por su ID
(function attachUI() {
  const btn = document.getElementById("btn-start");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nombre1 = prompt("Nombre del Jugador 1:", "David") || "Jugador 1";
    const nombre2 = prompt("Nombre del Jugador 2:", "Andrés") || "Jugador 2";

    const jugador1 = new Jugador(nombre1, 100);
    const jugador2 = new Jugador(nombre2, 100);

    const juego = new Juego(jugador1, jugador2);
    juego.iniciar();
  });
})();
