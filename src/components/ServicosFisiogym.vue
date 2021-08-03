<template>
  <div style="margin:15px">
    <h1>Gestão de serviços fisiogym</h1>
    <v-divider />
    <v-sheet class="overflow-y-auto" elevation="2" :height="altura_ecra">

      <div>
        <table style="width: 100%" border = 5 bordercolor = red align = center>
          <colgroup>
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 60%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 15%;">
          </colgroup>
    <tr>
        <th >Nome</th>
        <th >Descrição</th>
        <th >Foto</th>
        <th >Opçoes</th>
    </tr>
    <tr class="rr" v-for="x in servicosBd" v-bind:key="x.idParceiroBD">
        <td  class="nomeBD">{{x.nome}}</td>
        <td  class="nomeBD2">{{x.descricao}}</td>
         <td  border=3 height=100 width=100> <img :src="getImgUrl(x.foto)" class="imagemBD" >  </td>
          <td width="100" class="removerTD"> <button class="editarBD" @click="abrirModalUpdate(x.nome, x.foto, x.descricao, x.idServico)" >Editar</button>
         <button class="removerBD" @click="removerServico(x.idServico, x.foto)">Remover</button> </td>
    </tr>
</table>
      </div>

  <v-btn medium elevation="15" @click="myModel=true" value="Add" style="float:right; background-color: #F7F3E9">Adicionar serviço</v-btn>
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
                 <h4 class="tituloModal">Inserir Serviço</h4>
                <div class="form-group">
                  <form @submit.prevent="sendFile" enctype="multipart/form-data" >

                  <!-- <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">  -->
                    <!-- <div class="message-body">{{message}}</div> -->
                  <!-- </div> -->
                 
                  <label>Nome:</label>
                  <input type="text" class="form-control" v-model="nome">

                   <label>Descrição:</label>
                  <textarea class="form-control"  rows="3" cols="30" style="border: 1px solid black" v-model="descricao"> </textarea>


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

<!-- MODAL Update -->

<div v-if="myModelUpdate">
  <transition name="model"> 
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <button type="button" class="close" @click="myModel=false">X</button> -->
    
              <!-- <h4 class="modal-title">titulo</h4> -->
              <div class="modal-body">
                 <h4 class="tituloModal">Editar Serviço</h4>
                <div class="form-group">
                  <form @submit.prevent="editFile" enctype="multipart/form-data" >

                  <!-- <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">  -->
                    <!-- <div class="message-body">{{message}}</div> -->
                  <!-- </div> -->
                 
                  <label>Nome:</label>
                  <input type="text" class="form-control" v-model="nome">

                  <label>Descrição:</label>
                  <textarea class="form-control"  rows="3" cols="30" style="border: 1px solid black" v-model="descricao"> </textarea>


                  <label for="file">Foto:</label>
                  <input class="form-control" type="file" ref="file" @change="selectedFile">
                  <!-- class="form-control" @change="onFileSelected" name="imagemUpload" id="imagemUpload"> -->
                    
                    <div v-if="mostrarImagem !=null">
                      <img  v-if="url && fileEmCondicoes" :src="url" id="showImage" class="center" style="width:140px; height:150px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
                    </div>

                    <div v-if="mostrarImagem ==null">
                      <img :src="getImgUrl(fileUpdate)" id="showImage" class="center" style="width:140px; height:150px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
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






