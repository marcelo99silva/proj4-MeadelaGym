<template>
  <div class="home">
      
    <NavBar/>

    <div class="banner">
      <b-img class="bannerImage" :src="getImage(bannerImage)" fluid-grow alt="Banner image contactos"></b-img>
      <div class="bannerTitle">
        <p>Sobre</p>
      </div>
    </div>

    <div class="divAcerca">
      <b-container fluid>
        <b-row align-h="center">
          <b-col class="imagecol" sm="4">
            <b-img 
              :src="getImage('gym.jpg')"
              rounded>
            </b-img>
          </b-col>
        </b-row>
        <b-row class="acercarow" align-h="center">
          <b-col class="textocol" >
              <div class="divAcercaTexto">
                <p>{{sobre}}</p>
                <b-button class="btnF" pill :to="'Contactos'">Contactar</b-button>
              </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <footerComp/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'FisioSobre',

    components: {
      NavBar: () => import("../../components/navbarFisio.vue"),
      footerComp: () => import("../../components/footerFisio.vue"),
    },

    data(){
      return {
        bannerImage: 'fisio/banner_contactos.png',
        sobre: null
      }
    },
    created(){
      this.fetch()
    },
    mounted(){
    },
    methods: {
      getImage: function(src){
        return "/assets/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=3",
        })
        .then((response) =>{
          this.sobre = response.data[0].sobre;
        });
      },
    },
  }
</script>

<style scoped>
.home {
  background-color: #f2d8b1;
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
  background-color: #f2d8b1;
  border: 1px solid black;  
  color: #fe6c03;
}
.bannerTitle p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.divAcerca {
  padding: 2% 10%;
  text-align: center;
  font-family: Roboto;
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
  background-color: #fe6c03;
  text-transform: unset;
  font-size: 1.5rem;
}

@media (max-width:768px) and (min-width:577px) {
  .divAcerca p {
    font-size: 1rem;
  }
  .btnG {
    font-size: 1rem;
  }
}

@media only screen and (max-width: 577px) {
  .divAcerca p {
    font-size: 0.8rem;
  }
  .btnF {
    font-size: 0.8rem;
  }
}
</style>