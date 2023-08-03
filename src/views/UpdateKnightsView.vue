<template>
  <v-form @submit="handleSubmit">
    <v-text-field v-model="state.nickname" :error-messages="v$.nickname.$errors.map(e => e.$message)" :counter="10"
      label="Apelido" required @input="v$.nickname.$touch" @blur="v$.nickname.$touch"></v-text-field>

    <v-btn class="me-4" type="submit">
      Atualizar
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </v-form>
</template>

<script land="ts" setup>
import axios from 'axios';

import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import router from '../router'

const initialState = {
  nickname: '',
}

const state = reactive({
  ...initialState,
})


const rules = {
  name: { required },
  nickname: { required }
}

const payload = {
  nickname: "",
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

function handleSubmit(event) {
  event.preventDefault();
  payload.nickname = state.nickname

  const { id } = router.currentRoute.value.query

  let config = {
    method: 'PUT',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/v1/knights/update/${id}`,
    headers: {},
    data: payload,
  };

  axios.request(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  router.push('/list')
}

</script>

<style>
form {
  padding: 2rem;
}

.v-input__control {
  background: rgb(160, 228, 205);
  color: black;
}

.v-messages__message {
  color: #fff;
}
</style>

<playground-resources lang="json">
{
  "imports": {
    "vue-demi": "https://cdn.jsdelivr.net/npm/vue-demi/lib/index.mjs",
    "@vuelidate/core": "https://cdn.jsdelivr.net/npm/@vuelidate/core/dist/index.esm.js",
    "@vuelidate/validators": "https://cdn.jsdelivr.net/npm/@vuelidate/validators/dist/index.esm.js"
  }
}
</playground-resources>
