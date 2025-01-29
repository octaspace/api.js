import {
    createMRService,
    createVPNService,
    getAccountDetails,
    getBalance,
    getService,
    listMRNodes,
    listVPNNodes,
    stopService,
} from './src/api'
import { ApiError, KeyError, UUIDError } from './src/error'
import { UserEnvs, VpnType } from './src/types'

class Octa {
    private apikey: string
    private OCTA_ENDPOINT: string = 'https://api.octa.computer'

    constructor(apikey: string) {
        this.apikey = apikey
    }

    getNetworkInfo() {
        return getBalance(this.OCTA_ENDPOINT, this.apikey)
    }

    createVPN(type: VpnType, node: number) {
        return createVPNService(this.OCTA_ENDPOINT, this.apikey, type, node)
    }

    getVPN(uuid: string, retryCount: number, retryDuration: number) {
        return getService(
            this.OCTA_ENDPOINT,
            this.apikey,
            uuid,
            retryCount,
            retryDuration
        )
    }

    stopVPN(uuid: string) {
        return stopService(this.OCTA_ENDPOINT, this.apikey, uuid)
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

    getMRNodes() {
        return listMRNodes(this.OCTA_ENDPOINT, this.apikey)
    }

    createMR(image: string, disk: number, node: number, envs?: UserEnvs) {
        return createMRService(
            this.OCTA_ENDPOINT,
            this.apikey,
            image,
            disk,
            node,
            envs
        )
    }

    getMR(uuid: string, retryCount: number, retryDuration: number) {
        return getService(
            this.OCTA_ENDPOINT,
            this.apikey,
            uuid,
            retryCount,
            retryDuration
        )
    }

    stopMR(uuid: string) {
        return stopService(this.OCTA_ENDPOINT, this.apikey, uuid)
    }
}

export { Octa, KeyError, UUIDError, ApiError }
