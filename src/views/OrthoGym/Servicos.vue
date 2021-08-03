<template>
  <div class="home">
      
    <NavBar/>

    <div class="banner">
      <b-img class="bannerImage" :src="getImage(bannerImage)" fluid-grow alt="Banner image contactos"></b-img>
      <div class="bannerTitle">
        <p>Produtos</p>
      </div>
    </div>

    <div class="corpo">
      <div class="d-flex" id="wrapper">
        <!-- Sidebar -->
        <b-sidebar v-if="small" id="sidebar-1" title="Categorias" shadow>
          <div class="list-group list-group-flush" id="list-tab" role="tablist">
            <a 
              v-for="cat in categorias" 
              v-bind:key="cat.id"
              v-bind:class="{'list-group-item list-group-item-action':true, 'active':(cat.id == idCategoriaEscolhida)}"
              :href="cat.id"
              data-toggle="list"
              role="tab">
              {{cat.nome}}
            </a>
          </div>
        </b-sidebar>
        <div v-else class="border-right" id="sidebar-wrapper">
          <div class="list-group list-group-flush" id="list-tab" role="tablist">
            <a 
              v-for="cat in categorias" 
              v-bind:key="cat.id"
              v-bind:class="{'list-group-item list-group-item-action':true, 'active':(cat.id == idCategoriaEscolhida)}"
              :href="cat.id"
              data-toggle="list"
              role="tab">
              {{cat.nome}}
            </a>
          </div>
        </div>
        <!-- /#sidebar-wrapper -->
        <!-- Page Content -->
        <div id="page-content-wrapper">
          <nav v-if="small" class="navbar navbar-expand-lg navbar-light bg-light border-bottom" >
            <b-button class="btnP btn-primary" style="color: white;" v-b-toggle.sidebar-1>Categorias</b-button>
          </nav>
          <div class="container-fluid">
            <div style="margin-top: 5%" v-if='loading == true' >
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-row v-else align-h="center">
              <div class="divEmpty" v-if='!produtos.length' style="min-height: 200px">
                Não foram encontrados produtos.
              </div>
              <template v-else>
                <template v-for="p in paginatedItems" >
                  <b-col l="4" v-bind:key="p.index" >
                    <template v-for="foto in fotoProduto" >
                      <template v-bind="foto.idProduto" v-if="foto.idProduto == p.idProduto">
                        <b-card
                          v-bind:key="foto.index"
                          :img-src="getImageServicos(foto.foto)"
                          img-top
                          img-alt="Imagem Produto"
                          :title="p.nome"
                          tag="article"
                          style="max-width: 15rem;"
                          class="mb-2" >
                          <b-card-text style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{p.descricao}}</b-card-text>
                          <p class="referencia" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            Referência: <strong>{{p.referencia}}</strong>
                          </p>
                          <a @click="modalProduto(p)" class="btnP btn btn-primary stretched-link">Ver detalhes</a>
                        </b-card>
                      </template>
                    </template>
                  </b-col>
                </template>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  align="center"
                ></b-pagination>
              </template>
            </b-row>
          </div>
        </div>
        <!-- /#page-content-wrapper -->
      </div>
      <!-- /#wrapper -->
    </div>
    
    <div >
      <b-modal ref="modal-popup" ok-only>
        <template #modal-title>
          <h5 class="modalTitle">{{selectedProduct.nome}}</h5>
        </template>
        <vueper-slides
          class="vs1"
          ref="vueperslides1"
          :touchable="false"
          fade
          :autoplay="false"
          :bullets="false"
          @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
          fixed-height="300px" >
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="getImageServicos(slide.foto)">
          </vueper-slide>
        </vueper-slides>

        <vueper-slides
          class="no-shadow thumbnails"
          ref="vueperslides2"
          @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
          :visible-slides="slides.length"
          fixed-height="75px"
          :bullets="false"
          :touchable="false"
          :gap="3"
          :arrows="false">
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="getImageServicos(slide.foto)"
            @click.native="$refs.vueperslides2.goToSlide(i)">
          </vueper-slide>
        </vueper-slides>
        <p class="my-4">{{selectedProduct.descricao}}</p>
        <p class="my-4">Referência: <strong>{{selectedProduct.referencia}}</strong></p>
      </b-modal>
    </div>

    <footerComp/>
  </div>
</template>

