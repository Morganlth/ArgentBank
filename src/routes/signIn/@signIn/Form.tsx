import { useRef, useState, useCallback } from 'react'

import { user_aSignUp, user_aSignIn, user_aProfile } from '../../../lib/stores/User'

type FORM_TT_FIELD =
{
    keepAlive: boolean,
    label    : string,
    name     : string,
    type     : string,
    auto     : string
}

const FORM_FIELDS =
[
    {
        keepAlive: true,
        label    : 'Email',
        name     : 'email',
        type     : 'email',
        auto     : 'email'
    },
    {
        keepAlive: true,
        label    : 'Password',
        name     : 'password',
        type     : 'password',
        auto     : 'current-password'
    },
    {
        keepAlive: false,
        label    : 'First Name',
        name     : 'firstName',
        type     : 'text',
        auto     : 'given-name'
    },
    {
        keepAlive: false,
        label    : 'Last Name',
        name     : 'lastName',
        type     : 'text',
        auto     : 'family-name'
    }
] as const satisfies FORM_TT_FIELD[]

function Field({propAlive, propLabel, propName, propType, propAutoComplete, propError}: {propAlive: boolean, propLabel: string, propName: string, propType: string, propAutoComplete: string, propError: boolean})
{
    return (
        <label
        className={`field ${propAlive ? 'd_flx f_cl_' : 'd_non'}`}
        >
            <span
            className="super_txt_heavy_1"
            >
                {propLabel}
            </span>

            <input
            className={`super_ipt super_txt_3 ${propError ? 'brd_c_err0' : ''}`}
            name={propName}
            type={propType}
            autoComplete={propAutoComplete}
            required={propAlive}
            tabIndex={propAlive ? 0 : -1}
            disabled={!propAlive}
            />
        </label>
    )
}

export default function Form({propSignUp}: {propSignUp: boolean})
{
    const
    FORM              = useRef<HTMLFormElement>(null),
    [ERROR, setError] = useState(false),
    eSubmit           = useCallback(async (e: React.SyntheticEvent<HTMLFormElement>) =>
    {
        e.preventDefault()

        const DATA = new FormData(FORM.current!)

        setError(false)

        try
        {
      await (propSignUp
                ? user_aSignUp(DATA.get('email') as string | null, DATA.get('password') as string | null, DATA.get('firstName') as string | null, DATA.get('lastName') as string | null)
                : user_aSignIn(DATA.get('email') as string | null, DATA.get('password') as string | null, DATA.get('remember') as boolean | null ?? false)
            )
      await user_aProfile() // *Profile hydration will trigger the "useEffect" from the "signIn" page file
        }
        catch { setError(true) }
    },
    [])

    return (
        <form
        className="form d_flx f_cl_ g_4 w_any c_gry1"
        ref={FORM}
        onSubmit={eSubmit}
        >
        {
            FORM_FIELDS.map(({keepAlive, label, name, type, auto}: FORM_TT_FIELD, key: number) =>
                <Field
                key={key}
                propAlive={keepAlive || propSignUp}
                propLabel={label}
                propName={name}
                propType={type}
                propAutoComplete={auto}
                propError={ERROR}
                />
            )
        }
            
        {
            propSignUp
                ? <></>
                : <label
                className="d_flx a_ctr"
                >
                    <input
                    name="remember"
                    type="checkbox"
                    />

                    <span
                    className="super_txt_1 ml_0 c_gry1"
                    >
                        Remember me
                    </span>
                </label>
        }

            <input
            className="super_btn super_txt_heavy_2 pt_2 pr_2 pb_2 pl_2 tdl_udl c_ptr"
            type="submit"
            value={`Sign ${propSignUp ? 'Up' : 'In'}`}
            />
        </form>
    )
}