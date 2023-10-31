<template>
  <div class="about text-center row">
    <AdsCard />
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded profileImg" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <form @submit.prevent="editAccount()" class="p-5">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="editable.name" class="form-control" id="name" aria-describedby="name" />
        <div id="emailHelp" class="form-text">
          We'll never share your name with anyone else.
        </div>
      </div>
      <div class="mb-5">
        <label for="picture" class="form-label">Picture</label>
        <input v-model="editable.picture" type="url" class="form-control" id="picture" />
      </div>
      <div class="mb-5">
        <label for="coverImg" class="form-label">Cover Image</label>
        <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" />
      </div>
      <div class="mb-5">
        <label for="github" class="form-label">GitHub</label>
        <input v-model="editable.github" type="url" class="form-control" id="github" />
      </div>
      <div class="mb-5">
        <label for="linkedin" class="form-label">linkedIn</label>
        <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin" />
      </div>
      <div class="mb-5">
        <label for="resume" class="form-label">Resume</label>
        <input v-model="editable.resume" type="url" class="form-control" id="resume" />
      </div>
      <div class="mb-5">
        <input v-model="editable.graduated" class="form-check-input" type="checkbox" value="" id="graduated">
        <label class="form-check-label" for="graduated">graduated</label>
      </div>
      <div class="mb-5">
        <label for="class" class="form-label">class</label>
        <input v-model="editable.class" type="text" class="form-control" id="class" />
      </div>
      <div class="mb-5">
        <label for="bio" class="form-label">Bio</label>
        <textarea v-model="editable.bio" type="text" class="form-control" id="bio" />
      </div>


      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>



<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import AdsCard from "../components/AdsCard.vue";

export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          const accountData = editable.value;
          logger.log(accountData);
          await accountService.editAccount(accountData);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
    };
  },
  components: { AdsCard }
};
</script>

<style scoped>
.profileImg {
  height: 40vh;
  width: 40vw;
}
</style>
