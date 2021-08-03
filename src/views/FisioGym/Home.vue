<template>
  <div class="home">
    <NavBar/>
    
    <div class="carousel">
      <vueper-slides
        autoplay
        fade
        :touchable="false"
        fixedheight="200vh"
      >
        <vueper-slide 
          v-for="(p, index) in fotosSlide" 
          :key="index" 
          :image="getImageSlide(p.foto)"
          :title="'O seu Centro de Fisioterapia'"
        >
        </vueper-slide>
      </vueper-slides>
    </div>

    <div class="divAcerca">
      <h3>Acerca do nosso espaço</h3>
      <b-container fluid>
        <b-row class="acercarow" align-v="center" align-h="center">
          <b-col class="textocol" sm="5">
              <div class="divAcercaTexto">
                <p>{{acerca}}</p>
              </div>
          </b-col>
          <b-col class="imagecol" sm="3">
            <b-img 
              :src="getImage('gym.jpg')"
              rounded>
            </b-img>
          </b-col>
        </b-row>
      </b-container>
      <b-button class="btnF" pill :to="'fisioGym/Sobre'">Saber Mais</b-button>
    </div>

    <div class="divServicos">
      <h3>Os Nossos Serviços</h3>
      <!-- <b-container fluid>
        <b-row class="" align-h="center" style="margin-bottom: 5%;">
          <template v-if="servicos[0]">
            <b-col class="col-6">
              <b-card :img-src="getImageServicos(servicos[0].foto)" img-top class="h-100">
                <a href="#" class="stretched-link">
                  <b-card-text>
                    {{servicos[0].nome}} <b-icon icon="arrow-right"></b-icon>
                  </b-card-text>
                </a>
              </b-card>
            </b-col>
          </template>
          <template v-if="servicos[1]">
            <b-col class="col-6">
              <b-card :img-src="getImageServicos(servicos[1].foto)" img-top class="h-100">
                <a href="#" class="stretched-link">
                  <b-card-text>
                    {{servicos[1].nome}} <b-icon icon="arrow-right"></b-icon>
                  </b-card-text>
                </a>
              </b-card>
            </b-col>
          </template>
        </b-row>
        <b-row class="" align-h="center" >
          <template v-if="servicos[2]">
            <b-col class="col-6">
              <b-card :img-src="getImageServicos(servicos[2].foto)" img-top class="h-100">
                <a href="#" class="stretched-link">
                  <b-card-text>
                    {{servicos[2].nome}} <b-icon icon="arrow-right"></b-icon>
                  </b-card-text>
                </a>
              </b-card>
            </b-col>
          </template>
          <template v-if="servicos[3]">
            <b-col class="col-6">
              <b-card :img-src="getImageServicos(servicos[3].foto)" img-top class="h-100">
                <a href="#" class="stretched-link">
                  <b-card-text>
                    {{servicos[3].nome}} <b-icon icon="arrow-right"></b-icon>
                  </b-card-text>
                </a>
              </b-card>
            </b-col>
          </template>
        </b-row>
      </b-container> -->
      <!-- <div class="container">
        <div class="card-deck">
          <template v-if="servicos[0]">
            <div class="card mb-4" style="min-width: 180px;">
              <img class="card-img-top img-fluid" :src=getImageServicos(servicos[0].foto) alt="Card image cap">
              <div class="card-body">
                <h6 class="card-text">{{servicos[0].nome}}</h6>
              </div>
            </div>
          </template>
          <template v-if="servicos[1]">
            <div class="card mb-4" style="min-width: 180px;">
              <img class="card-img-top img-fluid" :src=getImageServicos(servicos[1].foto) alt="Card image cap">
              <div class="card-body">
                <h6 class="card-text">{{servicos[1].nome}}</h6>
              </div>
            </div>
          </template>
          <template v-if="servicos[2]">
            <div class="card mb-4" style="min-width: 180px;">
              <img class="card-img-top img-fluid" :src=getImageServicos(servicos[2].foto) alt="Card image cap">
              <div class="card-body">
                <h6 class="card-text">{{servicos[2].nome}}</h6>
              </div>
            </div>
          </template>
          <template v-if="servicos[2]">
            <div class="card mb-4" style="min-width: 180px;">
              <img class="card-img-top img-fluid" :src=getImageServicos(servicos[2].foto) alt="Card image cap">
              <div class="card-body">
                <h6 class="card-text">{{servicos[2].nome}}</h6>
              </div>
            </div>
          </template>
        </div> 
      </div> -->
      <b-container fluid>
        <b-row class="servicosrow justify-content-center" align-h="center">
          <b-col
            class="colServ"
            v-for="serv in servicos"
            :key="serv.nome"
            cols=""
          >
            <b-img class="imgServico" :src="getImageServicos(serv.foto)" rounded="circle"></b-img>
            <p class="servText" >{{serv.nome}}</p>
          </b-col>
        </b-row>
      </b-container>
      <b-button class="btnF" pill :to="'fisioGym/Servicos'">Saber Mais</b-button>
    </div>
    
    <footerComp/>
  </div>
