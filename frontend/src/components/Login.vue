<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card
            class="account-card border-0 shadow p-5 mb-5 mt-3 bg-white rounded"
          >
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h3">Connexion</b-card-text>
              <b-form>
                <b-form-group>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                   
                    class="account-input text-dark mb-2 pl-3 w-100"
                    aria-label="Écrire votre adresse mail"
                  ></b-form-input>
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    
                    class="account-input text-dark mb-2 pl-3 w-100"
                    aria-label="Écrire votre mot de passe"
                  ></b-form-input>
                </b-form-group>

                <button
                  v-on:click.stop="signup()"
                  type="submit"
                  id="signup-button"
                  class="account-btn font-weight-bold"
                  aria-label="S'inscrire"
                >
                  Continuer
                </button>
                <p class="my-3 text-reset"></p>
              </b-form>
            </div>
            <div class="line my-3"></div>

            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Vous n'avez pas encore de compte ?
              <router-link to="/signup" class="font-weight-bold ml-1">
               S'inscrire</router-link>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
    name: 'Login',
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #2c3e50 !important;
}
.account-btn {
  background-color: rgba(231, 8, 27, 0.8);
  color: rgb(255, 255, 255);
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.375rem 0.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: rgb(253, 45, 6);
    color: black;
    outline: none;
  }
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .account-card {
    .card-body {
      padding: 0.7rem;
    }
  }
  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
  .login-text {
    font-size: 1.1rem;
  }
}
</style>
