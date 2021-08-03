<template>

    <div  style="margin-top:25px">
      
    <h6 class="tituloMeadela">Descrição página inicial:</h6>



        <div class="infoEmpresaMeadela">
  
        <textarea id="w3review" name="w3review" rows="4" cols="60" style="border: 1px solid black" v-model="miniSobre"> </textarea>
        </div>

        <h6 class="tituloMeadela">Descrição página "sobre":</h6>
        <div class="infoEmpresaMeadela">

        <textarea id="w3review" name="w3review" rows="9" cols="60" style="border: 1px solid black" v-model="sobre"> </textarea>
        </div>

        <button class="butaoGuardarDados" @click="editarDados()">Guardar alterações</button>
    
    </div>    
</template>


<script>
import axios from "axios";

export default {
   components: {

   },
  data() {
    return {

      sobre: this.sobre,
      miniSobre: this.miniSobre,



      altura_ecra: 0
    };
  },

  methods: {    
    handleResize() {
      this.altura_ecra = window.innerHeight - 170;
    },


            editarDados(){

            if(this.sobre.length > 0 &&
                this.miniSobre.length > 0
                ){
                  // console.log(this.email)

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/editarDescricoesEmpresa?id=2",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          sobre: this.sobre,
          minisobre: this.miniSobre,
        }
                
      })
      .then(() => {

        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=2",

        })
        .then((response) =>{
          this.miniSobre = response.data[0].miniSobre;
          this.sobre = response.data[0].sobre;

        });

        this.$toastr.s("Alterado com sucesso!")
      });


    }else{
      this.$toastr.e("Preencha todos os campos!");
    }
      }
    
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted(){

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/empresa?id=2",

    })
    .then((response) =>{

      this.miniSobre = response.data[0].miniSobre;
      this.sobre = response.data[0].sobre;

    });

    }
};

</script>


<style scoped>



.infoEmpresaMeadela{
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 30px;
}

.inputEmpresaMeadela{
    margin-left: 20px;
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

.butaoGuardarDados{
  padding: 7px;
  margin: 50px 10px 50px 0;
  /* border: 1px solid blue; */
  background-color: #757575;
  float: right;
}

</style>