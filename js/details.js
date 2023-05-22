

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
      eventosPasados: [],
      arrayEventosNombre: [],

      //Details
      detail: [],



      

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

       this.arrayEventosNombre = this.arrayEventos.map (elemento => elemento.name )
       console.log(this.arrayEventosNombre)

       console.log(document.location)
       console.log(location.search)

       const locationSearch = location.search
       console.log(locationSearch)

       const params = new URLSearchParams (locationSearch)
       console.log(params)

       const id = params.get ('id')
       console.log(id)

       this.detail = this.arrayEventos.find (elemento => elemento._id == id)
       console.log (this.detail)


       document.title = `Details | ${this.detail.name }`




    })
    .catch( error => console.log (error))


    },

    methods:{

      




    },

    computed:{




    },

  
} ) 



app.mount("#app")