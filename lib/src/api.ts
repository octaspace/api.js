import fetch from 'node-fetch'
import { ApiError, InvalidParameterError, KeyError, UUIDError } from './error'
import { checkKey, checkUUID, wait } from './functions'
import {
    MRCreate,
    UserEnvs,
    VPNCreate,
    VpnType,
    accountBalance,
    accountDetails,
    mrNodes,
    serviceDetails,
    serviceUUID,
    v2rayKinds,
    vpnNodes,
} from './types'
import { setTimeout } from 'timers/promises'

export async function createVPNService(
    host: string,
    key: string,
    type: VpnType,
    node: number,
    protocol?: v2rayKinds
): Promise<serviceUUID> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        if (type != 'v2ray' && protocol) {
            throw new InvalidParameterError(
                'Protocol can only be specified for v2ray VPN type'
            )
        }
        let body: VPNCreate = {
            node_id: node,
            subkind: type,
            ...(protocol && { protocol }),
        }
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

export async function stopService(
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

export async function getService(
    host: string,
    key: string,
    uuid: string,
    retryCount: number,
    retryDuration: number
): Promise<serviceDetails> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        if (!checkUUID(uuid)) {
            throw new UUIDError('UUID Required')
        }
        for (let i = 0; i < retryCount; i++) {
            const response = await fetch(`${host}/services/${uuid}/info`, {
                method: 'GET',
                headers: { Authorization: key },
            })
            if (response.status == 200) {
                const data: unknown = await response.json()

                if (typeof data === 'object' && data !== null) {
                    const res = data as serviceDetails

                    if (res.is_ready == true || i == retryCount - 1) {
                        return res
                    }
                    await wait(retryDuration)
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

export async function listMRNodes(
    host: string,
    key: string
): Promise<mrNodes[]> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        const response = await fetch(`${host}/services/mr`, {
            method: 'GET',
            headers: { Authorization: key },
        })
        if (response.status == 200) {
            const data: mrNodes[] = await response.json()

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

export async function createMRService(
    host: string,
    key: string,
    image: string,
    disk: number,
    node: number,
    envs?: UserEnvs,
    app?: string,
    http_ports?: number[],
    ports?: number[],
    start_command?: string
): Promise<serviceUUID> {
    try {
        if (!checkKey(key)) {
            throw new KeyError('Invalid API Key')
        }
        if (disk < 1) {
            throw new ApiError('Invalid Disk Size, should be atleast 1GB')
        }
        if (!envs) {
            envs = {}
        }
        let body: MRCreate = {
            node_id: node,
            image: image,
            disk_size: Math.round(disk),
            ...(app && { app }),
            ...(envs && Object.keys(envs).length > 0 && { envs }),
            ...(http_ports && http_ports.length > 0 && { http_ports }),
            ...(ports && ports.length > 0 && { ports }),
            ...(start_command && { start_command }),
        }
        const response = await fetch(`${host}/services/mr`, {
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
