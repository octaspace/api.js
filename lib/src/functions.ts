export function checkUUID(uuid: string): boolean {
    return uuid != '';
}

export function checkKey(key: string): boolean {
    return key.length === 64;
}
