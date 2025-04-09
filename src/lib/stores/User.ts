import { configureStore } from '@reduxjs/toolkit'

import { cookies_set, cookies_get, cookies_delete } from '../ts/cookies'

type USER_TT_STATE =
{
    token    : null | string,
    firstName: null | string,
    lastName : null | string,
}

type USER_TT_PROFILE =
{
    firstName: string,
    lastName : string
}

type USER_TT_TYPES = 'user/signIn' | 'user/signOut' | 'user/profile'

type USER_TT_PAYLOADS =
{
    'user/signIn' : string,
    'user/signOut': null,
    'user/profile':
    {
        firstName: string,
        lastName : string
    }
}

type USER_TT_ACTIONS = User_ttGetAction<USER_TT_TYPES>

type USER_TT_DISPATCH = typeof STORE.dispatch

type User_ttGetAction<T extends USER_TT_TYPES> = T extends T
    ? {
        type   : T,
        payload: USER_TT_PAYLOADS[T]
    }
    : never

const
USER_TOKEN_KEY    = 'userToken',
USER_BASE_API_URL = 'http://localhost:3001/api/v1/user/'

function user_setToken(token: string, remember: boolean): void { remember ? cookies_set(USER_TOKEN_KEY, token, 7) : sessionStorage.setItem(USER_TOKEN_KEY, token) }

function user_getToken(): string | null { return sessionStorage.getItem(USER_TOKEN_KEY) ?? cookies_get(USER_TOKEN_KEY) ?? null }

function user_removeToken(): void
{
    sessionStorage.removeItem(USER_TOKEN_KEY)

    cookies_delete(USER_TOKEN_KEY)
}

async function user_updateProfile(): Promise<void>
async function user_updateProfile(firstName: string, lastName: string): Promise<void>
async function user_updateProfile(firstName?: string, lastName?: string): Promise<void>
{
    const TOKEN = STORE.getState().token

    if (!TOKEN) throw new Error('The user is not authenticated.')

    const
    PATCH  = firstName && lastName ? true : false,
    METHOD = PATCH ? 'PUT' : 'POST',
    RES    = await (await fetch(USER_BASE_API_URL + 'profile',
    {
        method : METHOD, // TODO: ça devrait être PATCH dans le cas de PUT car on ne modifie que certains champs et GET dans le cas de POST
        headers:
        {
            Authorization : 'Bearer ' + TOKEN,
            'Content-type': 'application/json'
        },
        ...(PATCH ? { body: JSON.stringify({firstName, lastName}) } : {})
    })).json()

    if (RES.status !== 200) throw new Error(RES.message)

    const {firstName: FIRST_NAME, lastName: LAST_NAME} = RES.body

    STORE.dispatch(
    {
        type   : 'user/profile',
        payload:
        {
            firstName: FIRST_NAME,
            lastName : LAST_NAME
        }
    })
}

function user_reducer(state: USER_TT_STATE = { token: user_getToken(), firstName: null, lastName: null }, action: USER_TT_ACTIONS): USER_TT_STATE
{
    switch (action.type)
    {
        case    'user/signIn' : return action.payload && typeof action.payload === 'string' ? { ...state, token: action.payload } : state
        case    'user/signOut': return { token: null, firstName: null, lastName: null }
        case    'user/profile': return { ...state, ...action.payload }
        default               : return state
    }
}

const STORE = configureStore(
{
    reducer : user_reducer,
    devTools: false
})

export default STORE

export function user_selectorProfile(state: USER_TT_STATE): USER_TT_PROFILE | null
{
    let profile: USER_TT_PROFILE =
    {
        firstName: '',
        lastName : ''
    }

    return ((user_selectorProfile as unknown) = (state: USER_TT_STATE): USER_TT_PROFILE | null =>
    {
        const {firstName: FIRST_NAME, lastName: LAST_NAME} = state

        return FIRST_NAME && LAST_NAME
            ? profile.firstName === FIRST_NAME && profile.lastName === LAST_NAME
                ? profile
                : profile = { firstName: FIRST_NAME, lastName: LAST_NAME }
            : null
    })(state)
}

export async function user_aSignUp(email: string | null, password: string | null, firstName: string | null, lastName: string | null): Promise<void>
{
    if (!email || !password || !firstName || !lastName) throw new Error('The data is incomplete.')

    const RES = await fetch(USER_BASE_API_URL + 'signup',
    {
        method : 'POST',
        headers: { 'Content-type': 'application/json' },
        body   : JSON.stringify({email, password, firstName, lastName})
    })

    if (!RES.ok) throw new Error((await RES.json()).message)
 
    await user_aSignIn(email, password, false)
}

export async function user_aSignIn(email: string | null, password: string | null, remember: boolean): Promise<void>
{
    if (!email || !password) throw new Error('The data is incomplete.')

    const
    RES = await (await fetch(USER_BASE_API_URL + 'login',
    {
        method : 'POST',
        headers: { 'Content-type': 'application/json' },
        body   : JSON.stringify({email, password})
    })).json(),
    TOKEN = RES.body?.token

    if (!TOKEN) throw new Error(RES.message)

    user_removeToken() // *Être sur de ne pas laisser un vieux token
    user_setToken(TOKEN, remember)

    STORE.dispatch({ type: 'user/signIn', payload: TOKEN })
}

export function user_aSignOut(): void
{
    user_removeToken()

    STORE.dispatch({ type: 'user/signOut' })
}

export async function user_aProfile(): Promise<void>
{
    let inRecovery = false

    await ((user_aProfile as unknown) = async (): Promise<void> =>
    {
        if (inRecovery) return

        let err

        inRecovery = true

        try { await user_updateProfile() } catch (e) { err = e }

        inRecovery = false

        if (err) throw err instanceof Error ? err : new Error('A problem has occurred.')
    })()
}

export async function user_aUpdate(firstName: string, lastName: string): Promise<void> { await user_updateProfile(firstName, lastName) }

export type { USER_TT_DISPATCH }