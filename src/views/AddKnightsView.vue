<template>
  <v-form @submit="handleSubmit">
    <v-text-field v-model="state.name" :error-messages="v$.name.$errors.map(e => e.$message)" :counter="10" label="Name"
      required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

    <v-text-field v-model="state.nickname" :error-messages="v$.name.$errors.map(e => e.$message)" :counter="10"
      label="Apelido" required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>


    <v-select v-model="state.select" :items="items" :error-messages="v$.select.$errors.map(e => e.$message)"
      label="Vocação" required @change="v$.select.$touch" @blur="v$.select.$touch"></v-select>

    <v-text-field type="date" v-model="state.birthday" :error-messages="v$.name.$errors.map(e => e.$message)"
      :counter="10" label="Data de Nascimento" required @input="v$.name.$touch" @blur="v$.name.$touch"></v-text-field>

    <v-btn class="me-4" type="submit">
      cadastrar
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
  name: '',
  nickname: '',
  birthday: '',
  select: null,
}

const state = reactive({
  ...initialState,
})

const items = [
  'Knight',
  'Paladin',
  'Druid',
  'Sorcerer',
]

const rules = {
  name: { required },
  select: { required },
  items: { required },
}

const payload = {
  name: "",
  nickname: "",
  birthday: "",
  weapons: [
    {
      name: "sword",
      mod: 3,
      attr: "strength",
      equipped: true
    }
  ],
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  },
  keyAttribute: "strength"
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

  payload.name = state.name
  payload.nickname = state.nickname
  payload.birthday = state.birthday
  payload.weapons[0].mod = Math.floor(Math.random() * 21) - 10

  let knights = [];

  let config = {
    method: 'GET',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/v1/knights',
    headers: {},
  };

  axios.request(config)
    .then((response) => {
      knights.push(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  const existsKnight = knights.filter(knight => kn.name === payload.name && kn.nickname === payload.nickname)

  if (existsKnight.length) {
    return alert("AQUI PODE SER POSTO UM MODAL",)
  }

  addKnight('POST', `http://localhost:3000/api/v1/knights/create/`, payload)

  router.push('/list')
}

function addKnight(method, url, data) {
  let config = {
    method,
    maxBodyLength: Infinity,
    url,
    headers: {},
    data
  };

  axios.request(config)
    .then(response => response)
    .catch(error => {
      console.error('An error occurred while trying to perform this request:', error);
    });
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
