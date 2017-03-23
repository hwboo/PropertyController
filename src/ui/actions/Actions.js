export function sendAction(type, payload, error, meta) {
    return {
        type : type,
        payload : payload,
        error : error,
        meta : meta
    }
}