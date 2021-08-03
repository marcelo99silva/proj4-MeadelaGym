<template>
  <div style="margin:15px">
    <h1>Imagem Inicial</h1>
<!-- <v-btn medium elevation="15" style="float:rigth; background-color: #F7F3E9">Adicionar parceiro</v-btn> -->
    <v-divider />

    <v-sheet class="overflow-y-auto" elevation="2" :height="altura_ecra">

      <div>
        <table border = 5 bordercolor = red align = center> 
    <tr>
        <th colspan = 3>Foto</th>
        <th colspan = 2>Opçoes</th>
    </tr>
    <tr class="rr" v-for="x in mapaBD" v-bind:key="x.idCapa">
       
         <td colspan = 3 border=3 height=100 width=100 class="centerFoto" > <img :src="getImgUrl(x.foto)" class="imagemBD" >  </td>
         <td width="100" class="removerTD">
         <button class="removerBD" @click="removerCapa(x.idCapa,x.foto)">Remover</button> </td>
    </tr>
</table>
      </div>

  <v-btn v-if="this.mapaBD.length == 0" medium elevation="15" @click="myModel=true" value="Add" style="float:right; background-color: #F7F3E9">Adicionar foto</v-btn>
    </v-sheet>



<!-- MODAL -->


<div v-if="myModel">
  <transition name="model"> 
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <button type="button" class="close" @click="myModel=false">X</button> -->
    
              <!-- <h4 class="modal-title">titulo</h4> -->
              <div class="modal-body">
                 <h4 class="tituloModal">Inserir Capa</h4>
                <div class="form-group">
                  <form @submit.prevent="sendFile" enctype="multipart/form-data" >

                   <!-- <label>Descrição:</label>
                  <textarea class="form-control"  rows="3" cols="30" style="border: 1px solid black" v-model="descricao"> </textarea> -->

                  <label for="file">Foto:</label>
                  <input class="form-control" type="file" ref="file" @change="selectedFile">
                  <!-- class="form-control" @change="onFileSelected" name="imagemUpload" id="imagemUpload"> -->
                    
                    <div v-if="mostrarImagem !=null">
                      <img  v-if="url && fileEmCondicoes" :src="url" id="showImage" class="center" style="width:140px; height:150px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
                    </div>

                    <!-- <input type="submit"  value="Inserir"> -->
                     <button class="butaoModal">Adicionar</button>
                        <div class="message-body">{{message}}</div>
                    </form>
                </div>
              </div>

              <button type="button" class="close" @click="fecharModal">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</div>




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
      altura_ecra: 0,


      myModel:false,
      imagemUpload: "",
      file:"",
      descricao: "",
      error: false,
      message:"",
      fileEmCondicoes: false,
      mostrarImagem : null,
      url: null,

    //   idFoto:5,

      mapaBD: [],
    };
  },

  methods: {    
    handleResize() {
      this.altura_ecra = window.innerHeight - 170;
    },

    getImgUrl(pic) {
      return'/assets/gym/mapa/' + pic
    },

    fecharModal(){
        this.file= null;
        this.url = null;
        this.myModel = false;
        this.message = "";
    },

    selectedFile(){

      const file = this.$refs.file.files[0];
      this.url  = this.url = URL.createObjectURL(file);
      const allowedTypes = ["image/jpeg" , "image/png" , "image/gif"];
      this.mostrarImagem =true;
      
      if(allowedTypes.includes(file.type)) {
        this.file = file;
        this.error = false;
        this.message="";
        this.fileEmCondicoes = true;
      }else{
        this.error = true;
        this.fileEmCondicoes = false;;
        this.message="Introduza apenas imagens";
      }

    }, 

    sendFile() {
      const formData = new FormData();
      formData.append('file' , this.file);
    //   formData.append('descricao' , this.descricao);

  if(this.fileEmCondicoes){


     axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/inserircapa",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
// this.myModel = false;

    .then(() => {

        axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/capa",

    })
    .then((response) =>{
        this.mapaBD = response.data;
        this.$toastr.s("Adicionado com sucesso!")

      this.message =""; 
      this.error = false;  
      this.file= null;
      this.url = null;
      this.myModel = false;

    });


    })

    .catch(function (response) {
        this.$toastr.e("Erro!");
      });
 
      }else{
        this.message = "Seleciona uma imagem";
      }
    },


    removerCapa(idCapa, nomeRecebido){

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/deleteCapa",

         data: {
          idCapa : idCapa,
          nome : nomeRecebido
        }
  
      })
      .then((response) =>{
       
        axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/capa",

            })
            .then((response) =>{
            this.mapaBD = response.data;
            

        });

            this.$toastr.s("Removido com sucesso!")

      });
    },









    
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted(){
 

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/capa",

    })
    .then((response) =>{
        this.mapaBD = response.data;
        console.log(this.mapaBD);

    });

    },

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

</style>