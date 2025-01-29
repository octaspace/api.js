export type accountDetails = {
    wallet: string
    account_uuid: string
    avatar: string
    email: string
    balance: number
    uid: number
}

export type accountBalance = {
    balance: number
}

export type serviceUUID = {
    uuid: string
}

export type ServiceType = 'mr' | 'render' | 'vpn'

export type VpnType = 'wg' | 'openvpn' | 'http_proxy' | 'v2ray' | 'ss'

export type proxyConfig = {
    ip: string
    port: number
}

export type v2rayKinds = 'vmess' | 'vless' | 'trojan'

export interface VPNCreate {
    subkind: VpnType
    node_id: number
    protocol?: v2rayKinds
}

export interface MRCreate {
    node_id: number
    image: string
    disk_size: number
    app?: string
    envs?: UserEnvs
    http_ports?: number[]
    ports?: number[]
    start_command?: string
}

export type serviceDetails = {
    //county, city, country_iso are for vpn
    progress: string
    app_logo: string
    app_name: string
    charge_amount: number
    city?: string
    container_id?: string
    country?: string
    country_iso?: string
    duration: number
    is_ready: boolean
    node_id: number
    ports_matrix: string //test
    public_ip?: string //for mr
    ip?: string //for vpn
    rx: number
    service: ServiceType
    ssh_direct?: {
        host: string
        port: number
    }
    ssh_proxy?: {
        host: string
        port: number
    }
    ssh_web?: string
    started_at: number
    tx: number
    urls?: string //test
    user_envs: UserEnvs
    uuid: string
    config?: string | proxyConfig
    kind: VpnType | 'base' //base in MR
}

export type vpnNodes = {
    city: string
    country: string
    country_iso: string
    net_down_mbits: number
    net_up_mbits: number
    node_id: number
    traffic_price_usd: number
    traffic_price_ether: number
    residential: boolean
    latitude: number
    longitude: number
}

interface NodeGpuNvidia {
    bus_id?: string
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
    pcie_link_gen?: number
    pcie_link_width?: number
    power_limit_default_watt?: number
    power_limit_watt?: number
    pstate?: string
}

interface NodeGpuAMD {
    idx?: number
    mem_total_mb?: number
    model?: string
}

export interface mrNodes {
    ai_score: number
    arch: string
    available_ports: number
    base: number
    base_ether: number
    base_usd?: number
    blender_cpu_score: number
    blender_cuda_score: number
    blender_optix_score: number
    city: string
    country: string
    country_iso: string
    cpu_cores: number
    cpu_model_name: string
    cpu_speed: number
    cpu_vendor_id: string
    currency_usd?: boolean
    disk_speed_mbs: number
    free_disk: number
    gpu: {
        amd: NodeGpuAMD[]
        nvidia: NodeGpuNvidia[]
    }
    is_has_gpu: boolean
    market_price?: number
    memory_speed: number
    memory_type: string
    net_down_mbits: number
    net_up_mbits: number
    node_id: number
    reliability: number
    storage: number
    storage_ether: number
    storage_usd?: number
    total_memory: number
    total_price_ether: number
    total_price_usd: number
    total_price_wei: number
    traffic: number
    traffic_ether: number
    traffic_usd?: number
    virt: string
}

export interface UserEnvs {
    [key: string]: string
}
