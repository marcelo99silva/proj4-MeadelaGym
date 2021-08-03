<template>
  <div class="footerDiv">
      <b-container>
        <b-row>
          <b-col class="info">
            <div class="md-title">MeadelaGym</div>
            <br>
            <div class="md-content">
              <div>
                Localização: {{info.localizacao}}
              </div>
              <div>
                  Contacto: {{info.contacto}}
              </div>
              <div>
                  Email: {{info.email}}
              </div>
            </div>
          </b-col>
          <b-col class="paginas">
            <div class="md-title">Páginas</div>
            <br>
            <div class="md-content">
              <ul>
                <li><router-link to="/meadelaGym/Servicos" >Serviços</router-link></li>
                <li><router-link to="/meadelaGym/MapaAulas">Mapa de Aulas</router-link></li>
                <li><router-link to="/meadelaGym/Sobre">Sobre</router-link></li>
                <li><router-link to="/meadelaGym/Contactos">Contactos</router-link></li>
              </ul>
            </div>
          </b-col>
          <b-col class="mapaCol col-auto mx-auto">
            <div class="md-map">
              <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d689.4811697806255!2d-8.81016235686658!3d41.704903960457365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b7b4196c4885%3A0x70e2d03e1656d7bd!2sMeadela%20Gym!5e0!3m2!1spt-PT!2spt!4v1621717063500!5m2!1spt-PT!2spt" width="400" height="200" style="border: 1px solid black;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data(){
      return {
        info: {
          localizacao: null,
          contacto: null,
          email: null
        }
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=1",
        })
        .then((response) =>{
          this.info.email = response.data[0].email;
          this.info.contacto = response.data[0].contato;
          this.info.localizacao = response.data[0].morada;
        });
      }      
    }
  }
</script>

<style scoped>
  .footerDiv{
    background-color: #ddd;
  }
  .container {
    padding-top: 40px;
    padding-bottom: 50px;
  }
  .md-title{
    font-size: 1.2rem;
  }
  .md-content{
    font-size: 0.8rem;
  }

  @media (max-width:768px) {
    .md-title{
      font-size: 1rem;
    }
    .md-content{
      font-size: 0.7rem;
    }
    .map {
      width: 250px;
      height: 150px;
    }
  }
  @media only screen and (max-width: 577px) {
    .info {
      margin-left: 15%;
      margin-bottom: 4%;
    }
  }

</style>