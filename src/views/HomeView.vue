<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'
import names from "../names";

const avatarEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";

const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries`;
const loginEndpoint = `${backendUrl}/login`;

function getAvatar(name) {
  return`${avatarEndpoint}${name}.svg?${apiOptions}`;
}

const beneficiaries = ref(null)
  
onMounted(async() => {
  const response = await axios.get(beneficiariesEndpoint);
  beneficiaries.value = response.data;
  console.log(beneficiaries);
})

const beneficiaryNames = [...Array(10).keys()].map(number => ({
  name: names[Math.floor(Math.random() * names.length)]
}));

</script>

}
<template>
  <div class="App">
    <header class="App-header">
      <h1>Gestionnaire de bénéficaires Reconnect</h1>
      <hr/>
      <h3>Non stockés</h3>
      <div class="Beneficiaries-list">
          <div v-for="beneficiary in beneficiaryNames" :key="beneficiary.id"  class="Beneficiary-card">
              <img :src="getAvatar(beneficiary.name)"/>
              <span>{{ beneficiary.name }}</span>
          </div>
      </div>
      <hr/>
      <h3>En base de donnés</h3>
      <div class="Beneficiaries-list">
        <div v-for="beneficiary in beneficiaries" :key="beneficiary.id" class="Beneficiary-card">
            <img :src="getAvatar(beneficiary.name)"/>
            <span>{{ beneficiary.name }}</span>
        </div>
      </div>
    </header>
  </div>
</template>

<style>
.Beneficiaries-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.Beneficiary-card {
  width: 200px;
}

.App-header {
  padding-left: 200px;
  padding-right: 200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.App {
  text-align: center;
}
</style>
