function calendarioNain() {
  return {
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),

    diasHeader: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    nombresMes: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],

    get nombreMesActual() {
      return this.nombresMes[this.mes];
    },

    get espaciosVacios() {
      let d = new Date(this.año, this.mes, 1).getDay();
      let vacios = (d === 0) ? 6 : d - 1;
      return Array.from({ length: vacios });
    },

    get diasEnMes() {
      let cantidad = new Date(this.año, this.mes + 1, 0).getDate();
      return Array.from({ length: cantidad }, (_, i) => i + 1);
    },

    mesSiguiente() {
      if (this.mes === 11) { this.mes = 0; this.año++; }
      else this.mes++;
    },

    mesAnterior() {
      if (this.mes === 0) { this.mes = 11; this.año--; }
      else this.mes--;
    },

    obtenerClaseUV(d) {
      let ds = new Date(this.año, this.mes, d).getDay();
      if (ds === 0) return 'uv-domingo';
      if (ds === 1 || ds === 2) return 'uv24';
      if (ds === 3 || ds === 4) return 'uv25';
      if (ds === 5 || ds === 6) return 'uv26';
    },

    obtenerTextoUV(d) {
      let ds = new Date(this.año, this.mes, d).getDay();
      if (ds === 0) return 'Casos Especiales';
      if (ds === 1 || ds === 2) return 'UV 24';
      if (ds === 3 || ds === 4) return 'UV 25';
      if (ds === 5 || ds === 6) return 'UV 26';
    },

    irAlFormulario(d) {
      const uvTexto = this.obtenerTextoUV(d);
      window.location.href =
        `formulario.html?dia=${d}&mes=${this.nombreMesActual}&uv=${encodeURIComponent(uvTexto)}`;
    }
  }
}
function renderizarHorariosComunes(unidad) {
    const contenedor = document.getElementById('contenedor-grid-horas');
    const instruccion = document.getElementById('instruccion-horario');

    const bloquesHorarios = ["17:00 - 18:00", "10:00 - 19:00", "19:00 - 20:00, 20:00 - 21:00, 21:00 - 22:00, 22:00 - 23:00 "];

    contenedor.innerHTML = "";

    bloquesHorarios.forEach(hora => {
        const label = document.createElement('label');
        label.className = 'hora-card';
        label.innerHTML = `
            <input type="radio" name="hora_atencion" value="${hora}" required>
            <div class="hora-contenido">
                <span class="reloj-icon">🕒</span> ${hora}
            </div>
        `;
        contenedor.appendChild(label);
    });

    instruccion.innerText = `Seleccione su bloque para ${unidad.toUpperCase()}:`;
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const uvSeleccionada = urlParams.get('uv') || "Casos Especiales";
    
    renderizarHorariosComunes(uvSeleccionada);
};

function generarBotonesHoras(uv) {
    const seccionHoras = document.getElementById('seccion-horas'); 
    const contenedor = document.getElementById('contenedor-grid-horas');
    
    seccionHoras.classList.remove("tema-uv24", "tema-uv25", "tema-uv26", "tema-especiales");

    if (uv.includes("24")) seccionHoras.classList.add("tema-uv24");
    else if (uv.includes("25")) seccionHoras.classList.add("tema-uv25");
    else if (uv.includes("26")) seccionHoras.classList.add("tema-uv26");
    else seccionHoras.classList.add("tema-especiales");

}


  (function() {
    emailjs.init("TU_PUBLIC_KEY_AQUI");
  })();

  document.getElementById('form-reclamo').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const btn = document.getElementById('btn-enviar-todo');
    btn.innerText = 'Enviando Reporte Completo...';
    btn.disabled = true;

    const serviceID = 'default_service'; 
    const templateID = 'TU_TEMPLATE_ID_AQUI';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.innerText = '¡Datos Enviados!';
        alert('¡Gracias! Se han enviado los datos personales, el horario y las 4 encuestas.');
        this.reset(); 
        document.getElementById('vista-previa').innerHTML = ""; 
      }, (err) => {
        alert("Error al enviar: " + JSON.stringify(err));
        btn.innerText = 'Error al enviar';
      })
      .finally(() => {
        btn.disabled = false;
      });
  });

function irAlFormulario(d) {
  
    const fechaTexto = `${d} de ${this.nombreMesActual} ${this.año}`;
    
    const inputOculto = document.getElementById('fecha_reporte_input');
    if (inputOculto) {
        inputOculto.value = fechaTexto;
    }

    const uvTexto = this.obtenerTextoUV(d);
    
    document.getElementById('fecha-formulario').innerText = "Reporte para el " + fechaTexto;
    document.getElementById('form-reclamo').scrollIntoView({ behavior: 'smooth' });
}