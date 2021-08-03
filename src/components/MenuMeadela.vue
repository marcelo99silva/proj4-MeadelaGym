!<template>
    <v-list dense nav style="background-color: #F7F3E9 ; padding:0 ; margin:0">
    <v-list-item link @click="showServicos">
    <v-list-item-icon>
        <v-icon>mdi-database</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Dados de Empresa</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item link @click="showParceiros">
    <v-list-item-icon>
        <v-icon>mdi-history</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Serviços</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item >
    <v-list-item-icon>
        <v-icon>mdi-chart-areaspline</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
        <v-list-item-title>Slide Fotos</v-list-item-title>
    </v-list-item-content>
    </v-list-item>

    <v-list-item >
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
    </v-list-item>
<!-- 
          <v-col cols="8">
          <ParceirosMeadela v-show="painel===5"></ParceirosMeadela>
          <ServicosMeadela v-show="painel===4"></ServicosMeadela>
          
         
      </v-col> -->

</v-list>


</template>


<script>
const painel = 4;

export { painel }


export default {


   components: {

        ServicosMeadela: () => import("../components/ServicosMeadela"),
        ParceirosMeadela: () => import("../components/ParceirosMeadela"),

   },

  data() {
    return {

        painel
        //altura_ecra: 0
    }
  },

  methods: {
    showServicos: function() {
        this.painel = 4;
    },
    showParceiros: function() {
     this.painel = 5;
   

    },
 
    
  },
};
</script>


<style>


.menuCor{
    background-color: bisque;
}
</style>