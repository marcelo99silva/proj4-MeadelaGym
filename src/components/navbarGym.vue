<template>
  <div>
    <b-navbar toggleable="md" type="light" >
      <b-navbar-brand>
        <router-link to="/">
          <img class="logo" alt="logo" src='/assets/logo_MeadelaGym.png'>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"><b-icon-list font-scale="1.5"></b-icon-list></b-navbar-toggle>

      <b-collapse class="menu" id="nav-collapse" is-nav>
        <b-navbar-nav center>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/meadelaGym">Início</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/meadelaGym/Servicos">Serviços</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ }" to="/meadelaGym/MapaAulas">Mapa de Aulas</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/meadelaGym/Sobre">Sobre</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/meadelaGym/Contactos">Contactos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    
  </div>
</template>

<script>
</script>

<style scoped>
  .menu{
    text-align: center;
  }
  .logo {
    max-width: 180px;
  }
  .navbar-nav{
    align-items: center;
  }
  @media only screen and (max-width: 767px) {
    .logo {
      max-width: 100px;
    }
    .navbar-nav{
      flex-direction: row;
      justify-content: center;
    }
    .nav-item {
      width: 100% !important;;
    }
  }
  @media only screen and (max-width: 577px) {
    .nav-item {
      width: 100% !important;
    }
    .navbar-nav{
      flex-direction: column;
    }
  }
</style>