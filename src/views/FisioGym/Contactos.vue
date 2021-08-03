<template>
  <div class="home">
      
    <NavBar/>

    <div class="banner">
      <b-img class="bannerImage" :src="getImage(bannerImage)" fluid-grow alt="Banner image contactos"></b-img>
      <div class="bannerTitle">
        <p>Contactos</p>
      </div>
    </div>

    <div class="corpo">
      <b-container fluid>
        <b-row class="info">
          <b-col>
            <div class="divmap">
              <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d689.4811697806255!2d-8.81016235686658!3d41.704903960457365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd25b7b4196c4885%3A0x70e2d03e1656d7bd!2sMeadela%20Gym!5e0!3m2!1spt-PT!2spt!4v1621717063500!5m2!1spt-PT!2spt" width="450" height="250" style="border: 1px solid black;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </b-col>
          <b-col>
            <div>
              <p>Onde estamos?</p>
              <ul>
                <li><b-icon icon="geo-alt-fill"></b-icon> {{info.localizacao}}</li>
                <li><b-icon icon="telephone-fill"></b-icon> {{info.contacto}}</li>
                <li><b-icon icon="envelope-fill"></b-icon> {{info.email}}</li>
              </ul>
            </div>
              <p>Horário de Funcionamento</p>
              <ul>
                <li><b-icon icon="clock-fill"></b-icon> 2º a 6º: 7h30-13h30 e 14h-20h</li>
                <li><b-icon icon="clock-fill"></b-icon> Sábado: 9h-14h</li>
                <li><b-icon icon="clock-fill"></b-icon> Domingo: Fechado</li>
              </ul>
            <div>
            </div>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-form @submit="onSubmit" >
            <div class="form-row">
              <div class="col">
                <b-form-group
                  id="input-group-1" label="Endereço de email:" label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="email"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col">
                <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.nome"
                    placeholder="nome"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>

            <b-form-group id="input-group-3" label="Assunto:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.assunto"
                placeholder="assunto"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Mensagem:" label-for="input-4">
              <b-form-textarea
                id="input-4"
                v-model="form.mensagem"
                placeholder="mensagem"
                type="text"
                required
                rows="2"
                max-rows="4"
              ></b-form-textarea>
            </b-form-group>
            <div class="form-row">
              <div class="col">
                <b-button type="submit" style="background-color: #fe6c03;" variant="primary">Enviar</b-button>
              </div>
              <div class="col">
                <b-button type="reset" variant="danger">Apagar</b-button>
              </div>
            </div>
          </b-form>
        </b-row>
      </b-container>
    </div>

    <footerComp/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'FisioContactos',

    components: {
      NavBar: () => import("../../components/navbarFisio.vue"),
      footerComp: () => import("../../components/footerFisio.vue"),
    },

    data(){
      return {
        bannerImage: 'fisio/banner_contactos.png',
        info: {
          localizacao: null,
          contacto: null,
          email: null
        },
        form: {
          nome : '',
          email: '',
          assunto: '',
          mensagem: ''
        }
      }
    },
    created(){
      this.fetch()
    },
    methods: {
      getImage(src){
        return "/assets/" + src
      },
      fetch: function() {
        // info empresa
        axios({
          method: "get",
          url: "http://meadelagym.pt/projeto4dev/api/empresa?id=3",
        })
        .then((response) =>{
          this.info.email = response.data[0].email;
          this.info.contacto = response.data[0].contato;
          this.info.localizacao = response.data[0].morada;
        });
      },
      onSubmit() {
        axios({
          method: "post",
          url: "http://meadelagym.pt/projeto4dev/api/email/form?id=2",
          data: {
            nome: this.form.nome,
            email: this.form.email,
            assunto: this.form.assunto,
            mensagem: this.form.mensagem
          }
        })
        .then((response) =>{
        });
      }
    },
  }
</script>

<style scoped>
.home {
  background-color: #f2d8b1;
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
  background-color: #f2d8b1;
  border: 1px solid black;  
  color: #fe6c03;
}
.bannerTitle p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.corpo {
  margin-left: 10%;
  margin-right: 10%;
}

ul li{
  list-style-type: none;
}
.info li {
  font-size: .8rem;
}

.btn {
  text-transform: unset;
}

.row {
  margin-top: 5%;
  margin-bottom: 5%;
}
#input-group-1{
  padding-right: 0;
}

@media (max-width:768px) {
  .bannerTitle p{
    font-size: 1rem;
  }
  .map {
    width: 250px;
    height: 150px;
  }
  }

</style>