</template>
<script>
  // VueperSlides
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  import axios from "axios";

  export default {
    name: 'FisioHome',

    components: {
      NavBar: () => import("../../components/navbarFisio.vue"),
      footerComp: () => import("../../components/footerFisio.vue"),
      VueperSlides, 
      VueperSlide
    },

    data(){
      return {
        servicos: null,
        fotosSlide: [],
        acerca: null
      }
    },
    mounted(){
    },
    created(){
      this.fetch()
    },
    methods: {
      getImage(src){
        return "/assets/" + src
      },
      getImageSlide(src){
        return "/assets/fisio/slider/" + src
      },
      getImageServicos(src){
        return "/assets/fisio/servs/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=3",
        })
        .then((response) =>{
          this.acerca = response.data[0].miniSobre;
        });
        // serviços
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/servicos?id=3",
        })
        .then((response) =>{
          this.servicos = response.data.slice(0,3);
        });
        // fotos slide
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=3",
        })
        .then((response) =>{
          this.fotosSlide = response.data;
        });
      }
    },
    computed: {
    }
  }
</script>

<style>
.vueperslides__arrow {
  color: rgb(190, 190, 190)
}
.vueperslides__arrow svg {
  stroke-width: 2;
}
.vueperslide__title {
  font-size: 3.5rem;
  font-weight: 500;
  color: #fff;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

@media (max-width:768px) and (min-width:577px) {
  .imageSlider {
    max-height: 350px;
  }
  .vueperslides__arrow svg {
    stroke-width: 1.5;
  }
  .vueperslide__title{
    font-size: 2.5rem;
  }
}
@media only screen and (max-width: 577px) {
  .imageSlider {
    max-height: 200px;
  }
  .vueperslides__arrow svg {
    stroke-width: 1.5;
    height: 60px;
  }
  .vueperslide__title{
    font-size: 1em;
    -webkit-text-stroke-width: 0.5px;
  }
}
</style>
<style scoped>
.home {
  background-color: #f2d8b1;
}
.nav {
  display:flex;
}

.imageSlider {
  height: 50vh;
}

.divAcerca {
  padding: 5% 0% 5% 0%;
  text-align: center;
  font-family: Roboto;
}
.divAcerca h3 {
  margin-bottom: 5%;
  text-transform: unset;
}
.divAcerca p {
  font-size: 1.3rem;
}
.acercarow {
  margin-bottom: 2%;
}
.divAcercaTexto{
  padding: 4% 4%;
  background-color: #E0E9FF;
}
.btnF {
  padding-left: 3%;
  padding-right: 3%;
  margin-top: 2%;
  background-color: #fe6c03;
  text-transform: unset;
  font-size: 1.5rem;
}

.servicosrow {
  margin-bottom: 2%;
  margin-left: 15%;
  margin-right: 15%;
}
.divServicos {
  padding: 5% 0% 5% 0%;
  text-align: center;
  font-family: Roboto;
  margin-left: 0%;
  margin-right: 0%;
  background-color: #f2d8b1;
}
.divServicos h3 {
  margin-bottom: 5%;
  text-transform: unset;
}
.imgServico {
  object-fit: cover;
  height: 200px;
  width: 200px;
}
.servText {
  margin-top: 5%;
  font-size: 1.3rem;
}
.card-text {
  font-size: 1.3rem;
}
.card {
  max-width: 300px;
  margin: 0;
}
.card img {
  width: 300px;
  height: 160px;
  object-fit: cover;
}
.card_body{
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

@media (max-width:768px) and (min-width:577px) {
  .imageSlider {
    max-height: 350px;
  }
  .vueperslides__arrow svg {
    stroke-width: 1.5;
  }
  .vueperslide__title{
    font-size: 2.5rem;
  }

  .divAcerca h3 {
    font-size: 1.5rem;
  }
  .divAcerca p {
    font-size: 1rem;
  }
  .btnF {
    font-size: 1rem;
  }

  .servicosrow{
    margin-left: 5%;
    margin-right: 5%;
  }
  .divServicos h3 {
    font-size: 1.5rem;
  }
  .imgServico {
    object-fit: cover;
    height: 150px;
    width: 150px;
  }
  .servText {
    margin-top: 5%;
    font-size: 1rem;
  }
  .card-text {
    font-size: 1rem;
  }
  .card {
    width: 180px;
  }
  .card-body {
    padding: 5%;
  }
  .card img {
    width: 180px;
  }
}

@media only screen and (max-width: 577px) {
  .imageSlider {
    max-height: 200px;
  }
  .vueperslides__arrow svg {
    stroke-width: 1.5;
  }
  .vueperslide__title{
    font-size: 2rem;
  }

  .divAcerca h3 {
    font-size: 1.3rem;
  }
  .divAcerca p {
    font-size: 0.8rem;
  }
  .acercarow {
    margin: 2% 5%;
  }
  .textocol {
    margin-bottom: 3%;
  }
  .btnF {
    font-size: 1rem;
  }

  .servicosrow{
    margin: 2% 0%;
  }
  .divServicos h3 {
    font-size: 1.3rem;
  }
  .imgServico {
    object-fit: cover;
    height: 80px;
    width: 80px;
  }
  .servText {
    margin-top: 5%;
    font-size: 0.8rem;
  }
  .card-body {
    padding: 2%;
  }
  .card-text {
    font-size: 0.5rem;
  }
  .card {
    width: 100px;
  }
  .card img {
    width: 180px;
    height: 100px;
  }
}
</style>