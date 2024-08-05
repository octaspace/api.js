export type accountDetails = {
    deposit_address: string
    ssh_public_key: string
    withdrawal_address: string
}

export type accountBalance = {
    balance: number
}

export type serviceUUID = {
    uuid: string
}

export type VpnType = 'wg' | 'openvpn' | 'http_proxy'

export type proxyConfig = {
    ip: string
    port: number
}

export type serviceDetails = {
    city: string
    config?: string | proxyConfig
    container_id?: string
    ssh_direct?: {
        host: string
        port: number
    }
    ssh_proxy?: {
        host: string
        port: number
    }
    ui?: string
    user_envs?: UserEnvs
    country: string
    ip: string
    is_ready: boolean
    qr?: string
    subkinnd?: VpnType
}

export type vpnNodes = {
    city: string
    country: string
    country_iso: string
    net_down_mbs: number
    net_up_mbs: number
    node_id: number
    reliability: number
    total_price_usd: number
    traffic_price: number
}

export type mrNodes = {
    ai_score: number
    arch: string
    base_price: number
    city: string
    country: string
    country_iso: string
    cpu_cores: number
    cpu_model_name: string
    disk_speed_mbs: number
    free_disk: number
    gpu: {
        amd: {
            idx?: number
            mem_total_mb?: number
            model?: string
        }[]
        nvidia: {
            display_active?: string
            display_mode?: string
            driver_version?: string
            fan_speed?: number
            gpu_temperature?: number
            gpu_utilization?: number
            idx?: number
            mem_free_mb?: number
            mem_total_mb?: number
            mem_utilization?: number
            model?: string
            pcie_link_current?: number
            pcie_link_max?: number
            power_limit_watt?: number
            pstate?: string
        }[]
    }
    is_has_gpu: boolean
    net_down_mbs: number
    net_up_mbs: number
    node_id: number
    reliability: number
    storage_price: number
    total_memory: number
    total_price: number
    total_price_usd: number
    traffic_price: number
}

export interface UserEnvs {
    [key: string]: string
}