<!-- Fim Modal Update -->





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
      nome: "",
      descricao: "",
      file:"",
      fileUpdate:"",
      idUpdate:"",
      nomeUpdate: "",
      error: false,
      message:"",
      fileEmCondicoes: false,
      mostrarImagem : null,
      url: null,

      servicosBd: [],

    };
  },

   mounted(){

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/servicosFisio?id=3",
 
    })
    .then((response) =>{
 
      this.servicosBd = response.data;
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
      this.nome="";
      this.descricao = "";
      this.file= null;
      this.url = null;
      this.myModel = false;
    },


    abrirModalUpdate(nome, imagem, descricao, id){
      this.myModelUpdate = true;
      this.nome= nome;
      this.descricao= descricao;
      this.idUpdate=id;
      this.fileUpdate= imagem;
      // var teste = this.$refs.file.files[0].name='ChangedName.tmp';
    },

    fecharModalUpdate(){
      this.nome="";
      this.descricao = "";
      this.file= "";
      this.url = "";
      this.idUpdate="";
      this.myModelUpdate = false;
      this.mostrarImagem = null;
    },


    getImgUrl(pic) {
      return '/assets/fisio/servs/' + pic
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
      formData.append('nome' , this.nome);
      formData.append('descricao' , this.descricao);
      formData.append('file' , this.file);

  if(this.fileEmCondicoes && this.nome.length > 0 && this.descricao.length > 0){


    // try{
    //  await axios.post("http://meadelagym.pt/projeto4dev/api/imagemServicosFisio",formData);

         axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/imagemServicosFisio",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

     .then(() => {

      axios({
        method: "get",
        url: "http://meadelagym.pt/projeto4dev/api/servicosFisio?id=3",
  
      })
      .then((response) =>{
  
        this.servicosBd = response.data;
        console.log(response.data);
      });
     
        this.$toastr.s("Adicionado com sucesso!")
        this.message =""; 
        this.error = false;  

        this.nome="";
        this.descricao="";
        this.file= null;
        this.url = null;
        this.myModel = false;
    })

    .catch(function (response) {
      this.$toastr.e("Erro!");
    
    });

      }else{
        this.message = "Preencha todos os campos";
      }
    },



    editFile() {
      const formData = new FormData();
      formData.append('nome' , this.nome);
      formData.append('descricao' , this.descricao);
      formData.append('id' , this.idUpdate);
      formData.append('nomeRemover' , this.fileUpdate);
      formData.append('file' , this.file);

  if(this.fileEmCondicoes && this.nome.length > 0){
    // try{
    //  await
      // axios.post("http://meadelagym.pt/projeto4dev/api/updateServicosFisioGym",formData);

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/updateServicosFisioGym",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })


      .then((response) =>{
       
            axios({
              method: "get",
              url: "http://meadelagym.pt/projeto4dev/api/servicosFisio?id=3",
        
            })
            .then((response) =>{
        
              this.servicosBd = response.data;
              console.log(response.data);
            });

              this.$toastr.s("Alterado com sucesso!")
              this.message =""; 
              this.error = false;  

              this.nome="";
              this.descricao="";
              this.fileUpdate= null;
              this.url = null;
              this.myModelUpdate = false;      

      })
      .catch(function (response) {
          this.$toastr.e("Erro!");
      });

      }else if(this.nome.length > 0){

          axios.post("http://meadelagym.pt/projeto4dev/api/updateServicos",formData)


          axios({
            method: "post",
            url: "http://meadelagym.pt/projeto4dev/api/updateServicos",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })


          .then((response) =>{
       
            axios({
                method: "get",
                url: "http://meadelagym.pt/projeto4dev/api/servicosFisio?id=3",
          
            })
            .then((response) =>{
          
                this.servicosBd = response.data;
                console.log(response.data);
            });

          console.log("inserir")
          this.$toastr.s("Alterado com sucesso!")
          this.message =""; 
          this.error = false;  

          this.nome="";
          this.descricao="";
          this.fileUpdate= null;
          this.url = null;
          this.myModelUpdate = false;

      })

      .catch(function (response) {
              this.$toastr.e("Erro!");
      });
      
      }
    },


    removerServico(idRecebido , nomeRecebido){

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/deleteServicosFisio",

         data: {
          idServico : idRecebido,
          nome : nomeRecebido
        }
  
      })
      .then((response) =>{
       
          axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/servicosFisio?id=3",
          
            })
            .then((response) =>{
              this.servicosBd = response.data;
            });

            this.$toastr.s("Removido com sucesso!")

      });
    }






  }
};
</script>

<style>

.rr:nth-child(2n+1) {
  background-color: grey;
}

.removerTD{
  vertical-align: inherit;
}

.removerBD{
  margin: auto;
  background-color: rgb(191, 55, 55);
  padding: 5px 6px;
  border-radius: 20px;
}

.nomeBD{
  text-align: center;
  vertical-align: inherit;
}


.nomeBD2 {
  width: 50px;
    text-align: center;
    vertical-align: inherit;
}

.message-body{
  padding-top: 10px;
  text-align: center;
  color: red;
  font-weight: 600;
}


.modal-mask{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  background-color: rgba(0, 0, 0, .6);
  transition: opacity .3s ease;
}

.modal-wrapper{
  display: table-cell;
  vertical-align: middle;
}


.tituloModal{
  margin: 10px 0 20px 0;
  text-align: center;
}

.butaoModal{
  background-color: rgb(103, 102, 102);
  padding: 0 30px;
  
  border-radius: 1em;
  margin: auto;
  margin-top: 15px;
  font-size: 1.7em;
}


.inline{
  display: inline-flex;
  width: 100%;
}

.espaco{
  margin-right: 50px;
}

.imagemBD{
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 0;
  width: 100px;
}
</style>