<template>
  <div id="custom-table">
    <v-table height="100vh">
      <thead>
        <tr>
          <th class="center">
            Nome
          </th>
          <th class="text-left">
            Idade
          </th>
          <th class="text-left">
            Armas
          </th>
          <th class="text-left">
            Atributo
          </th>
          <th class="text-left">
            Ataque
          </th>
          <th class="text-left">
            Exp
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in responseData" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ calculateAge(item.birthday) }}</td>
          <td>{{ item.weapons.length }}</td>
          <td>{{ item.keyAttribute }}</td>
          <td>{{ item.attributes[item.keyAttribute as keyof AttributesKnight] }}</td>
          <td>{{ calculateExp(item) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

import { KnightDocument, AttributesKnight } from '@/interfaces/Iknight'

export default {
  data() {
    return {
      responseData: [] as KnightDocument[] | null,
    };
  },
  methods: {
    fetchData() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/v1/knights?filter=heroes',
        headers: {}
      };

      axios.request(config)
        .then(async response => {
          this.responseData = await response.data as KnightDocument[];
        })
        .catch(error => {
          console.error('An error occurred while trying to perform this request:', error);
        });
    },
    calculateAge(data: Date) {
      const currentYear = new Date().getFullYear()
      const yearBirth = new Date(data).getFullYear()

      return currentYear - yearBirth
    },
    calculateExp(item: KnightDocument) {
      const age = this.calculateAge(item.birthday)
      let exp = Math.floor((age - 7) * Math.pow(22, 1.45))

      if (exp < 0) {
        exp = 0
      }

      return exp
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
td>a {
  width: 100% !important;
  height: 100% !important;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
