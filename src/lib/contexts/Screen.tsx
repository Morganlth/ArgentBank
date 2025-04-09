/* #||__[Screen]__|| */

/*  +_______________________________
    +___CRUSHED____MOBILE__        |
                 |        |        |
                 |        |        |
        DESKTOP  | TABLET | MOBILE |
                 |        |        |
                 |        |        |
    +            +        +        +
*/

import { createContext, useState, useEffect } from 'react'

import { element_getStyle } from '../ts/element'

const
SCREEN          = createContext({ crushed: false, mobile: false, tablet: false, desktop: false, update: () => {} }),
SCREEN_DOM_VARS = ['--crushed', '--mobile', '--tablet', '--desktop']

export default function Screen({children}: {children: React.ReactNode})
{
    const
    [CRUSHED, setCrushed] = useState(false),
    [MOBILE , setMobile ] = useState(false),
    [TABLET , setTablet ] = useState(false),
    [DESKTOP, setDesktop] = useState(false)

    function update()
    {
        const [CRUSHED, MOBILE, TABLET, DESKTOP] = element_getStyle(document.documentElement, SCREEN_DOM_VARS)

        setCrushed(!!CRUSHED)
        setMobile (!!MOBILE )
        setTablet (!!TABLET )
        setDesktop(!!DESKTOP)
    }

    useEffect(update, [])

    return (
        <SCREEN.Provider
        value={{crushed: CRUSHED, mobile: MOBILE, tablet: TABLET, desktop: DESKTOP, update}}
        >
            {children}
        </SCREEN.Provider>
    )
}

export { SCREEN }