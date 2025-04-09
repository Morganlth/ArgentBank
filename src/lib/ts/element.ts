/* #||__[element]__|| */


// #\_EXPORTS_\

    // __THIS
    export function element_getStyle(e: HTMLElement, style: string[] = [])
    {
        const STYLE = getComputedStyle(e)

        return style.reduce((acc, prop = '', i) =>
        {
            acc[i] = STYLE.getPropertyValue(prop) // *Also returns variables

            return acc
        },
        Array(style.length))
    }