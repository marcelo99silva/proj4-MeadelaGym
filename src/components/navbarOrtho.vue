<template>
  <div>
    <b-navbar toggleable="md" type="light" >
      <b-navbar-brand>
        <router-link to="/">
          <img class="logo" alt="logo" src='/assets/logo_OrthoGym.png'>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <b-icon-list font-scale="1.5"></b-icon-list>
      </b-navbar-toggle>

      <b-collapse class="menu" id="nav-collapse" is-nav>
        <b-navbar-nav center>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/orthoGym">Início</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/orthoGym/Servicos">Produtos</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/orthoGym/Sobre">Sobre</b-nav-item>
          <b-nav-item class="border border-dark" :style="{ width: '8rem' }" to="/orthoGym/Contactos">Contactos</b-nav-item>
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