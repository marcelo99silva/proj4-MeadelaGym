<template>
      <div class="ff" style="margin:15px">
    <h1>Editar informações da empresa</h1>
    <v-divider />


    <v-sheet class="overflow-y-auto" elevation="2" style="margin:20px;" :height="altura_ecra">
      <v-tabs fixed-tabs background-color="#757575" >
        <v-tab>Dados empresa</v-tab>
        <v-tab>Descrições</v-tab>

        <v-tab-item>
          <DadosEmpresaOrtho />
        </v-tab-item>
        <v-tab-item>
          <DescricoesEmpresaOrtho />
        </v-tab-item>
      </v-tabs>
    </v-sheet>

  </div>
</template>



<script>

export default {
   components: {   
        DadosEmpresaOrtho: () => import("../components/DadosEmpresaOrtho"),
        DescricoesEmpresaOrtho: () => import("../components/DescricoesEmpresaOrtho"),
   },
  data() {
    return {
 
      // dados:1,
      altura_ecra: 0
    };
  },

};
</script>


<style scoped>

.infoEmpresaMeadela{
    display: block ruby;
    margin-left: 20px;
}

.inputEmpresaMeadela{
    margin-left: 20px;
    border: 1px solid black;
}

.camposEmpresaMeadela{
    width: 100px;
      /* background-color: blue; */
}

.tituloMeadela{
    background-color: rgb(226, 221, 221);
    font-weight: bold;
    display: inline-block;
    margin-bottom: 10px;
    padding:  0 10px;
}

/* .camposEmpresaMeadela p :nth-child(2n+1){
    background-color: blue;
} */

.containerMenu {
    /* height: 600px; */
    padding: 0px 10%;
    /* display:flex; */
    /* align-items: center; */
    /* justify-content: center;  */
    /* margin-top: 30px; */
    padding-bottom: 70px;
    margin-top: -35px;
    /* padding:0; */
} 

.menu2{


    /* margin-left: 15px;
    width: 30%; */
    /* width: 100%; */
    display:flex;
    padding: 0px 10px;
    margin-top: 50px;
    border-radius: 50px;
    background-color: #545452;
    align-items: center;
    justify-content: center; 
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.submenu{
    border-right: 2px solid white;
    width: 100%;
}

.submenu2{
    /* padding: 0px 5px ; */
    width: 100%;
}

.submenu, a{  
    padding: 0px 5px ;
    /* color: black; */
}

.butoes2:link, .butoes2:visited { 
  color: white;
  text-decoration: none;
  cursor: pointer;
}

</style>