<template>
  <div id="custom-table">
    <v-table height="100vh">
      <thead>
        <tr>
          <th class="text-left">
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
          <th class="text-left">
            editar
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in        responseData       " :key="index">
          <td>{{ item.name }}</td>
          <td>{{ calculateAge(item.birthday) }}</td>
          <td>{{ item.weapons.length }}</td>
          <td>{{ item.keyAttribute }}</td>
          <td>{{ item.attributes[item.keyAttribute as keyof AttributesKnight] }}</td>
          <td>{{ calculateExp(item) }}</td>
          <td>
            <router-link :to="{ path: '/edit', query: { id: item._id } }">
              <v-icon icon="mdi-square-edit-outline"></v-icon>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { mdiSquareEditOutline } from '@mdi/js';

import { KnightDocument, AttributesKnight } from '@/interfaces/Iknight'

export default {
  data() {
    return {
      responseData: [] as KnightDocument[] | null,
      icons: {
        mdiSquareEditOutline
      }
    };
  },
  methods: {
    fetchData() {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/v1/knights',
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
      const exp = Math.floor((age - 7) * Math.pow(22, 1.45))

      return exp
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
td a i {
  width: 100%;
  height: 18px;
}
</style>
