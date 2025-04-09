import { createContext, useContext, useEffect } from 'react'

import { SCREEN } from './Screen'

const
EVENTS_CONTEXT_DATA          = { add: events_add, remove: events_remove },
EVENTS                       = createContext(EVENTS_CONTEXT_DATA),
EVENTS_STACK: (() => void)[] = []

function events_add(f = () => {}) { EVENTS_STACK.push(f) }

function events_remove(f = () => {}) { EVENTS_STACK.splice(EVENTS_STACK.indexOf(f), 1) }

function events_eResize() { for (let i = 0, max = EVENTS_STACK.length; i < max; i++) EVENTS_STACK[i]() }

{
    addEventListener('resize', events_eResize)
}

export default function Events({children}: {children: React.ReactNode})
{
    const screen_update = useContext(SCREEN).update

    useEffect(() =>
    {
        events_add(screen_update)

        return () => events_remove(screen_update)
    },
    [])

    return (
        <EVENTS.Provider
        value={EVENTS_CONTEXT_DATA}
        >
            {children}
        </EVENTS.Provider>
    )
}

export {EVENTS}