import { AppState } from "../AppState.js"
import { Ads } from "../models/Ads.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AdsService {
    async getAds() {
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState.ads = res.data.map(pojo => new Ads(pojo))
    }
}


export const adsService = new AdsService