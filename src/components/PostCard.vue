<template>
    <div class="col-8 border p-2 m-3 shadow">

        <div>
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
                <img class="img-fluid rounded-circle creatorImg m-3" :src="postProp.creator.picture" alt="">
            </router-link>
            <div>


                {{ postProp.creator.name }}
                {{ postProp.creator.class }}
                <div v-if="postProp.graduated == true" class="mdi mdi-book"></div>
            </div>

            <p>{{ postProp.createdAt.toLocaleDateString() }}</p>
            <p>{{ postProp.createdAt.toLocaleTimeString() }}</p>


        </div>

        <div class="text-center">
            <img class="img-fluid postImg" :src="postProp.imgUrl" alt="">
        </div>
        <p class="text-center mt-3">
            {{ postProp.body }}
        </p>
        <!-- TODO add button to delete post, make sure this button shows up only if the logged in user created this post -->
        <div v-if="account.id == postProp.creator.id" @click="destroyPost()" role="button" class="mdi mdi-delete fs-2">


        </div>
        <!-- TODO add button to like post -->
        <button @click="likePost()" class="mdi mdi-heart text-end fs-2"> {{ postProp.likes.length }}</button>
    </div>
</template>


<script>

import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostService.js'
import { logger } from '../utils/Logger.js';


export default {
    props: { postProp: { type: Post, required: true } },
    setup(props) {
        return {
            post: computed(() => AppState.posts),
            account: computed(() => AppState.account),

            async destroyPost() {
                try {
                    const yes = await Pop.confirm('Are you sure you want to delete?')
                    if (!yes) {
                        return
                    }
                    const postId = props.postProp.id
                    logger.log(props.postProp.id)
                    await postsService.destroyPost(postId)

                } catch (error) {
                    Pop.error
                }
            },

            async likePost() {
                try {
                    const postId = props.postProp.id
                    await postsService.likePost(postId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.creatorImg {
    height: 10vh;
    width: 10vh;
}

.postImg {
    height: 50vh;



}
</style>