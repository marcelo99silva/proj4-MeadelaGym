<template>
  <div style="margin:15px">
    <h1>Gestão de produtos</h1>
<!-- <v-btn medium elevation="15" style="float:rigth; background-color: #F7F3E9">Adicionar parceiro</v-btn> -->
    <v-divider />
    <v-sheet class="overflow-y-auto" elevation="2" :height="altura_ecra">

      <div>
        <form>
          <div class="form-group row" style="margin-bottom: 1px;">
            <label for="selectNumPag" class="col-2 col-form-label">Nº produtos por página</label>
            <div class="col-sm-10">
              <select id="selectNumPag" class=" col-1 form-control" style="padding: 0; text-align-last: center;" v-model="perPage">
                <option>4</option>
                <option>6</option>
                <option>12</option>
                <option>24</option>
              </select>
            </div>
          </div>
        </form>
        <div style="display: flex; flex-wrap: nowrap;">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
          <v-btn medium elevation="15" @click="abrirModal" value="Add" style="margin-bottom:15px; float:right; background-color: #F7F3E9">Adicionar Produto</v-btn>
        </div>
        
        
        <table style="width 100%" id="my-table" border = 5 bordercolor = red align = center>
          <colgroup>
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 60%;">
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 15%;">
          </colgroup>
          <tr>
            <th >Nome</th>
            <th >Descrição</th>
            <th >Referência</th>
            <!-- <th colspan = 3>Foto</th> -->
            <th colspan = 2>Opçoes</th>
          </tr>
          <tr class="rr" v-for="x in paginatedItems" v-bind:key="x.idProduto">
            <td  class="nomeBD">{{x.nome}}</td>
            <td  class="nomeBD2">{{x.descricao}}</td>
            <td  class="nomeBD2">{{x.referencia}}</td>
            <!-- <td colspan = 3 border=3 height=100 width=100 class="centerFoto" > <img :src="getImgUrl(x.foto)" class="imagemBD" >  </td> -->
            <td width="100" class="removerTD"> <button class="editarBD" @click="abrirModalUpdate(x.nome, x.foto, x.descricao, x.referencia,x.idSubcategoria, x.idProduto)" >Editar</button>
            <button class="removerBD" @click="removerServico(x.idProduto)">Remover</button> </td>
          </tr>
        </table>
      </div>

  
    </v-sheet>





    <!-- MODAL -->

