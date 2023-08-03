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
          <th class="text-center">
            editar
          </th>
          <th class="text-center">
            remover
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
          <td class="update text-center">
            <router-link :to="{ path: '/update', query: { id: item._id } }">
              <v-icon icon="mdi-square-edit-outline"></v-icon>
            </router-link>
          </td>
          <td class="delete text-center">
            <a @click="deleteKnightById(item._id)">
              <v-icon icon="mdi-delete-forever-outline"></v-icon>
            </a>
          </td>
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
    deleteKnightById(id: string) {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/v1/knights/delete/${id}`,
        headers: {}
      };

      axios.request(config)
        .then(async response => {
          await response.data;
          this.fetchData()
        })
        .catch(error => {
          console.error('An error occurred while trying to perform this request:', error);
        });
    }
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
