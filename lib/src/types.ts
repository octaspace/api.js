export type accountDetails = {
    deposit_address:string;
    ssh_public_key:string;
    withdrawal_address:string;
}

export type accountBalance = {
    balance:number
}

export type serviceUUID = {
    uuid:string
}

export type VpnType = 'wg' | 'openvpn';

export type vpnDetails = {
    city:string,
    config:string
    country:string
    ip:string
    is_ready:boolean
    qr?:string
    subkinnd?:string
}

export type vpnNodes = {
    city:string,
    country:string
    country_iso:string
    net_down_mbs:number
    net_up_mbs:number
    node_id:number
    reliability:number
    total_price_usd:number
    traffic_price:number
}