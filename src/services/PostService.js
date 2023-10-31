
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getPosts() {
        const res = await api('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
        logger.log(AppState.posts)
    }
    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('creating post')
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)
    }

    async destroyPost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log(res.data)
    }
    async likePost(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log(res.data)

    }
}


export const postsService = new PostsService