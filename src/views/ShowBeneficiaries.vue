<script>
import AddBeneficiary from "@/components/AddBeneficiary.vue";
import BeneficiaryService from "@/services/beneficiaryService";
import AuthService from "@/services/authService";

export default {
  name: "ShowBeneficiaries",
  components: {
    AddBeneficiary,
  },
  data() {
    return {
      showingAddBeneficiary: false,
      beneficiaries: [],
      searchQuery: "",
      newName: "",
    };
  },
  created() {
    this.fetchBeneficiaries();
  },
  methods: {
    toggleAddBeneficiary() {
      this.showingAddBeneficiary = !this.showingAddBeneficiary;
    },
    fetchBeneficiaries() {
      AuthService.refreshToken().then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        BeneficiaryService.getBeneficiaries(user.access)
          .then((response) => {
            this.beneficiaries = response;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    searchBeneficiaries() {
      AuthService.refreshToken().then(() => {
        const user = AuthService.getCurrentUser();
        BeneficiaryService.searchBeneficiaries(this.searchQuery, user.access)
          .then((response) => {
            this.beneficiaries = response;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    deleteBeneficiary(id) {
      AuthService.refreshToken().then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        BeneficiaryService.deleteBeneficiary(id, user.access)
          .then(() => {
            this.fetchBeneficiaries();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    editBeneficiary(id, newName) {
      AuthService.refreshToken().then(() => {
        const user = AuthService.getCurrentUser();
        BeneficiaryService.updateBeneficiary(id, { name: newName }, user.access)
          .then(() => {
            this.fetchBeneficiaries();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    addRandomBeneficiary() {
      AuthService.refreshToken().then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        BeneficiaryService.createRandomBeneficiary(user.access)
          .then((response) => {
            alert("Bénéficiaire aléatoire ajouté avec succès");
            this.$emit("beneficiaryAdded", response.data);
            this.fetchBeneficiaries();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
  },
};
</script>

<template>
  <div class="App">
    <h1 class="Title-Beneficiaries-list">
      Gestionnaire de Bénéficiaires Reconnect
    </h1>
    <div class="Add-beneficiary-button-container">
      <button class="Add-beneficiary-button" @click="toggleAddBeneficiary">
        Ajouter un bénéficiaire
      </button>
      <button class="Add-beneficiary-button" @click="addRandomBeneficiary">
        Ajouter un bénéficiaire aléatoire
      </button>
    </div>
    <AddBeneficiary
      v-if="showingAddBeneficiary"
      @beneficiaryAdded="fetchBeneficiaries"
    />
    <input
      v-model="searchQuery"
      class="Search-bar"
      @input="searchBeneficiaries"
      aria-label="Recherche ds bénéficiaires"
      placeholder="Rechercher des bénéficiaires"
    />
    <ul class="Beneficiaries-list">
      <li
        class="Beneficiary-user"
        v-for="beneficiary in beneficiaries"
        :key="beneficiary.id"
      >
        <div class="Button-container">
          <button
            class="Edit-button"
            @click="editBeneficiary(beneficiary.id, newName)"
          >
            <img src="@/assets/svg/pen.svg" alt="pen icon" />
          </button>
          <button
            class="Cross-button"
            @click="deleteBeneficiary(beneficiary.id)"
          >
            <img src="@/assets/svg/cross.svg" alt="cross icon" />
          </button>
        </div>
        <img :src="beneficiary.avatar_url" alt="avatar" />
        {{ beneficiary.name }}
      </li>
    </ul>
  </div>
</template>
<style src="@/assets/css/showBeneficiaries.css"></style>
