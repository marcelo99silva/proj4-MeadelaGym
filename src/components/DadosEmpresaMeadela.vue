<template>
    <div class="ff" style="margin-top:20px">
      
    <h6 class="tituloMeadela">Dados</h6>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Nome:</p>
        <input class="inputEmpresaMeadela" type="text" v-model="nome" readonly>
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Email:</p>
        <input class="inputEmpresaMeadela" type="text" id="email" name="email"  v-model="email">
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Contacto:</p>
        <input class="inputEmpresaMeadela" type="text"   v-model="contato">
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Morada:</p>
        <input class="inputEmpresaMeadela" type="text"  v-model="morada">
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Latitude</p>
        <input class="inputEmpresaMeadela" type="text" v-model="latitude">
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Longitude:</p>
        <input class="inputEmpresaMeadela" type="text"  name="longitude" v-model="longitude" >
        </div>

        <h6 class="tituloMeadela">Horário</h6>
        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Horário semana:</p>
        <input class="inputEmpresaMeadela" type="text"   v-model="horarioSemana">
        </div>

        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Horário sábado:</p>
        <input class="inputEmpresaMeadela" type="text"  v-model="horarioFimSemana">
        </div>
        <!--
        <div class="infoEmpresaMeadela">
        <p class="camposEmpresaMeadela">Logotipo:</p>
        <input class="inputEmpresaMeadela2" type="file">
        </div>
        -->

        <button class="butaoGuardarDados" @click="editarDados()">Guardar alterações</button>
    
    </div>    
  <!-- </div> -->
</template>



<script>
import axios from "axios";

export default {
   components: {

   },
  data() {
    return {
      nome: "",
      email: "",
      contato: "",
      morada: "",
      latitude: "",
      longitude: "",
      horarioSemana: "",
      horarioFimSemana: "",
      altura_ecra: 0
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted(){


    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/empresa?id=1",
 
    })
    .then((response) =>{

      this.nome = response.data[0].nome;
      this.email = response.data[0].email;
      this.contato = response.data[0].contato;
      this.morada = response.data[0].morada;
      this.latitude = response.data[0].latitude;
      this.longitude = response.data[0].longitude;
      this.horarioSemana = response.data[0].horarioSemana;
      this.horarioFimSemana = response.data[0].horarioFimSemana;
    });

    },




  methods: {    
    handleResize() {
      this.altura_ecra = window.innerHeight - 170;
    },

    editarDados(){

            if(this.nome.length > 0 &&
                this.email.length > 0 &&
                this.contato.length > 0 &&
                this.morada.length > 0 &&
                this.latitude &&
                this.longitude &&
                this.horarioSemana.length > 0 &&
                this.horarioFimSemana.length > 0
                ){
                  console.log(this.email)

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/editarDadosEmpresa?id=1",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          // nome: this.nome,
          email: this.email,
          contato: this.contato,
          morada: this.morada,
          latitude: this.latitude,
          longitude: this.longitude,
          horarioSemana: this.horarioSemana,
          horarioFimSemana: this.horarioFimSemana
        }
                
      })
      .then(() => {
        this.$toastr.s("Alterado com sucesso!")
      });


    }else{
      this.$toastr.e("Preencha todos os campos!");
    }
          }
    
  },

};

</script>





<style scoped>

.butaoGuardarDados{
  padding: 7px;
  margin: 50px 10px 50px 0;
  /* border: 1px solid blue; */
  background-color: #757575;
  float: right;
}

.infoEmpresaMeadela{
    display: block ruby;
    margin-left: 20px;
}

.inputEmpresaMeadela{
    width: 400px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 30px;
    border: 1px solid black;
    text-align: center;
}

.inputEmpresaMeadela2{
    width: 400px;
  
    margin-left: 30px;
    border: 1px solid black;
}
.camposEmpresaMeadela{
    width: 100px;
      /* background-color: blue; */
}

.tituloMeadela{
    background-color: rgb(226, 221, 221);
    font-weight: bold;
    display: inline-block;
    margin-bottom: 10px;
    padding:  0 10px;
}

/* .camposEmpresaMeadela p :nth-child(2n+1){
    background-color: blue;
} */

.containerMenu {
    /* height: 600px; */
    padding: 0px 10%;
    /* display:flex; */
    /* align-items: center; */
    /* justify-content: center;  */
    /* margin-top: 30px; */
    padding-bottom: 70px;
    margin-top: -35px;
    /* padding:0; */
} 

.menu2{


    /* margin-left: 15px;
    width: 30%; */
    /* width: 100%; */
    display:flex;
    padding: 0px 10px;
    margin-top: 50px;
    border-radius: 50px;
    background-color: #545452;
    align-items: center;
    justify-content: center; 
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.submenu{
    border-right: 2px solid white;
    width: 100%;
}

.submenu2{
    /* padding: 0px 5px ; */
    width: 100%;
}

.submenu, a{  
    padding: 0px 5px ;
    /* color: black; */
}

.butoes2:link, .butoes2:visited { 
  color: white;
  text-decoration: none;
  cursor: pointer;
}

</style>