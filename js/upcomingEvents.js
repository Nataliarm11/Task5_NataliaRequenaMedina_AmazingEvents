

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

      //Search
      nameSearch: "",
      filterName: [],

      //Checkbox
      arrayCategory: [],    
      filterCategory: [],
      categoryCheckbox: [],
      checked: [],
      filtradoPorSearch :[],

      

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

      this.arrayCategory =  Array.from(new Set (this.eventosFuturos.map(evento=>evento.category)))
      console.log (this.arrayCategory)




    })
    .catch( error => console.log (error))


    },

    methods:{

      




    },

    computed:{

        filtros (){
         this.categoryCheckbox = [...document.querySelectorAll ("input[type='checkbox']:checked")].map( elemento => elemento.value)
         console.log(this.categoryCheckbox)
         this.filterCategory = this.eventosFuturos.filter (events => this.categoryCheckbox.includes(events.category)||this.categoryCheckbox.length == 0)
         console.log (this.filterCategory)
         this.filterName = this.filterCategory.filter ( events => events.name.toLowerCase().includes(this.nameSearch.toLowerCase()))
         console.log(this.filterName)
        
       } 

      

       
       



    },

  
} ) 



app.mount("#app")