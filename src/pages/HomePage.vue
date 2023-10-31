<template>
  <div class="container-fluid">
    <div class="row">
      <AdsCard />
      <div class="col-12 text-center m-3">
        <button v-if="account.id" class="btn btn-dark" type="button" title="Open" data-bs-toggle="modal"
          data-bs-target="#postFormModal">
          Create Post
        </button>
      </div>
    </div>
    <div class="row justify-content-center">

      <div v-for="post in posts" :key="post.id">

        <PostCard :postProp="post" />

      </div>

    </div>

  </div>

  <!-- TODO ad buttons for page navigation, reference vueflix or pokedex -->

  <CreatePost />
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostService.js'
import { AppState } from '../AppState.js'
import CreatePost from '../components/CreatePost.vue';
import AdsCard from '../components/AdsCard.vue';

export default {
  setup() {
    onMounted(() => {
      getPosts();
    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }

    }
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    };
  },
  components: { CreatePost, AdsCard }
}
</script>

<style scoped lang="scss"></style>
