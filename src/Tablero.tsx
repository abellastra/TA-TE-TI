import React, { useState } from "react";

function Tablero() {
  const [tabla, setTabla] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turno, setTurno] = useState("X");
  const [ganador, setGanador] = useState(null);
  const [X, setX] = useState(0);
  const [O, setO] = useState(0);

  const combinacionesGanadoras = [
    // Filas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columnas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];

  function verificadorGanador(tabla) {
    for (let combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (tabla[a] && tabla[a] === tabla[b] && tabla[a] === tabla[c]) {
        console.log(tabla[a]);
        return tabla[a];
      }
    }
    return null;
  }

  function mensajeGanador() {
    if (ganador) {
      return (
        <>
          Felicidades Ganaste <br />
          {ganador}
        </>
      );
    }
    if (tabla.every((casilla) => casilla !== "")) {
      return "empate";
    }
    return `Turno de ${turno}`;
  }

  function actulizarTablero(index) {
    if (tabla[index] !== "" || ganador !== null) return;
    const newTabla = [...tabla];
    newTabla[index] = turno;
    const nuevoGanador = verificadorGanador(newTabla);
    setTabla(newTabla);
    setGanador(nuevoGanador);
    setTurno(turno === "X" ? "O" : "X");
    if (nuevoGanador === "X") {
      setX(X + 1);
    }
    if (nuevoGanador === "O") {
      setO(O + 1);
    }
  }
  function Reiniciar() {
    setTabla(["", "", "", "", "", "", "", "", ""]);
    setGanador(null);
    setTurno("X");
  }

  return (
    <div className={`marco `}>
      <h1 className="titulo">TA-TE-TI</h1>
      <div className="contadores">
        <h2 className="contadorX">
          jugador{<br />} X={X}
        </h2>
        <h2 className="contadorO">
          jugador{<br />} O={O}
        </h2>
      </div>
      <p
        className={`mensajeGanador ${
          ganador || tabla.every((casilla) => casilla !== "") ? "centrar" : ""
        }`}
      >
        {mensajeGanador()}
      </p>

      <div>
        <div
          className={`tablero ${
            ganador
              ? ganador === "X"
                ? "xRojo"
                : "oAzul"
              : turno === "X"
              ? "xRojo"
              : "oAzul"
          }`}
        >
          {tabla.map((valor, index) => (
            <button
              key={index}
              className="casilla"
              onClick={() => {
                actulizarTablero(index);
              }}
            >
              {valor}
            </button>
          ))}
        </div>
        <button className="reiniciar" onClick={Reiniciar}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
export default Tablero;
