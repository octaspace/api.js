export class ApiError extends Error {
    public code?: number
    public responseData?: unknown
    constructor(message: string, code?: number, responseData?: unknown) {
        super(message)
        Object.setPrototypeOf(this, ApiError.prototype)
        this.name = 'OctaApiError'
        this.code = code
        this.responseData = responseData
    }
}

export class KeyError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype)
        this.name = 'OctaKeyError'
    }
}

export class UUIDError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype)
        this.name = 'OctaUUIDError'
    }
}

export class InvalidParameterError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype)
        this.name = 'InvalidParameterError'
    }
}
