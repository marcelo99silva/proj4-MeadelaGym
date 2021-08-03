<template>
  <div class="home">
    <NavBar/>
    
    <div class="carousel">
      <vueper-slides
        autoplay
        fade
        :touchable="false"
        fixedheight="400vh"
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
      <b-button class="btnO" pill :to="'orthoGym/Sobre'">Saber Mais</b-button>
    </div>

    <div class="divServicos">
      <h3>Os Nossos Produtos</h3>
      <b-container fluid>
        <b-row class="acercarow" align-h="center">
          <b-col class="col-md-6">
            <b-card :img-src="getImage(servicos[0].src)" img-top>
              <a href="orthoGym/Servicos/1" class="stretched-link">
                <b-card-text>
                  {{servicos[0].msg}} <b-icon icon="arrow-right"></b-icon>
                </b-card-text>
              </a>
            </b-card>
          </b-col>
          <b-col class="col-md-6">
            <b-card :img-src="getImage(servicos[1].src)" img-top>
              <a href="orthoGym/Servicos/3" class="stretched-link">
                <b-card-text>
                  {{servicos[1].msg}} <b-icon icon="arrow-right"></b-icon>
                </b-card-text>
              </a>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="acercarow" >
          <b-col class="col-md-6">
            <b-card :img-src="getImage(servicos[2].src)" img-top>
              <a href="orthoGym/Servicos/5" class="stretched-link">
                <b-card-text>
                  {{servicos[2].msg}} <b-icon icon="arrow-right"></b-icon>
                </b-card-text>
              </a>
            </b-card>
          </b-col>
          <b-col class="col-md-6">
            <b-card :img-src="getImage(servicos[3].src)" img-top>
              <a href="orthoGym/Servicos/4" class="stretched-link">
                <b-card-text>
                  {{servicos[3].msg}} <b-icon icon="arrow-right"></b-icon>
                </b-card-text>
              </a>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-button class="btnO" pill :to="'orthoGym/Servicos/0'">Ver todos</b-button>
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
    name: 'OrthoHome',

    components: {
      NavBar: () => import("../../components/navbarOrtho.vue"),
      footerComp: () => import("../../components/footerOrtho.vue"),
      VueperSlides, 
      VueperSlide
    },

    data(){
      return {
        servicos: [
          {msg: 'Produtos Ortopédicos', src: 'ortho/servs/produtos.png'},
          {msg: 'Materiais Médico Hospitalares', src: 'ortho/servs/materiais-medicos.png'},
          {msg: 'Calçado Ortopédico', src: 'ortho/servs/calcado.png'},
          {msg: 'Mobiliário/Mobilidade', src: 'ortho/servs/apoio.png'},
        ],
        acerca: null,
        fotosSlide: [],
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
        return "/assets/ortho/slider/" + src
      },
      getImageServicos(src){
        return "/assets/ortho/servs/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=2",
        })
        .then((response) =>{
          this.acerca = response.data[0].miniSobre;
        });
        // fotos slide
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=2",
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
  background-color: #E0E9FF;
}
.nav {
  display:flex;
}

.imageSlider {
  height: 50vh;
}
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
  background-color: #80A5FF;
}
.btnO {
  padding-left: 3%;
  padding-right: 3%;
  margin-top: 2%;
  background-color: #004AFF;
  text-transform: unset;
  font-size: 1.5rem;
}

.divServicos {
  padding: 5% 0% 5% 0%;
  text-align: center;
  font-family: Roboto;
  margin-left: 20%;
  margin-right: 20%;
}
.divServicos h3 {
  margin-bottom: 5%;
  text-transform: unset;
}
.card-text {
  font-size: 1.3rem;
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
  .btnO {
    font-size: 1rem;
  }

  .divServicos h3 {
    font-size: 1.5rem;
  }
  .card-body {
    padding: 5%;
  }
  .card-text {
    font-size: 1rem;
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
  .btnO {
    font-size: 1rem;
  }

  .divServicos h3 {
    font-size: 1.3rem;
  }
  .card {
    margin-bottom: 5%;
  }
  .card-body {
    padding: 5%;
  }
  .card-text {
    font-size: 0.8rem;
  }
}
</style>