<script>
  // VueperSlides
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  import axios from "axios";
  import $ from 'jquery';

  export default {
    name: 'OrthoServicos',

    components: {
      NavBar: () => import("../../components/navbarOrtho.vue"),
      footerComp: () => import("../../components/footerOrtho.vue"),
      VueperSlides, 
      VueperSlide
    },

    data(){
      return {
        bannerImage: 'ortho/banner_servicos.png',
        produtos: [],
        todosProdutos: [],
        selectedProduct: '',
        idCategoriaEscolhida: '',
        todasSubCategorias: [],
        subCategorias: [],
        fotoProduto: [],
        slides: [],
        categorias: [
          {id: 0, nome: 'Tudo'},
          {id: 1, nome: 'Ortopedia'},
          {id: 2, nome: 'Vida Diária'},
          {id: 3, nome: 'Diagnósticos'},
          {id: 4, nome: 'Mobiliário/Mobilidade'},
          {id: 5, nome: 'Calçado'},
          {id: 6, nome: 'Geriatria'},
        ],
        loading: true,
        perPage: 6,
        currentPage: 1,
        small: '',
      }
    },
    computed: {
      paginatedItems() {
        var teste = this.produtos.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
        return teste;
      },
      rows() {
        return this.produtos.length;
      },
    },
    created(){
      this.idCategoriaEscolhida = this.$route.params.id;
      this.fetch();
      this.resizePerPage($(document).width());
    },
    mounted(){
      //toggle sidebar
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
      //empty modal
      this.$root.$on('bv::modal::hidden', (bvEvent, modalId) => {
        this.slides = '';
        this.selectedProduct = '';
      }),
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      getImage(src){
        return "/assets/" + src
      },
      getImageServicos(src){
        return "/assets/ortho/servs/" + src
      },
      getImageProduto(idP){
        this.fotoProduto.forEach(el => {
          if(el.idProduto == idP){
            var teste = this.getImageServicos(el.foto);
            return 'require('+teste+')';
          }
        });
      },
      fetch: function() {
        if(this.idCategoriaEscolhida > 6){
          this.$router.push('/orthoGym/Servicos/0');
        }
        // produtos
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/produtos",
        })
        .then((response) =>{
          this.todosProdutos = response.data;
          if (this.idCategoriaEscolhida==0){
            this.loading = false;
            this.produtos = this.todosProdutos;
            this.produtos.forEach(p => {
              this.loadImages(p.idProduto);
            });
          } else {
            this.filtrarCategoria();
          }
        });
      },
      filtrarCategoria(){
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/subcategorias?id="+this.idCategoriaEscolhida,
        })
        .then((response) =>{
          this.subCategorias = response.data;
          this.filtrarProdutos();
        });
      },
      filtrarProdutos(){
        this.todosProdutos.forEach(p => {
          if ( this.subCategorias.map(function(e) {return e.idSubcategoria}).indexOf(p.idSubcategoria) != -1 ) {
            this.produtos.push(p);
            this.loadImages(p.idProduto);
          }
        });
          this.loading = false;
      },
      loadImages(idP){
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/fotosprodutos?id="+idP,
        })
        .then((response) =>{
          this.fotoProduto.push(response.data[0]);
        });
      },
      modalProduto(p){
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/fotosprodutos?id="+p.idProduto,
        })
        .then((response) =>{
          this.slides = response.data;
        });
        this.selectedProduct = p;
        this.$refs['modal-popup'].show();
      },
      handleResize(event) {
        this.resizePerPage(event.currentTarget.innerWidth);
      },
      resizePerPage(width){
        if (width > 1556 ){
          this.small = false;
          this.perPage = 10;
        }
        else if (width > 1296 && width <= 1556) {
          this.small = false;
          this.perPage = 8;
        }
        else if (width > 1036 && width <= 1296) {
          this.small = false;
          this.perPage = 6;
        }
        else if (width > 795 && width <= 1036) {
          this.small = true;
          this.perPage = 6;
        } else if (width <= 795) {
          this.small = true;
          this.perPage = 4;
        }
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>

<style>
body.modal-open {
  overflow: visible;
}
</style>
<style scoped>

.home {
  background-color: #E0E9FF;
}
.banner{
  position: relative;
}
.bannerImage {
  max-height: 150px;
  object-fit:cover;
}
.bannerTitle {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 85%;
  
  padding: 5px;
  background-color: #E0E9FF;
  border: 1px solid black;  
  color: #004AFF; 
}
.bannerTitle p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.corpo {
  text-align: center;
  font-family: Roboto;
}

.divEmpty{
  margin-top: 5%;
  font-size: 1.4rem;
}

.container-fluid {
  margin: 2% 0%;
}

.card {
  width: 230px;
}
.card-img-top {
  height: 130px;
  object-fit: cover;
}
.card-body {
  background: #f8f9fa;
}
.card-title {
  text-transform: unset;
  font-size: 1.3rem;
}
.referencia {
  margin-bottom: 2%;
}
.btnP {
  background-color: #004AFF;
  text-transform: unset;
}

.thumbnails {
  margin: auto;
  max-width: 300px;
  margin-top: 2%;
}
.thumbnails .vueperslide {
  box-sizing: border-box;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
  max-width: 31.3333%;;
}
.thumbnails .vueperslide--active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  opacity: 1;
  border: 1.5px solid #000;
}
.modalTitle {
  text-transform: unset !important;
  margin-bottom: 0;
}

@media (max-width:768px) and (min-width:577px) {
}

@media only screen and (max-width: 577px) {
  .card {
    width: 150px;
  }
  .card-body {
    padding: 5%;
  }
  .card-title {
    font-size: 1rem;
  }
  .referencia {
    font-size: 0.8rem;
  }
  .btnP {
    font-size: 0.8rem;
  }
  .vs1 {
    height: 200px !important;
  }
  .divEmpty{
    font-size: 1rem;
  }
}

/* sidebar escolha categoria */
#sidebar-wrapper {
  min-height: 60vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}
#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
#page-content-wrapper {
  min-width: 100vw;
}
#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}
#menu-toggle {
  background-color: #004AFF;
  text-transform: unset;
}
.list-group-item {
  background: #f8f9fa;
}
.list-group-item:hover {
  background: #e0e4e4;
}
.active {
  background-color: #007bff;
}
.active:hover {
  background-color: #004AFF;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style> 