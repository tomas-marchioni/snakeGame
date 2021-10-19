   const COLUMNAS = 40
    const FILAS = 30
    const LADO = 20
    const ANCHO_CANVAS = COLUMNAS * LADO
    const ALTO_CANVAS = FILAS * LADO

    // variables de escenario
    let serpiente
    let comida

    // variables de control
    let arriba
    let derecha
    let izquierda
    let abajo

    // variables de entorno html
    let canvas

    function setup() {
      frameRate(10)
      canvas = createCanvas(ANCHO_CANVAS, ALTO_CANVAS)
      windowResized()
      serpiente = new Serpiente()
      posicionarComida()
      arriba = createVector(0, -1)
      abajo = createVector(0, 1)
      derecha = createVector(1, 0)
      izquierda = createVector(-1, 0)
    }

    function windowResized() {
      let escala = windowWidth / width
      if (escala >= 1) {
        return
      }
      canvas.style("width", width * escala + "px")
      canvas.style("height", height * escala + "px")
    }

    function draw() {
      background("black")
      serpiente.dibujar()
      fill("crimson")
      rect(comida.x * LADO, comida.y * LADO, LADO, LADO)
      if (serpiente.posicion.dist(comida) == 0) {
        serpiente.tamaño++
        posicionarComida()
      }
    }

    function keyPressed() {
      if (!isLooping()) {
        juegoNuevo()
      }
      switch (keyCode) {
        case UP_ARROW:
          if (serpiente.cola.length && serpiente.aceleracion == abajo) {
            break
          }
          serpiente.aceleracion = arriba
          break;
        case RIGHT_ARROW:
          if (serpiente.cola.length && serpiente.aceleracion == izquierda) {
            break
          }
          serpiente.aceleracion = derecha
          break;
        case DOWN_ARROW:
          if (serpiente.cola.length && serpiente.aceleracion == arriba) {
            break
          }
          serpiente.aceleracion = abajo
          break;
        case LEFT_ARROW:
          if (serpiente.cola.length && serpiente.aceleracion == derecha) {
            break
          }
          serpiente.aceleracion = izquierda
          break;
        default:
          break;
      }
    }

    function posicionarComida() {
      comida = createVector(
        int(random(COLUMNAS)),
        int(random(FILAS))
      )
    }

    function juegoNuevo() {
      serpiente = new Serpiente()
      loop()
    }

    function juegoTerminado() {
      if (serpiente.sistemaDeChoques()) {
        textAlign(CENTER, CENTER)
        textSize(50)
        text("Juego terminado", width / 2, height / 2)
        noLoop()
      }
    }

    function Serpiente() {
      this.posicion = createVector(
        COLUMNAS / 2,
        FILAS / 2
      )
      this.aceleracion = createVector()
      this.cola = []
      this.tamaño = 0
      this.sistemaDeChoques = function() {
        if (this.posicion.x < 0 || this.posicion.y < 0) {
          return true
        }
        if (this.posicion.x >= COLUMNAS || this.posicion.y >= FILAS) {
          return true
        }
        for (const c of this.cola) {
          if (this.posicion.equals(c)) {
            return true
          }
        }
        return false
      }
      this.dibujar = function() {
        fill("white")
        rect(
          constrain(this.posicion.x, 0, COLUMNAS - 1) * LADO,
          constrain(this.posicion.y, 0, FILAS - 1) * LADO,
          LADO,
          LADO
        )
        for (const c of this.cola) {
          rect(
            constrain(c.x, 0, COLUMNAS - 1) * LADO,
            constrain(c.y, 0, FILAS - 1) * LADO,
            LADO,
            LADO
          )
        }
        juegoTerminado()
        this.cola.push(this.posicion.copy())
        if (this.cola.length > this.tamaño) {
          this.cola.splice(0, 1)
        }
        this.posicion.add(this.aceleracion)
      }
    }
/* Bton Dark mode*/
    let darkMode;

    if(localStorage.getItem("dark-mode")){
        darkMode = localStorage.getItem("dark-mode");
    } else {
        darkMode = "light";
    }
    
    localStorage.setItem("dark-mode", darkMode);
    
    $(() => {
        if(localStorage.getItem("dark-mode") == "dark"){
            $("body").addClass("dark");
            $("#boton-dark-mode").hide();
            $("#boton-light-mode").show();
        } else {
            $("#boton-light-mode").hide();
            $("#boton-dark-mode").show();
        }
    
        $("#boton-dark-mode").click(() => {
            $("#boton-dark-mode").hide();
            $("#boton-light-mode").show();
            $("body").addClass("dark");
            localStorage.setItem("dark-mode", "dark");
        })
    
        $("#boton-light-mode").click(() => {
            $("#boton-light-mode").hide();
            $("#boton-dark-mode").show();
            $("body").removeClass("dark");
            localStorage.setItem("light-mode", "light");
        })
    })