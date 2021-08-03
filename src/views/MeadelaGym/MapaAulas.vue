<template>
  <div class="home">
      
    <NavBar/>

    <div class="banner">
      <b-img class="bannerImage" :src="getImage(bannerImage)" fluid-grow alt="Banner image contactos"></b-img>
      <div class="bannerTitle">
        <p>Mapa de Aulas</p>
      </div>
    </div>

    <div>
      <b-modal ref="modal-popup" title="MeadelaGYM" ok-only>
        <p class="my-4">{{mapa}}</p>
      </b-modal>
    </div>

    <div class="space"></div>

    <footerComp/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'GymMapaAulas',

    components: {
      NavBar: () => import("../../components/navbarGym.vue"),
      footerComp: () => import("../../components/footerGym.vue"),
    },

    data(){
      return {
        bannerImage: 'gym/banner_mapaaulas.png',
        mapa: null
      }
    },
    created(){
      this.fetch()
    },

    methods: {
      getImage: function(src){
        return "/assets/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/mapa",
        })
        .then((response) =>{
          this.mapa = response.data[0].descricao;
          this.$refs['modal-popup'].show();
        });
      }
    },

    computed: {
    }
  }
</script>

<style scoped>
.home {
  background-color: #F7F3E9;
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
  background-color: #F7F3E9;
  border: 1px solid black;  
  color: #EE933C;
}
.bannerTitle p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.space {
  height: 300px;
}

@media (max-width:768px) {
  .bannerTitle p{
    font-size: 1rem;
  }
}
</style>