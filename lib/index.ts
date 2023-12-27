import {
    createVPNService,
    getAccountDetails,
    getBalance,
    getVPNService,
    listVPNNodes,
    stopVPNService,
} from './src/api'
import { ApiError, KeyError, UUIDError } from './src/error'
import { VpnType } from './src/types'

class Octa {
    private apikey: string
    private OCTA_ENDPOINT: string = 'https://api.octa.space/v1'

    constructor(apikey: string) {
        this.apikey = apikey
    }

    createVPN(type: VpnType, node: number) {
        return createVPNService(this.OCTA_ENDPOINT, this.apikey, type, node)
    }

    getVPN(uuid: string, retryCount:number, retryDuration:number) {
        return getVPNService(this.OCTA_ENDPOINT, this.apikey, uuid, retryCount, retryDuration)
    }

    stopVPN(uuid: string) {
        return stopVPNService(this.OCTA_ENDPOINT, this.apikey, uuid)
    }

    getVPNNodes() {
        return listVPNNodes(this.OCTA_ENDPOINT, this.apikey)
    }

    getAccountInfo() {
        return getAccountDetails(this.OCTA_ENDPOINT, this.apikey)
    }

    getAccountBalance() {
        return getBalance(this.OCTA_ENDPOINT, this.apikey)
    }
}

export { Octa, KeyError, UUIDError, ApiError }