<div v-if="myModel">
  <transition name="model"> 
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" style="max-width: 700px ; margin-top: 1%">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <button type="button" class="close" @click="myModel=false">X</button> -->
    
              <!-- <h4 class="modal-title">titulo</h4> -->
              <div class="modal-body">
                 <h4 class="tituloModal">Inserir Produto</h4>
                <div class="form-group">
                  <form @submit.prevent="sendFile" enctype="multipart/form-data" >
                 
                  <label>Nome:</label>
                  <input type="text" class="form-control" v-model="nome" >

                   <label>Descrição:</label>
                  <textarea class="form-control"  rows="2" cols="30" style="border: 1px solid black" v-model="descricao"> </textarea>

                  <label>Referência:</label>
                  <input type="text" class="form-control" v-model="referencia">


                  <div class="foto-container">

                    <div class="categorianome">
                      <label for="categorias">Categoria:</label>

                        <select name="categorias" id="categorias" style="margin:auto ; border:1px solid #000; text-align-last: center" v-model="selected"  @change="teste">
                          <option v-for="x in categorias"  v-bind:value="{ id: x.idCategoria, nome: x.nome }" v-bind:key="x.idcategoria">{{x.nome}}   </option>
                          
                        </select> 
                     </div>
                  <!-- #################################### -->
                  <div class="categorianome">
                    <label for="subcategorias">Subcategoria:</label>

                    <div  v-if="!cat" >
                      <p style="margin:auto; border:1px solid grey; text-align-last: center ; color:grey">Selecione uma categoria</p>
                      <!-- <button>teste</button> -->
                    </div>

                    <!-- <select v-if="!cat" name="subcategorias" id="subcategorias" style="margin:auto; border:1px solid grey; text-align-last: center ; color:grey">
                      <option value="saab">Selecione uma categoria</option>
                    </select>  -->

                    <select v-if="cat" name="subcategorias" id="subcategorias" style="margin:auto; border:1px solid #000; text-align-last: center" v-model="subselected">
                      <option v-for="x in subcategorias" v-bind:value="{ id: x.idSubcategoria, nome: x.nome }"  v-bind:key="x.idSubcategoria">{{x.nome}}</option>
                    </select> 

                  </div>

                  </div>


                  <div class="foto-container">
                    <label for="file" class="fotonome">Foto 1:</label>
                    <label for="file" class="fotonome">Foto 2:</label>
                    <label for="file" class="fotonome">Foto 3:</label>
                  </div>





                  <div class="foto-container">
                    
                    <input class="form-control" type="file" ref="file" @change="selectedFile" style="margin-right:10px">

                    <!-- <label for="file" class="foto-item">Foto:</label> -->
                    <input class="form-control" type="file" ref="file2" @change="selectedFile2" style="margin-right:10px">

                    <!-- <label for="file" class="foto-item">Foto:</label> -->
                    <input class="form-control" type="file" ref="file3" @change="selectedFile3" style="margin-right:10px">


                  </div>
                  <!-- class="form-control" @change="onFileSelected" name="imagemUpload" id="imagemUpload"> -->
                    
                    <!-- <div v-if="mostrarImagem !=null">
                      <img  v-if="url && fileEmCondicoes" :src="url" id="showImage" class="center" style="width:140px; height:150px; margin: 20px auto 40px auto; display:block; border:1px solid grey" >
                    </div> -->


                    <div class="foto-container">
                        <div v-if="mostrarImagem !=null" class="imagemnome">
                        <img  v-if="url && fileEmCondicoes" :src="url" id="showImage"  style="width:100px; height:110px; margin: 20px auto 20px auto; display:block; border:1px solid grey">
                        </div>
                        <div v-if="mostrarImagem ==null"  class="imagemnome">
                            <div class="center" style="width:100px; height:50px; margin: 20px auto 20px auto; display:block"></div>
                        </div>

                        <!-- ##################### -->

                        <div v-if="mostrarImagem2 !=null" class="imagemnome">
                        <img  v-if="url2 && fileEmCondicoes2" :src="url2" id="showImage" style="width:100px; height:110px; margin: 20px auto 20px auto; display:block; border:1px solid grey">
                        </div>
                        <div v-if="mostrarImagem2 ==null"  class="imagemnome">
                            <div class="center" style="width:100px; height:50px; margin: 20px auto 20px auto; display:block"></div>
                        </div>

                        <!-- ##################### -->

                        <div v-if="mostrarImagem3 !=null" class="imagemnome">
                        <img  v-if="url3 && fileEmCondicoes3" :src="url3" id="showImage"  style="width:100px; height:110px; margin: 20px auto 20px auto; display:block; border:1px solid grey">
                        </div>
                        <div v-if="mostrarImagem3 ==null"  class="imagemnome">
                            <div class="center" style="width:100px; height:50px; margin: 20px auto 20px auto; display:block"> </div>
                        </div>
                    </div>





                   
                     <button class="butaoModal2">Adicionar</button>
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

              <div class="modal-body">
                 <h4 class="tituloModal">Editar Produto</h4>
                <div class="form-group">
                  <form @submit.prevent="editFile" enctype="multipart/form-data" >

                 <label>Nome:</label>
                  <input type="text" class="form-control" v-model="nome" >

                   <label>Descrição:</label>
                  <textarea class="form-control"  rows="2" cols="30" style="border: 1px solid black" v-model="descricao"> </textarea>

                  <label>Referência:</label>
                  <input type="text" class="form-control" v-model="referencia">


                  <div class="foto-container">

                    <div class="categorianome">
                      <label for="categorias">Categoria:</label>

                      <div>
                      <p style="margin:auto; border:1px solid grey; text-align-last: center ; color:black">{{categoriaRecebida}}</p>
    
                    </div>

                     </div>
                  <!-- #################################### -->
                  <div class="categorianome">
                    <label for="subcategorias">Subcategoria:</label>

                    <div>
                      <p style="margin:auto; border:1px solid grey; text-align-last: center ; color:black">{{subcategoriaRecebida}}</p>

                    </div>

                  </div>

                  </div>


                    <div class="foto-container">
                      <!-- <div class="foto-container">
                      <label for="file" class="fotonome">Foto1:</label>
                      </div> -->
                        <div v-for="(x, id) in fotoProdutos" v-bind:key="x.idFotoProduto" class="imagemnome">
                          <p for="file" class="fotoupdate">Foto {{id+1}}:</p>
                        <!-- <img  v-if="url3 && fileEmCondicoes3" :src="url3" id="showImage"  style="width:100px; height:110px; margin: 20px auto 20px auto; display:block; border:1px solid grey"> -->
                         <img :src="getImgUrl(x.foto)" id="showImage" class="center" style="width:100px; height:110px; margin: 20px auto 20px auto; display:block; border:1px solid grey" >
                        </div>
                    </div>
                   
                     <button class="butaoModal2">Editar</button>
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
      referencia: "",
      file:"",
      file2:"",
      file3:"",
      descricao: "",
      fileUpdate:"",
      idUpdate:"",
      idProduto: "",
      nomeUpdate: "",
      error: false,
      message:"",
      fileEmCondicoes: false,
      fileEmCondicoes2: false,
      fileEmCondicoes3: false,
      mostrarImagem : null,
      mostrarImagem2 : null,
      mostrarImagem3 : null,
      url: null,
      url2: null,
      url3: null,

      categoriaRecebida:"",
      subcategoriaRecebida:"",


      files: [],

      categorias: [],
      subcategorias: [],

      servicosBd: [],
      produtosBD: [],
      fotoProdutos: [],

      cat : false,
      selected:"",
      subselected:"",

      perPage: 4,
      currentPage: 1,
    };
  },
  
    computed: {
      paginatedItems() {
        var teste = this.produtosBD.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
        return teste;
      },
      rows() {
        return this.produtosBD.length;
      },
    },

    mounted(){

    axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/produtos",
 
    })
    .then((response) =>{
 
      this.produtosBD = response.data;
      // console.log(response.data);
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
      this.referencia = "";
      this.file= "";
      this.file2= "";
      this.file3= "";
      this.url = null;
      this.url2 = null;
      this.url3 = null;
      this.mostrarImagem = null;
      this.mostrarImagem2 = null;
      this.mostrarImagem3 = null;
      this.fileEmCondicoes = false;
      this.fileEmCondicoes = false;
      this.fileEmCondicoes = false;
      this.categorias= [];
      this.selected = null;
      this.cat = false;
      this.message = "";
      this.myModel = false; 

      
    },

    fecharModalUpdate(){
      this.nome="";
      this.descricao = "";
      this.referencia = "";
      this.file= "";
      this.url = "";
      this.idUpdate="";
      this.myModelUpdate = false;
      this.mostrarImagem = null;
    },

    abrirModal(){
      this.myModel=true
      
      axios({
        method: "get",
        url: "http://meadelagym.pt/projeto4dev/api/categorias",
  
      })
      .then((response) =>{
        this.categorias = response.data;
      });
    },



    abrirModalUpdate(nome, imagem,descricao,referencia,idSubcategoria, id){
      this.myModelUpdate = true;
      this.nome= nome;
      this.descricao= descricao;
      this.referencia= referencia;
      this.idUpdate=id;
      console.log("idddd:" +id);
      this.fileUpdate= imagem;
      this.idUpdate = id;

      axios({
        method: "get",
        url: "http://meadelagym.pt/projeto4dev/api/categoriaproduto?id=" +idSubcategoria,
  
      })
      .then((response) =>{
        // this.fotoProdutos = response.data;
        this.categoriaRecebida = response.data[0].categoria;
        this.subcategoriaRecebida = response.data[0].subcategoria;
        // console.log(response);
      });


      this.getFotos(id);

      
    },


    getFotos(idproduto){

      console.log("id recebido: " +idproduto);

      axios({
        method: "get",
        url: "http://meadelagym.pt/projeto4dev/api/fotosprodutos?id=" +idproduto,
  
      })
      .then((response) =>{
        this.fotoProdutos = response.data;
        // console.log(response);
      });
    },

    getImgUrl(pic) {
      return'/assets/ortho/servs/' + pic
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

    selectedFile2(){

      const file2 = this.$refs.file2.files[0];
      this.url2  = this.url2 = URL.createObjectURL(file2);
      const allowedTypes = ["image/jpeg" , "image/png" , "image/gif"];
      this.mostrarImagem2 =true;

    //   if(this.url == null){
    //       this.message="Selecionaa na 1 imagem";
    //   }else{
      
      if(allowedTypes.includes(file2.type)) {
        this.file2 = file2;
        this.error = false;
        this.message="";
        this.fileEmCondicoes2 = true;
      }else{
        this.error = true;
        this.fileEmCondicoes2 = false;;
        this.message="Introduza apenas imagens";
      }
    //   }

    },

    selectedFile3(){

      const file3 = this.$refs.file3.files[0];
      this.url3  = this.url3 = URL.createObjectURL(file3);
      const allowedTypes = ["image/jpeg" , "image/png" , "image/gif"];
      this.mostrarImagem3 =true;
      
      if(allowedTypes.includes(file3.type)) {
        this.file3 = file3;
        this.error = false;
        this.message="";
        this.fileEmCondicoes3 = true;
      }else{
        this.error = true;
        this.fileEmCondicoes3 = false;;
        this.message="Introduza apenas imagens";
      }

    },

    teste(){
      // console.log(this.selected.id);

      this.cat = true;

      axios({
      method: "get",
      url: "http://meadelagym.pt/projeto4dev/api/subcategorias?id="+this.selected.id,
 
    })
    .then((response) =>{
      this.subcategorias = response.data;
    });
    },

    
  sendFile() {        
         if( this.nome.length > 0 &&
          this.descricao.length > 0 &&
          this.referencia.length > 0){
            if(this.fileEmCondicoes || this.fileEmCondicoes2 || this.fileEmCondicoes3 ){
          
          


        axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/criarproduto",

        data: {
          nome: this.nome,
          descricao: this.descricao,
          referencia: this.referencia,
          subcategoria: this.subselected.id,
        },              
      })
      .then((response) =>{

        if(this.fileEmCondicoes){
          const formData = new FormData();
          formData.append('file' , this.file);
          formData.append('idproduto' , response.data.insertId);

          axios({
              method: "post",
              url: "http://meadelagym.pt/projeto4dev/api/produtosortho",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })

        }

        if(this.fileEmCondicoes2){
          const formData2 = new FormData();
          formData2.append('file' , this.file2);
          formData2.append('idproduto' , response.data.insertId);

          axios({
              method: "post",
              url: "http://meadelagym.pt/projeto4dev/api/produtosortho",
              data: formData2,
              headers: { "Content-Type": "multipart/form-data" },
            })

        }

        if(this.fileEmCondicoes3){  
          const formData3 = new FormData();
          formData3.append('file' , this.file3);
          formData3.append('idproduto' , response.data.insertId);

          axios({
              method: "post",
              url: "http://meadelagym.pt/projeto4dev/api/produtosortho",
              data: formData3,
              headers: { "Content-Type": "multipart/form-data" },
            })

        }

        // console.log(response.data.insertId);
            this.$toastr.s("Inserido com sucesso!")
            this.fecharModal();
            axios({
              method: "get",
              url: "http://meadelagym.pt/projeto4dev/api/produtos",
        
            })
            .then((response) =>{
              this.produtosBD = response.data;
            });
      })

      
  
    // .catch(function (response) {
    // this.$toastr.e("Erro!");
   
    // });
    }

      }else{
        this.$toastr.e("Preencha todos os campos!");
      }
    },

    removerServico(idRecebido){

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/deleteprodutos?id="+idRecebido,
      })
      .then((response) =>{
       
          axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/produtos",
      
          })
          .then((response) =>{     
            this.produtosBD = response.data;
          });

            this.$toastr.s("Removido com sucesso!")

      });
    },


    editFile() {
  if(this.nome && this.descricao.length > 0 && this.referencia.length >0){

      axios({
        method: "post",
        url: "http://meadelagym.pt/projeto4dev/api/updateproduto?id=" +this.idUpdate,
        data:{
          nome: this.nome,
          descricao: this.descricao,
          referencia: this.referencia,
        },
      })


      .then((response) =>{
       
          axios({
            method: "get",
            url: "http://meadelagym.pt/projeto4dev/api/produtos",
      
          })
          .then((response) =>{
      
            this.produtosBD = response.data;
            // console.log(response.data);
          });

              // console.log("inserir")
              this.$toastr.s("Alterado com sucesso!")
              this.message =""; 
              this.error = false;  

              this.fecharModalUpdate();      

      })

          .catch(function (response) {
          this.$toastr.e("Erro!");
          });

      } else {
        this.$toastr.e("Preencha todos os campos!");
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

.removerBD{
  margin: auto;
  background-color: rgb(191, 55, 55);
  padding: 5px 6px;
  border-radius: 20px;
}

.editarBD{
  margin: auto;
  background-color: rgb(85, 175, 96);
  padding: 5px 16px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.nomeBD {
    text-align: center;
    vertical-align: inherit;
}

.nomeBD2 {
  width: 50px;
    text-align: center;
    vertical-align: inherit;
}

.centerFoto{
  vertical-align: middle;
}

.foto-container {
  display: flex;
  /* flex-wrap: wrap; */
  /* max-width: 900px; */
}

.foto-item {
  /* padding: 30px 10px;
  border: 1px solid grey; */
  /* text-align: center; */
  /* margin: 5px; */
  /* width: 10px;
  flex-basis: 150px; */
  flex-grow: 1;
}

/* .foto-placeholder {
  width: 150px;
  height: 2px;
  margin: 5px;
  background-color: red;
  
  flex-basis: 150px;
  flex-grow: 1;
} */

.fotonome{
    margin-top: 15px;
    flex: auto;
    padding-left: 1.5%;
}

.fotoupdate{
    margin-top: 15px;
    flex: auto;
    padding-left: 1.5%;
    text-align: center;
}

.imagemnome{
    /* margin-top: 15px; */
    flex: auto;
    padding-left: 1.5%;
}

.categorianome{
    margin-top: 15px;
    flex: auto;
    padding-left: 1.5%;
    text-align: center;
}

.butaoModal2{
  background-color: rgb(103, 102, 102);
  padding: 0 30px;
  
  border-radius: 1em;
  margin: auto;
  font-size: 1.7em;
}

</style>