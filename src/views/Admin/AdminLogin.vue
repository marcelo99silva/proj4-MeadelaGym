<template>
  <div class="home">
    <div class="spacer" style="height:50px"></div>
    <div class="simple-login-container">
      <h2>Login Backoffice</h2>
      <div class="row">
        <div class="col-md-12 form-group">
          <input type="text" class="form-control" placeholder="Nome de utilizador" v-model='NomeUtilizador' @keyup.enter="login()">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-group">
          <input type="password" placeholder="Palavra-passe" class="form-control" v-model='PasswordAdmin' @keyup.enter="login()">
        </div>
      </div>
      <div class="row center">
          <div class="col-md-12 form-group">
            <input type="submit" class="btn btn-login" @click="login()">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import axios from "axios";

export default {
  data: () => ({
    NomeUtilizador: "",
    PasswordAdmin: ""
  }),
  methods:{
    login: function(){
      if(this.NomeUtilizador.length == 0 || this.PasswordAdmin.length == 0){
        this.$toastr.w("Preencha todos os campos");
        return;
      }
      axios({
          method: "post",
          url: "http://meadelagym.pt/projeto4dev/api/loginAdmin",
          data: {
            NomeUtilizador: this.NomeUtilizador
          },
      })
      .then( (response) => {
        // console.log(response.data);
        if(response.data.length > 0){
          if( bcrypt.compareSync(this.PasswordAdmin, response.data[0].password) ){
            this.$toastr.s("Login com sucesso");
            this.$session.start()
            this.$session.set('admin', response.data[0].nome);
            this.$router.push('admin/MenuMeadela');
          }
          else{
            //console.log('Password Admin errada');
            this.$toastr.e("Email ou password errados");
          }
        }else{
          //console.log('email Admin errado');
          this.$toastr.e("Email ou password errados");
        }
      })
    }
  },
  beforeCreate(){
    if(this.$session.has('admin')){
      this.$router.push('admin/MenuMeadela');
    }
  },
}
</script>

<style  scoped>
  .home{
    background-color:#5286F3;
    font-size: 14px;
    color: #fff;
    height: 100%;
  }
  .simple-login-container{
    border: 1px solid rgb(0, 0, 0);
    padding: 30px;
    width: 350px;
    max-width: 100%;
    margin: 0 auto;
  }
  .simple-login-container h2{
    text-align: center;
    font-size: 1.6rem;
    text-transform: unset;
  }

  .simple-login-container .btn-login{
    background-color: #FF5964;
    color: #fff;
  }
  a{
    color: #fff;
  }
</style>