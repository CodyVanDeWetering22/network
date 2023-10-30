<template>
    <div class="container-fluid">
        <AdsCard />
        <div v-if="profile" class="row">
            <div class="col-12">
                <img class="img-fluid coverImg" :src="profile.coverImg" alt="">
            </div>
            <div class="text-center"><img class="img-fluid rounded-circle creatorImg m-3" :src="profile.picture" alt="">
                <h1>{{ profile.name }}
                    {{ profile.class }}
                </h1>
                <i v-if="profile.graduated == true" class="mdi mdi-book"></i>

                <a v-if="profile.linkedin != ''" :href="profile.linkedin" :title="`${profile.name}`"><i
                        class="mdi fs-1 mdi-linkedin"></i></a>

                <a v-if="profile.github != ''" :href="profile.github" :title="`${profile.name}`"><i
                        class="mdi fs-1 mdi-github"></i></a>


                <a v-if="profile.resume != ''" :href="profile.resume" :title="`${profile.name}`"><i
                        class="mdi fs-1 mdi-file"></i></a>

            </div>


            <p class="fs-2 text-center">{{ profile.bio }}</p>

            <div class="row">
                <div v-for="post in posts" :key="post.id" class="col-12">
                    <PostCard :postProp="post" />
                </div>
            </div>




        </div>


    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js'
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import AdsCard from '../components/AdsCard.vue';

export default {
    setup() {
        onMounted(() => {
            getProfile();
            getProjectsByProfileId();
        });
        const route = useRoute();
        async function getProfile() {
            const profileId = route.params.profileId;
            logger.log(profileId);
            await profileService.getProfile(profileId);
        }
        async function getProjectsByProfileId() {
            try {
                const profileId = route.params.profileId;
                await profileService.getProjectsByProfileId(profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.profile)
        };
    },
    components: { PostCard, AdsCard }
};
</script>


<style lang="scss" scoped>
.coverImg {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.creatorImg {
    height: 20vh;
    width: 20vh;
}
</style>