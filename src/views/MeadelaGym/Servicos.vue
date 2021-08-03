<template>
  <div class="home">
      
    <NavBar/>

    <div class="banner">
      <b-img class="bannerImage" :src="getImage(bannerImage)" fluid-grow alt="Banner image contactos"></b-img>
      <div class="bannerTitle">
        <p>Serviços</p>
      </div>
    </div>

    <div class="corpo">
      <b-container fluid style="width: 80%">
        <b-row class="acercarow justify-content-center" align-h="center">
          <b-col
            class="col"
            cols="sm-3"
            v-for="serv in servicos"
            :key="serv.nome"
          >
            <b-card class="h-100">
              <b-card-img class="imgServico" :src="getImageServicos(serv.foto)" ></b-card-img>
              <a @click="showDescricao(serv.idServico)" class="hover stretched-link">
                <b-card-text>{{serv.nome}}</b-card-text>
              </a>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-modal id="modalServico" ref="modal-popup" :title='tituloS' ok-only>
        <p class="my-4">{{descricaoS}}</p>
      </b-modal>
    </div>

    <footerComp/>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    name: 'GymServiços',

    components: {
      NavBar: () => import("../../components/navbarGym.vue"),
      footerComp: () => import("../../components/footerGym.vue"),
    },

    data(){
      return {
        bannerImage: 'gym/banner_servicos.png',
        servicos: null,
        tituloS: null,
        descricaoS: null
      }
    },
    created(){
      this.fetch()
    },
    methods: {
      getImage: function(src){
        return "/assets/" + src
      },
      getImageServicos(src){
        return "/assets/gym/servs/" + src
      },
      fetch: function() {
        // serviços
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/servicos?id=1",
        })
        .then((response) =>{
          this.servicos = response.data;
        });
      },
      showDescricao: function(id) {
        this.servicos.forEach( s => {
          if (s.idServico == id){
            this.tituloS = s.nome;
            this.descricaoS = s.descricao;
            this.$refs['modal-popup'].show();
          }
        });
      }
    },

    computed: {
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
  border: 1px solid #000;
  color: #EE933C;
}
.bannerTitle p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.corpo {
  padding: 5% 0% 5% 0%;
  text-align: center;
  font-family: Roboto;
}
.imgServico {
  object-fit: cover;
  height: 150px;
  width: 150px;
}
.servText {
  margin-top: 5%;
  font-size: 1.3rem;
}
.col {
  margin-bottom: 2%;
}

.hover:hover {
  cursor: pointer;
}

@media (max-width:768px) and (min-width:577px) {
  .imgServico {
    object-fit: cover;
    height: 120px;
    width: 120px;
  }
  .servText {
    margin-top: 5%;
    font-size: 1rem;
  }
}

@media (max-width:768px) {
  .bannerTitle p{
    font-size: 1rem;
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
}
</style>