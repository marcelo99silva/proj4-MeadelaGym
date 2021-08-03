<template>
  <div>
    <div class="containerPI">
      <h2>Página não encontrada</h2>
      <div class="row">
        <div class="col-md-12 form-group">
          <h4>A página que tentou aceder não existe, volte à página inicial.</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 center">
          <router-link to="/">
            <b-button style="text-transform: unset" pill>Redirecionar</b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .containerPI {
    border: 1px solid rgb(0, 0, 0);
    padding: 30px;
    width: 350px;
    max-width: 100%;
    margin: 50px auto;
  }
  .containerPI h2{
    text-align: center;
    text-transform: unset;
  }
  .containerPI h4 {
    padding-top: 10px;
    text-transform: unset;
    text-align: center;
  }
  .btn {
    color: white;
  }
</style>