<template>
    <div class="col-4">
        <div v-for="ad in ads" :key="ad.id">
            <img class="img-fluid" :src="ad.square" alt="">
        </div>
    </div>
</template>


<script>

import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js';
import { AppState } from '../AppState.js'
export default {

    setup() {
        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error)
            }

        }
        onMounted(() => {
            getAds()
        })
        return {
            ads: computed(() => AppState.ads)
        }
    }
};
</script>


<style lang="scss" scoped></style>