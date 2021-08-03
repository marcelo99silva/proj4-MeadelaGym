<template>
  <div class="home">
    <NavBar/>
    
    <div class="carousel">
      <vueper-slides
        autoplay
        fade
        :touchable="false"
        fixedheight="200vh"
        duration=5000
      >
        <vueper-slide 
          v-for="(p, index) in fotosSlide" 
          :key="index" 
          :image="getImageSlide(p.foto)"
          :title="'O seu Ginásio'"
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
                <p>{{miniSobre}}</p>
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
      <b-button class="btnG" pill :to="'meadelaGym/Sobre'">Saber Mais</b-button>
    </div>

    <div class="divServicos">
      <h3>Os Nossos Serviços</h3>
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
      <b-button class="btnG" pill :to="'meadelaGym/Servicos'">Saber Mais</b-button>
    </div>

    <div class="divParceiros">
      <h3>Parceiros</h3>
      <b-container fluid>
        <b-row class="acercarow justify-content-center" align-v="center">
          <b-col v-if="parceiros" cols="7">
            <vueper-slides
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 10"
              :dragging-distance="70"
              slide-multiple>
              <vueper-slide v-for="(p, index) in parceiros" :key="index" :link=" '//' + p.link" :openInNew="true">
                <template v-slot:content>
                  <b-img class="parceiroImg" :src="getImageParceiros(p.foto)"></b-img>
                </template>
              </vueper-slide>
            </vueper-slides>
          </b-col>
          <b-col v-else>
            Não existem parceiros
          </b-col>
        </b-row>
      </b-container>
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
    name: 'GymHome',

    components: {
      NavBar: () => import("../../components/navbarGym.vue"),
      footerComp: () => import("../../components/footerGym.vue"),
      VueperSlides, 
      VueperSlide
    },

    data(){
      return {
        servicos: null,
        parceiros: null,
        miniSobre: null,
        fotosSlide: []
      }
    },
    created(){
      this.fetch()
    },

    mounted(){

        // fotos slide
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/slideFotos?id=1",
        })
        .then((response) =>{
         // console.log("fotos:" +response.data[0].foto);
          this.fotosSlide = response.data;
        });


    },

    methods: {
      getImage(src){
        return "/assets/" + src
      },
      getImageSlide(src){
        return "/assets/gym/slider/" + src
      },
      getImageServicos(src){
        return "/assets/gym/servs/" + src
      },
      getImageParceiros(src){
        return "/assets/gym/parceiros/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=1",
        })
        .then((response) =>{
          this.miniSobre = response.data[0].miniSobre;
        });
        // serviços
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/servicos?id=1",
        })
        .then((response) =>{
          this.servicos = response.data.slice(0,3);
        });
        // parceiros
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/parceiros?id=1",
        })
        .then((response) =>{
          this.parceiros = response.data;
        });
      }
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
.vueperslides__parallax-wrapper {
  height: 50px;
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
  .vueperslides__parallax-wrapper {
    height: 40px;
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
  .vueperslides__parallax-wrapper {
    height: 40px;
  }
}
</style>
<style scoped>
.home {
  background-color: #F7F3E9;
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
  background-color: #E0E9FF;
}
.btnG {
  padding-left: 3%;
  padding-right: 3%;
  margin-top: 2%;
  background-color: #EE933C;
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
  background-color: #ddd;
  margin-left: 0;
  margin-right: 0;
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

.divParceiros {
  padding: 5% 0% 5% 0%;
  text-align: center;
}
.divParceiros h3 {
  margin-bottom: 5%;
  text-transform: unset;
}
.parceiroImg {
  max-height: 50px;
}
.vueperslides__parallax-wrapper {
  height: 50px;
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
  .btnG {
    font-size: 1rem;
  }

  .servicosrow {
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
  
  .divParceiros h3 {
    font-size: 1.5rem;
  }
  .parceiroImg {
    max-height: 40px;
  }
  .vueperslides__parallax-wrapper {
    height: 40px;
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
  .btnG {
    font-size: 1rem;
  }
  
  .servicosrow {
    margin: 2% 5%;
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
  
  .divParceiros h3 {
    font-size: 1.3rem;
  }
  .parceiroImg {
    max-height: 40px;
  }
  .vueperslides__parallax-wrapper {
    height: 40px;
  }
}
</style>