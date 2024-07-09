<script>
import BeneficiaryService from "@/services/beneficiaryService";

export default {
  name: "AddBeneficiary",
  data() {
    return {
      name: "",
      avatar_url: "",
    };
  },
  methods: {
    addBeneficiary() {
      const user = JSON.parse(localStorage.getItem("user"));
      BeneficiaryService.createBeneficiary(
        { name: this.name, avatar_url: this.avatar_url },
        user.access
      )
        .then((response) => {
          alert("Bénéficiaire ajouté avec succès");
          this.name = "";
          this.avatar_url = "";
          this.$emit("beneficiaryAdded", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<template>
  <div>
    <form class="form-add-beneficiary" @submit.prevent="addBeneficiary">
      <label for="name">Prénom :</label>
      <input type="text" v-model="name" required />
      <label for="avatar_url">URL de la Photo :</label>
      <input type="text" v-model="avatar_url" required />
      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>
<style src="@/assets/css/addBeneficiary.css"></style>
