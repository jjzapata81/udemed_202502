class Jugador {
  constructor(nombre, hpInicial) {
    this.nombre = nombre;
    this.hp = hpInicial;
    this.hpMax = hpInicial;
  }

  recibirDaño(cantidad) {
    this.hp -= cantidad;
    if (this.hp < 0) this.hp = 0;
  }

  estaVivo() {
    return this.hp > 0;
  }
}


class UI {
  constructor() {
    this.el = {
      hp1: document.getElementById("hp1"),
      hp2: document.getElementById("hp2"),
      turno: document.getElementById("turno"),
      log: document.getElementById("log"),
      btnStart: document.getElementById("btnStart"),
      btnAttack: document.getElementById("btnAttack"),
      btnReset: document.getElementById("btnReset"),
      n1: document.getElementById("n1"),
      n2: document.getElementById("n2"),
    };
  }

  actualizar(j1, j2, turno, enCurso) {
    this.el.hp1.textContent = j1.hp;
    this.el.hp2.textContent = j2.hp;
    this.el.turno.textContent = enCurso
      ? `Turno: ${turno.nombre}`
      : "Turno: —";
  }

  mostrarMensaje(msg) {
    this.el.log.textContent = msg;
  }
}

class Juego {
  constructor(ui) {
    this.ui = ui;
    this.j1 = new Jugador("Jugador 1", 20);
    this.j2 = new Jugador("Jugador 2", 20);
    this.turno = null;
    this.enCurso = false;

    this.ui.el.btnStart.addEventListener("click", () => this.comenzar());
    this.ui.el.btnAttack.addEventListener("click", () => this.atacar());
    this.ui.el.btnReset.addEventListener("click", () => this.reiniciar());

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.enCurso && !this.ui.el.btnAttack.disabled) {
        this.atacar();
      }
    });

    this.actualizarUI();
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  comenzar() {
    this.j1 = new Jugador(this.ui.el.n1.value.trim() || "Jugador 1", 20);
    this.j2 = new Jugador(this.ui.el.n2.value.trim() || "Jugador 2", 20);
    this.turno = Math.random() < 0.5 ? this.j1 : this.j2;
    this.enCurso = true;
    this.ui.el.btnAttack.disabled = false;
    this.ui.mostrarMensaje(`¡Comienza ${this.turno.nombre}!`);
    this.actualizarUI();
  }

  atacar() {
    if (!this.enCurso) return;
    const atacante = this.turno;
    const defensor = atacante === this.j1 ? this.j2 : this.j1;

    const daño = this.rand(2, 6);
    defensor.recibirDaño(daño);

    this.ui.mostrarMensaje(
      `${atacante.nombre} ataca e inflige ${daño} de daño a ${defensor.nombre}.`
    );

    if (!defensor.estaVivo()) {
      this.enCurso = false;
      this.ui.el.btnAttack.disabled = true;
      this.ui.mostrarMensaje(`¡${atacante.nombre} gana!`);
      this.ui.el.turno.textContent = "Turno: —";
      return;
    }

    this.turno = defensor;
    this.actualizarUI();
  }

  reiniciar() {
    alert("Disponible en la próxima versión... Por favor, recarga la página.");
  }

  actualizarUI() {
    this.ui.actualizar(this.j1, this.j2, this.turno, this.enCurso);
  }
}

const ui = new UI();
new Juego(ui);
