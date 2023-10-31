<template>
    <div class="modal fade" id="postFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form @submit.prevent="handleSubmit()">
                        <div class="mb-3">
                            <!-- FIXME make sure you are sending the correct value to the API for the post's imgUrl -->
                            <label for="imgUrl" class="form-label">Post url</label>
                            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl">
                        </div>
                        <div class="mb-3">
                            <label for="body" class="form-label">body</label>
                            <input v-model="editable.body" type="text" class="form-control" id="body">
                        </div>
                        <div class="text-end">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Modal } from 'bootstrap';
import { postsService } from '../services/PostService.js';
import Pop from '../utils/Pop.js'
import { ref } from 'vue';




export default {
    setup() {
        const editable = ref({})

        return {
            editable,
            handleSubmit() {

                if (!editable.value.id) {
                    this.createPost()

                }
            },
            async createPost() {
                try {

                    const postData = editable.value
                    await postsService.createPost(postData)

                    editable.value = {}

                    Modal.getOrCreateInstance('#postFormModal').hide()

                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>