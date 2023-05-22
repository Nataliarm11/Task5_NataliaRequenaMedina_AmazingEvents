const {createApp} = Vue

/* console.log (Vue); //Objeto de Vue */

 /*  --> You are running a development build of Vue.
Make sure to use the production build (*.prod.js) when deploying for production. */

const app = createApp( {

  //en data se encuentran las propiedades reactivas
  data(){

    return {
      //Eventos
      arrayDataDeEventosConCurrentDate: [],
      arrayEventos: [],
      eventosFuturos: [],
      arrayCategoryFuturo: [],
      eventosPasados: [],
      arrayCategoryPasado: [],
      eventoMayorAsistencia: "",
      eventoMenorAsistencia: "",
      eventoMayorCapacidad:"",
      // revenuesEventsUpcoming: {},
      revenuesUpcoming: {},
      attendanceUpcoming: {},
      revenuesPast:{},
      attendancePast:{},




      

    }

  },


  //Lo que queremos que se ejecute una sola vez creada nuestra funcion
  created (){

    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
    .then ( response => response.json ())
    .then ( data => {
      console.log(data)

      this.arrayDataDeEventosConCurrentDate = data
      console.log(this.arrayDataDeEventosConCurrentDate)

      this.arrayEventos=data.events
      console.log (this.arrayEventos)

      this.eventosFuturos=this.arrayEventos.filter(events => events.date > data.currentDate)
      console.log(this.eventosFuturos)

      this.arrayCategoryFuturo =  Array.from(new Set (this.eventosFuturos.map(evento=>evento.category)))
      console.log (this.arrayCategoryFuturo)

      this.eventosPasados=this.arrayEventos.filter(events => events.date < data.currentDate)
      console.log(this.eventosPasados)

      this.arrayCategoryPasado =  Array.from(new Set (this.eventosPasados.map(evento=>evento.category)))
      console.log (this.arrayCategoryPasado)


      this.mayorAsistencia()
      console.log(this.mayorAsistencia)

      this.menorAsistencia()
      console.log(this.menorAsistencia)
  
      this.mayorCapacidad()
      console.log(this.mayorCapacidad)

      this.CalcularUpcoming()
      console.log(this.CalcularUpcoming)

      this.CalcularPast()
      console.log(this.CalcularPast)

    })
    .catch( error => console.log (error))


    },

    methods:{

      //Evento con mayor porcentaje de asistencia - Events with the highest percentage of attendance (funcion)

      mayorAsistencia() {
        let porcentaje = 0;
        let nombre = " ";

        this.eventosPasados.forEach (event => {
          let valor = ( event.assistance / event.capacity ) * 100;
          if (valor > porcentaje) {
            porcentaje = valor;
            nombre = event.name;
      
    }
    this.eventoMayorAsistencia = ` ${nombre} , ${porcentaje.toFixed(2)}%`;
    console.log(this.eventoMayorAsistencia)
    
  });  
  
},
  // Evento con menor porcentaje de asistencia - Events with the lowest percentage of attendance ( funcion)
      menorAsistencia () {
        let porcentaje = 100;
        let nombre = " ";

        this.eventosPasados.forEach ( event => {
          let valor = ( event.assistance / event.capacity ) * 100;
          if (valor < porcentaje) {
            porcentaje = valor;
            nombre = event.name;
            
          }
          this.eventoMenorAsistencia =` ${nombre} , ${porcentaje.toFixed(2)}%`;
          console.log(this.eventoMenorAsistencia)
      
    })




},

// Evento con mayor capacidad - Event with larger capacity (funcion)
      mayorCapacidad (events) {
        let capacidad = 0;
        let nombre = " ";

        this.eventosPasados.forEach ( ( event ) => {
          if (event.capacity > capacidad ) {
          capacidad = event.capacity;
          nombre = event.name;
          
        }
      })
      this.eventoMayorCapacidad=` ${nombre} , ${capacidad}`;
      console.log(this.eventoMayorCapacidad)

},

// TABLA UPCOMING
      CalcularUpcoming(){
        this.arrayCategoryFuturo.forEach (category => {
          const categoryEvent = this.eventosFuturos.filter ( event => event.category === category);

          let totalUpcomingRevenues = 0;
          let totalUpcomingAttendance = 0;
          let totalEvents = categoryEvent.length;
          console.log(totalEvents)
          
          categoryEvent.forEach(event => {
            totalUpcomingRevenues += event.price * (event.estimate || event.assistance);
          })
          categoryEvent.forEach (event => {
            totalUpcomingAttendance += (((event.assistance || event.estimate)/event.capacity) * 100)/totalEvents ;

          })
          this.revenuesUpcoming[category] = totalUpcomingRevenues.toLocaleString();
          console.log(this.revenuesUpcoming[category])

          this.attendanceUpcoming[category]=totalUpcomingAttendance.toFixed(2);
          console.log(this.attendanceUpcoming[category])

        })
      },


      //TABLA PAST

      CalcularPast(){
        this.arrayCategoryPasado.forEach (category => {
          const categoryEvent = this.eventosPasados.filter ( event => event.category === category);

          let totalPastRevenues = 0;
          let totalPastAttendance = 0;
          let totalEvents = categoryEvent.length;
          console.log(totalEvents)
          
          categoryEvent.forEach(event => {
            totalPastRevenues += event.price * (event.estimate || event.assistance);
          })
          categoryEvent.forEach (event => {
            totalPastAttendance += (((event.assistance || event.estimate)/event.capacity) * 100)/totalEvents ;

          })
          this.revenuesPast[category] = totalPastRevenues.toLocaleString();
          console.log(this.revenuesPast[category])

          this.attendancePast[category]=totalPastAttendance.toFixed(2);
          console.log(this.attendancePast[category])

        })
      },
      
      

    }
  
} ) 



app.mount("#app")

