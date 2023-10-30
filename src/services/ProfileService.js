import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from '../models/Profile.js'
import { Post } from "../models/Post.js"



class ProfileService {
    async getProfile(profileId) {
        AppState.profile = null
        const res = await api(`api/profiles/${profileId}`)
        logger.log(res.data)
        AppState.profile = new Profile(res.data)
    }
    async getProjectsByProfileId(profileId) {
        const res = await api(`api/posts?creatorId=${profileId}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(pojo => new Post(pojo))
    }
}

export const profileService = new ProfileService