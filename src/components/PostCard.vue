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
        <p class="mdi mdi-heart text-end fs-2"> {{ postProp.likes.length }}</p>
    </div>
</template>


<script>

import { Post } from '../models/Post.js';

export default {
    props: { postProp: { type: Post, required: true } },
    setup(props) {
        return {}
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