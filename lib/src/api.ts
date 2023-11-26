import fetch from 'node-fetch'
import { ApiError, KeyError, UUIDError } from './error'
import { checkKey, checkUUID } from './functions'
import {
    VpnType,
    accountBalance,
    accountDetails,
    serviceUUID,
    vpnDetails,
    vpnNodes,
} from './types'
import { setTimeout } from 'timers/promises'

export async function createVPNService(
    host: string,
    key: string,
    type: VpnType,
    node: number
): Promise<serviceUUID> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        let body = { node_id: node, subkind: type, kind: 'vpn' }
        const response = await fetch(`${host}/services/vpn`, {
            method: 'POST',
            headers: { Authorization: key, 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (response.status == 201) {
            const data: unknown = await response.json()

            if (typeof data === 'object' && data !== null) {
                return data as serviceUUID
            } else {
                throw new ApiError(
                    'Invalid response data',
                    response.status,
                    data
                )
            }
        }
        if (response.status == 401) {
            throw new KeyError('Invalid API Key')
        }
        if (response.status == 400) {
            throw new ApiError((await response.json()).message)
        }
        throw new ApiError(
            `Invalid API response code:${response.status}`,
            response.status
        )
    } catch (error) {
        throw error
    }
}

export async function stopVPNService(
    host: string,
    key: string,
    uuid: string
): Promise<boolean> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        if (!checkUUID(uuid)) {
            throw new UUIDError('UUID Required')
        }
        const response = await fetch(`${host}/services/${uuid}/stop`, {
            method: 'GET',
            headers: { Authorization: key },
        })
        if (response.status == 200) {
            return true
        }
        if (response.status == 401) {
            throw new KeyError('Invalid API Key')
        }
        throw new ApiError(
            `Invalid API response code:${response.status}`,
            response.status
        )
    } catch (error) {
        throw error
    }
}

export async function getVPNService(
    host: string,
    key: string,
    uuid: string
): Promise<vpnDetails> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        if (!checkUUID(uuid)) {
            throw new UUIDError('UUID Required')
        }
        for (let i = 0; i < 5; i++) {
            const response = await fetch(`${host}/services/${uuid}/info`, {
                method: 'GET',
                headers: { Authorization: key },
            })
            if (response.status == 200) {
                const data: unknown = await response.json()

                if (typeof data === 'object' && data !== null) {
                    const res = data as vpnDetails

                    if (res.is_ready == true || i == 4) {
                        return res
                    }
                    await setTimeout(2000)
                    continue
                } else {
                    throw new ApiError(
                        'Invalid response data',
                        response.status,
                        data
                    )
                }
            }
            if (response.status == 404) {
                throw new UUIDError('UUID Not found')
            }
            if (response.status == 401) {
                throw new KeyError('Invalid API Key')
            }
            throw new ApiError(
                `Invalid API response code:${response.status}`,
                response.status
            )
        }
    } catch (error) {
        throw error
    }
}

export async function listVPNNodes(
    host: string,
    key: string
): Promise<vpnNodes[]> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        const response = await fetch(`${host}/services/vpn`, {
            method: 'GET',
            headers: { Authorization: key },
        })
        if (response.status == 200) {
            const data: vpnNodes[] = await response.json()

            return data
        }
        if (response.status == 401) {
            throw new KeyError('Invalid API Key')
        }
        throw new ApiError(
            `Invalid API response code:${response.status}`,
            response.status
        )
    } catch (error) {
        throw error
    }
}

export async function getAccountDetails(
    host: string,
    key: string
): Promise<accountDetails> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        const response = await fetch(`${host}/accounts`, {
            method: 'GET',
            headers: { Authorization: key },
        })
        if (response.status == 200) {
            const data: unknown = await response.json()

            if (typeof data === 'object' && data !== null) {
                return data as accountDetails
            } else {
                throw new ApiError(
                    'Invalid response data',
                    response.status,
                    data
                )
            }
        }
        if (response.status == 401) {
            throw new KeyError('Invalid API Key')
        }
        throw new ApiError(
            `Invalid API response code:${response.status}`,
            response.status
        )
    } catch (error) {
        throw error
    }
}

export async function getBalance(
    host: string,
    key: string
): Promise<accountBalance> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        const response = await fetch(`${host}/accounts/balance`, {
            method: 'GET',
            headers: { Authorization: key },
        })
        if (response.status == 200) {
            const data: unknown = await response.json()

            if (typeof data === 'object' && data !== null) {
                return data as accountBalance
            } else {
                throw new ApiError(
                    'Invalid response data',
                    response.status,
                    data
                )
            }
        }
        if (response.status == 401) {
            throw new KeyError('Invalid API Key')
        }
        throw new ApiError(
            `Invalid API response code:${response.status}`,
            response.status
        )
    } catch (error) {
        throw error
    }
}
