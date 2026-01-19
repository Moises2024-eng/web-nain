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
