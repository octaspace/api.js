export class ApiError extends Error {
    public code?: number
    public responseData?: unknown
    constructor(message: string, code?: number, responseData?: unknown) {
        super(message)
        Object.setPrototypeOf(this, ApiError.prototype)
        this.name = 'OctaApiError'
        this.responseData = responseData
    }
}

export class KeyError extends Error {
    public code?: number
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype)
        this.name = 'OctaKeyError'
    }
}

export class UUIDError extends Error {
    public code?: number
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype)
        this.name = 'OctaUUIDError'
    }
}
