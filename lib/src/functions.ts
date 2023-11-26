export function checkUUID(uuid: string): boolean {
    if (uuid != '') {
        return true
    }
    return false
}

export function checkKey(key: string): boolean {
    if (key.length == 64) {
        return true
    }
    return false
}
