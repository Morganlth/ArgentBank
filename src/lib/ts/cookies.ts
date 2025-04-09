/* [cookies] */

// #FUNCTIONS

    // ##GET
function cookies_getExpiry(expiryAfter: number): string
{
    const D = new Date()

    D.setDate(D.getDate() + expiryAfter)

    return D.toUTCString()
}

// #EXPORTS

    // ##THIS
export function cookies_set(name: string, value: string, expiryAfter: number): void
{
    /*
        ?"expiryAfter" is expressed in days.
    */

    document.cookie = `${name}=${value};path=/;expires=${cookies_getExpiry(expiryAfter)};samesite=strict;secure`
}

export function cookies_get(name: string): string | void { return ('; ' + document.cookie).split(`; ${name}=`).pop()?.split(';')[0] }

export function cookies_delete(name: string): void { document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;samesite=strict;secure` }