<template>
      <v-sheet class="mx-auto" elevation="8">
    <v-container class="mx-1" style="padding-left:0">
      <v-row>
        <v-col cols="4">
      
          <v-navigation-drawer class="corMenu"  permanent :height="altura_ecra" style="background-color: #E0E9FF" >
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

    <v-list dense nav style="padding:0 ; margin:0">
    <v-list-item link @click="showDados">
    <v-list-item-icon>
        <v-icon>mdi-database</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Dados de Empresa</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item link @click="showProdutos">
    <v-list-item-icon>
        <v-icon>mdi-history</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Produtos</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item link @click="showSlideFotos">
    <v-list-item-icon>
        <v-icon>mdi-image</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Slide Fotos</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <!-- <v-list-item>
    <v-list-item-icon>
        <v-icon>mdi-chart-areaspline</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Parceiros</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item  >
    <v-list-item-icon>
        <v-icon>mdi-database</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title >Mapa de aulas</v-list-item-title>
    </v-list-item-content>
    </v-list-item> -->

    
</v-list>


<!-- *********************************************************** -->
            <template v-slot:append>
              <div class="pa-2">
                <v-btn color="#DD2C00" large block @click="logout()">Logout</v-btn>
              </div>
            </template>
          </v-navigation-drawer>

 
         
        </v-col>

         <!-- <MenuMeadela v-show="content===1"/> -->

      <v-col cols="8">
          <PaginaDadosEmpresaOrtho v-show="content===1"></PaginaDadosEmpresaOrtho>
          <ProdutosOrtho v-show="content===2"></ProdutosOrtho>
          <SlideFotosOrtho v-show="content===3"></SlideFotosOrtho>
          <!-- <ParceirosMeadela v-show="content===2"></ParceirosMeadela>
          <ServicosMeadela v-show="content===3"></ServicosMeadela> -->
          
         
      </v-col>

        
      </v-row>
    </v-container>
  </v-sheet>

</template>

<script>
//import axios from "axios";
import Imagem from "../../assets/logo_FisioGym.png"; 


import { painel } from '../../components/MenuMeadela';
import ProdutosOrtho from '../../components/ProdutosOrtho.vue';



export default {
   components: {
       // Imagem,
        MenuMeadela: () => import("../../components/MenuMeadela"),
        MenuFisiogym: () => import("../../components/MenuFisiogym"),
        MenuOrthogym: () => import("../../components/MenuOrthogym"),
        PaginaDadosEmpresaOrtho: () => import("../../components/PaginaDadosEmpresaOrtho"),
        SlideFotosOrtho: () => import("../../components/SlideFotosOrtho"),


        ServicosMeadela: () => import("../../components/ServicosMeadela"),
        ParceirosMeadela: () => import("../../components/ParceirosMeadela"),
        ProdutosOrtho: () => import("../../components/ProdutosOrtho"),
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
    showProdutos: function() {
      this.content = 2;
    },
    showSlideFotos: function() {
      this.content = 3;
    },
    
    handleResize() {
      this.altura_ecra = window.innerHeight -10;
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