
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
        AppState.posts = newPost
        AppState.posts.unshift(newPost)
    }
}


export const postsService = new PostsService