<template>
      <v-sheet class="mx-auto" elevation="8">
    <v-container class="mx-1" style="padding-left:0">
      <v-row>
        <v-col cols="4">
      
          <v-navigation-drawer class="corMenu"  permanent :height="altura_ecra" style="background-color: #F7F3E9" >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Admin</v-list-item-title>
                <!-- <v-list-item-subtitle>email</v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-btn medium elevation="15" class="my-2" style="width:210px ; padding:0 0 0 10px; margin-left:10px" link :to="'/admin/MenuMeadela'">MeadelaGym<img src="../../assets/logo_MeadelaGym.png" style="float: right; width:80px; margin-left:5px;margin:0;
                padding:0; margin:auto"> </v-btn>
              <br>
            <v-btn medium elevation="2" class="my-2" style="width:210px ; padding:0 0 0 10px ; margin-left:10px" link :to="'/admin/MenuOrtho'">OrthoGym <img src="../../assets/logo_OrthoGym.png" style=" float: right; width:80px; margin-left:5px; margin:auto"> </v-btn>           
              <br>
            <v-btn medium elevation="2" class="my-2" style="width:210px ; padding:0 0 0 10px ; margin-left:10px" link :to="'/admin/MenuFisio'">FisioGym  <img src="../../assets/logo_FisioGym.png" style=" width:80px ; margin-left:5px; margin:auto;float: right">  </v-btn>
              <br>

            <v-divider style="background-color: black"></v-divider>

            <!-- *********************************************** -->

            <!-- <MenuMeadela v-show="content===1"/> -->
            <!-- <MenuOrthogym v-show="content===2"/>
            <MenuFisiogym v-show="content===3"/> -->

            <v-list dense nav style="background-color: #F7F3E9 ; padding:0 ; margin:0">
    <v-list-item link @click="showDados">
    <v-list-item-icon>
        <v-icon>mdi-database</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Dados de Empresa</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item link @click="showServicos">
    <v-list-item-icon>
        <v-icon>mdi-history</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Serviços</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item  link @click="showSlideFotos">
    <v-list-item-icon>
        <v-icon>mdi-image</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Slide Fotos</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item link @click="showParceiros">
    <v-list-item-icon>
        <v-icon>mdi-handshake</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Parceiros</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item  link @click="showMapaAulas">
    <v-list-item-icon>
        <v-icon>mdi-map</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title >Mapa de aulas</v-list-item-title>
    </v-list-item-content>
    </v-list-item>
    
    <v-list-item  link @click="showCapa">
    <v-list-item-icon>
        <v-icon>mdi-image</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title >Imagem de capa</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    
</v-list>


<!-- *********************************************************** -->
            <template v-slot:append>
              <div class="pa-2">
                <v-btn color="#DD2C00"  large block @click="logout()">Logout</v-btn>
              </div>
            </template>
          </v-navigation-drawer>

 
         
        </v-col>


      <v-col cols="8">
          <PaginaDadosEmpresaMeadela v-show="content===1"></PaginaDadosEmpresaMeadela>
          <ServicosMeadela v-show="content===2"></ServicosMeadela>
          <ParceirosMeadela v-show="content===3"></ParceirosMeadela>
          <SlideFotosMeadela v-show="content===4"></SlideFotosMeadela>
          <MapaAulas v-show="content===5"></MapaAulas>
          <ImagemCapa v-show="content===6"></ImagemCapa>
         
          
         
      </v-col>

        
      </v-row>
    </v-container>
  </v-sheet>

</template>

<script>
import ImagemCapa from '../../components/ImagemCapa.vue';
//import axios from "axios";


import { painel } from '../../components/MenuMeadela';



export default {
   components: {
        MenuMeadela: () => import("../../components/MenuMeadela"),
        MenuFisiogym: () => import("../../components/MenuFisiogym"),
        MenuOrthogym: () => import("../../components/MenuOrthogym"),
        PaginaDadosEmpresaMeadela: () => import("../../components/PaginaDadosEmpresaMeadela"),
        ServicosMeadela: () => import("../../components/ServicosMeadela"),
        ParceirosMeadela: () => import("../../components/ParceirosMeadela"),
        SlideFotosMeadela: () => import("../../components/SlideFotosMeadela.vue"),
        MapaAulas: () => import("../../components/MapaAulas.vue"),
        ImagemCapa: () => import("../../components/ImagemCapa.vue"),
   },
  data() {
    return {
      content: 1,
      painel,
      altura_ecra: 0
    };
  },

  methods: {
    showDados: function() {
      this.content = 1;
    },
    showServicos: function() {
      this.content = 2;
    },
    showParceiros: function() {
      this.content = 3;
    },

    showSlideFotos: function() {
      this.content = 4;
    },
    showMapaAulas: function() {
      this.content = 5;
    },
    showCapa: function() {
      this.content = 6;
    },
    
    handleResize() {
      this.altura_ecra = window.innerHeight - 10;
    },
    logout: function(){
      this.$session.destroy();
      this.$router.push({ path: '/admin'});
    }
    
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeCreate(){
    if(!this.$session.has('admin')){
      this.$router.push({ path: '/admin'});
    }
  },
};
</script>

<style>
  body{
    background-color: white;
  }

.ll{
    float: right;
    align-items: flex-end;
    align-self: flex-end;
}

.corMenu{
  background-color: #F7F3E9;
  position: fixed;
  margin: 10px 0 0 5px;
}

</style>