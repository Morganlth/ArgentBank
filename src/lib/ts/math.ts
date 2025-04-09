const MATH_CACHE_KEYS = new Set()

export function math_randomInt(n = 2) { return Math.random() * n | 0 }

export function math_randomKey()
{
    const KEY = 'xxx4xxxy'.replace(/[xy]/g, c =>
    {
        const R = math_randomInt(16)

        return (c === 'x' ? R : (R & 0x3 | 0x8)).toString(16)
    })

    if (MATH_CACHE_KEYS.has(KEY)) return math_randomKey()

    MATH_CACHE_KEYS.add(KEY)

    return KEY
}

export function math_rangeLoop(n = 0, min = 0, max = 1) { return n > max ? min : n < min ? max : n }