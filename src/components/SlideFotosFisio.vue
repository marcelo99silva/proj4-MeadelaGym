<template>
  <div style="margin:15px">
    <h1>Gestão de slide de fotos fisio</h1>
<!-- <v-btn medium elevation="15" style="float:rigth; background-color: #F7F3E9">Adicionar parceiro</v-btn> -->
    <v-divider />
    <v-sheet class="overflow-y-auto" elevation="2" :height="altura_ecra">

      <div>
        <table border = 5 bordercolor = red align = center>
    <tr>
        <th colspan = 1>Id</th>
        <th colspan = 3>Foto</th>
        <th colspan = 3>Opçoes</th>
    </tr> 
    <tr class="rr" v-for="(x, id) in slideFotosBd " :key="x.idFotoSlideInicial" >
        <td colspan = 1 class="nomeBD">{{++id}}</td>
         <td colspan = 3 border=3 height=100 width=100> <img :src="getImgUrl(x.foto)" class="imagemEsticadaBD" ></td>
         <td colspan = 1 width="100" class="removerTD"> <button class="editarBD" @click="abrirModalUpdate(x.foto, x.idFotoSlideInicial)" >Editar</button>
            <button class="removerBD" @click="removerServico(x.idFotoSlideInicial, x.foto)" >Remover</button> </td>
    </tr>
</table>
      </div>

  <v-btn medium elevation="15" @click="myModel=true" value="Add" style="float:right; background-color: #F7F3E9">Adicionar foto</v-btn>
    </v-sheet>





    <!-- MODAL -->

<div v-if="myModel">
  <transition name="model"> 
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">

              <div class="modal-body">
                 <h4 class="tituloModal">Inserir Foto</h4>
                <div class="form-group">
                  <form @submit.prevent="sendFile" enctype="multipart/form-data" >
                 
                  <!-- <label>Nome:</label> -->
                  <!-- <input type="text" class="form-control" v-model="nome"> -->

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


<!-- Fim Modal -->



<!-- MODAL UPDATE-->

<div v-if="myModelUpdate">
  <transition name="model"> 
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">

              <div class="modal-body">
                 <h4 class="tituloModal">Inserir Foto</h4>
                <div class="form-group">
                  <form @submit.prevent="editFile" enctype="multipart/form-data" >
                 
                  <!-- <label>Nome:</label> -->
                  <!-- <input type="text" class="form-control" v-model="nome"> -->

                  <label for="file">Foto:</label>
                  <input class="form-control" type="file" ref="file" @change="selectedFile">
                  <!-- class="form-control" @change="onFileSelected" name="imagemUpload" id="imagemUpload"> -->
                    
                    <div v-if="mostrarImagem !=null">
                      <img  v-if="url && fileEmCondicoes" :src="url" id="showImage" class="center" style="width:140px; height:150px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
                    </div>

                    <div v-if="mostrarImagem ==null">
                      <img :src="getImgUrl(fileUpdate)" id="showImage" class="center" style="width: 200px; height: 120px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
                    </div>

                    <!-- <input type="submit"  value="Inserir"> -->
                     <button class="butaoModal">Editar</button>
                        <div class="message-body">{{message}}</div>
                    </form>
                </div>
              </div>

              <button type="button" class="close" @click="fecharModalUpdate">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</div>


<!-- Fim Modal UPDATE-->



  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      altura_ecra: 0,
      myModel:false,
      myModelUpdate:false,
      imagemUpload: "",
      //nome: "",
      file:"",
      fileUpdate:"",
      idUpdate:"",
      error: false,
      message:"",
      fileEmCondicoes: false,
      mostrarImagem : null,
      url: null,

    //   idFoto:5,

      slideFotosBd: [],

    };
  },

   mounted(){

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=3",
 
    })
    .then((response) =>{
 
      this.slideFotosBd = response.data;
      console.log(response.data);
    });

    },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.altura_ecra = window.innerHeight - 250;
    },

    fecharModal(){
    //   this.nome="";
      this.file= null;
      this.url = null;
      this.myModel = false;
      this.message = "";
    },


    fecharModalUpdate(){
      // this.nome="";
      this.file= "";
      this.url = "";
      this.idUpdate="";
      this.myModelUpdate = false;
      this.mostrarImagem = null;
      this.message = "";
    },


    abrirModalUpdate(imagem, id){
      this.myModelUpdate = true;
      // this.nome= nome;
      this.idUpdate=id;
      this.fileUpdate= imagem;
      // var teste = this.$refs.file.files[0].name='ChangedName.tmp';
    },

    getImgUrl(pic) {
      return "/assets/fisio/slider/" + pic
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

  //  async 
    sendFile() {
      const formData = new FormData();
      formData.append('file' , this.file);

  if(this.fileEmCondicoes){


    // try{
    // await 
    //  axios.post("http://meadelagym.pt/projeto4dev/api/inserirSlideFotosFisiogym?id=3",formData);

     axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/inserirSlideFotosFisiogym?id=3",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })


    .then(() => {

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=3",
 
    })
    .then((response) =>{
 
      this.slideFotosBd = response.data;
      console.log(response.data);
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

    removerServico(idRecebido , nomeRecebido){

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/deleteSlideFotosFisiogym",

         data: {
          idFotoSlide : idRecebido,
          nome : nomeRecebido
        }
  
      })
      .then((response) =>{
       
          axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=3",
          
            })
            .then((response) =>{
              this.slideFotosBd = response.data;
            });

            this.$toastr.s("Removido com sucesso!")

      });
    },


  editFile() {
      const formData = new FormData();
      formData.append('file' , this.file);
      formData.append('id' , this.idUpdate);
      formData.append('nomeRemover' , this.fileUpdate);

  if(this.fileEmCondicoes){


    // try{
    // await 
    //  axios.post("http://meadelagym.pt/projeto4dev/api/updateSlideFotosFisiogym",formData);

     axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/updateSlideFotosFisiogym",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) =>{
       
          axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=3",
          
            })
            .then((response) =>{
              this.slideFotosBd = response.data;
            });

              console.log("inserir")
              this.$toastr.s("Alterado com sucesso!")
              this.message =""; 
              this.error = false;  

              this.nome="";
              this.descricao="";
              this.file= null;
              this.url = null;
              this.myModelUpdate = false;       

      })
      .catch(function (response) {
          this.$toastr.e("Erro!");
          });



      }else{
        this.message = "Seleciona uma imagem";
      }
    },






  }
};
</script>

<style>

.inline{
  display: inline-flex;
  width: 100%;
}

.imagemEsticadaBD{
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0;
    width: 200px;
    height: 120px;
}

.espaco{
  margin-right: 50px;
}

.editarBD{
  margin: auto;
  background-color: rgb(85, 175, 96);
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 10px;
}

</style>