<template>
      <v-sheet class="mx-auto" elevation="8">
    <v-container class="mx-1" style="padding-left:0">
      <v-row>
        <v-col cols="4">
      
          <v-navigation-drawer class="corMenu"  permanent :height="altura_ecra" style="background-color: #f2d8b1" >
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

            <v-list dense nav style="background-color: #f2d8b1 ; padding:0 ; margin:0">
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

    <v-list-item  link @click="showSlide">
    <v-list-item-icon>
        <v-icon>mdi-image</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Slide Fotos</v-list-item-title>
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

         <!-- <MenuMeadela v-show="content===1"/> -->

      <v-col cols="8">
          <PaginaDadosEmpresaFisio v-show="content===1"></PaginaDadosEmpresaFisio>
          <!-- <ParceirosMeadela v-show="content===2"></ParceirosMeadela> -->
          <ServicosFisiogym v-show="content===2"></ServicosFisiogym>
          <SlideFotosFisio v-show="content===3"></SlideFotosFisio>
          
         
      </v-col>

        
      </v-row>
    </v-container>
  </v-sheet>

</template>

<script>
//import axios from "axios";
import Imagem from "../../assets/logo_FisioGym.png"; 


import { painel } from '../../components/MenuMeadela';



export default {
   components: {
       // Imagem,
        MenuMeadela: () => import("../../components/MenuMeadela"),
        MenuFisiogym: () => import("../../components/MenuFisiogym"),
        MenuOrthogym: () => import("../../components/MenuOrthogym"),
        PaginaDadosEmpresaFisio: () => import("../../components/PaginaDadosEmpresaFisio"),
        ServicosFisiogym: () => import("../../components/ServicosFisiogym.vue"),
        SlideFotosFisio: () => import("../../components/SlideFotosFisio.vue"),
        // ParceirosMeadela: () => import("../../components/ParceirosMeadela"),
//     DetalhesConta: () => import("@/components/DetalhesConta"),
//     HistoricoCompras: () => import("@/components/HistoricoCompras"),
//     EventosGuardados: () => import("@/components/EventosGuardados"),
//     GestaoSistema: () => import("@/components/GestaoSistema")
   },
  data() {
    return {
         icons: {
            Imagem
            },
      user: "",
      content: 1,
      painel,
      // painel: Window.foo,
      altura_ecra: 0
    };
  },

  methods: {

    logout: function(){
      this.$session.destroy();
      this.$router.push({ path: '/admin'});
    },

    showDados: function() {
      this.content = 1;
    },
    showServicos: function() {
      this.content = 2;
    },
    showSlide: function() {
      this.content = 3;
    },
    
    handleResize() {
      this.altura_ecra = window.innerHeight - 10;
    },
    logout: function(){
      this.$session.destroy();
      this.$router.push({ path: '/admin'});
    },
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
  // mounted(){
  //     document.getElementById("corMenu").style.backgroundColor= "#F7F3E9";
  //     document.getElementById("corMenu").style.padding = 0;
  //     console.log(painel);
  //   }
};
</script>

<style>
  body{
    background-color:white;
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