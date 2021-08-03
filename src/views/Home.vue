<template>
<div class="top">
  <div class="bgded overlay" :style="{backgroundImage:`url(${imagemCapa})`}"> 
    <div class="wrapper row1">
      <header id="header" class="hoc clear">
        <div id="logo" class="fl_left"> 
          <h1 style="padding-bottom:15px; font-size:40px">Grupo Meadelagym</h1>
        </div>
      </header>
    </div>

  <div class="wrapper row3" style="background-color: transparent;">
    <main class="hoc container clear"> 
      <section id="introblocks">
        <ul class="nospace group btmspace-80">
          <li class="one_third first"  >
            <figure style="background:white"><router-link to="/fisioGym" class="imgover" ><img class="imagem" src="/assets/logo_FisioGym.png" alt=""></router-link>
              <figcaption style="margin-top:5px">
              </figcaption>
            </figure>
            <router-link to="/fisioGym">
              <b-button class="btnR" pill>Redirecionar</b-button>
            </router-link>
          </li>
          <li class="one_third" >
            <figure style="background:white"><router-link to="/meadelaGym" class="imgover"><img class="imagem" src="/assets/logo_MeadelaGym.png" alt=""></router-link>
              <figcaption style="margin-top:5px">
              </figcaption>
            </figure>
            <router-link to="/meadelaGym">
              <b-button class="btnR" pill>Redirecionar</b-button>
            </router-link>
          </li>
          <li class="one_third" >
            <figure style="background:white"><router-link to="/orthoGym" class="imgover"><img class="imagem" src="/assets/logo_OrthoGym.png" alt=""></router-link>
              <figcaption style="margin-top:5px">
              </figcaption>
            </figure>
            <router-link to="/orthoGym">
              <b-button class="btnR" pill>Redirecionar</b-button>
            </router-link>
          </li>
        </ul>
      </section>
    </main>
  </div>
  </div>
</div>

</template>

<script>
import axios from "axios";
export default {
   data() {
    return {
      imagemCapa: '',
    }
  },
  created(){
    this.fetch()
  },
  methods: {
    getImage(src){
      return "/assets/" + src
    },
    getImageCapa(src){
      return "/assets/gym/mapa/" + src
    },
    fetch: function() {
      // capa
      axios({
        method: "get",
        url: "http://meadelagym.pt/projeto4dev/api/capa",
      })
      .then((response) =>{
        this.imagemCapa = this.getImageCapa(response.data[0].foto);
      });
    }
  },
}
</script>


<style scoped >
  @import '../styles/style.css';
  .bgded, .top {
    height: 100%;
  }
  .imagem{
    width: 240px;
    height: 160px;
  }
  .one_third{
    border: 3px solid orange;
    background-color: white;
  }
  #footer{
    background-color: #1c1c20;
    margin-top: 0vh;
  }
  .btnR {
    background-color: #EE933C !important;
    text-transform: unset !important;
    padding-left: 4%;
    padding-right: 4%;
    margin-top: 0%;
    margin-bottom: 5%;
    font-size: 1rem;
    color: white;
  }
</style>