import { useRef, useState, useCallback } from 'react'

import { user_aUpdate } from '../../../lib/stores/User'

export default function Edit({propFirstName, propLastName, onCancel}: {propFirstName: string, propLastName: string, onCancel: () => void})
{
    const
    FIRST_NAME_INPUT  = useRef<HTMLInputElement>(null),
    LAST_NAME_INPUT   = useRef<HTMLInputElement>(null),
    [ERROR, setError] = useState(false),
    eSubmit           = useCallback(async (e: React.SyntheticEvent<HTMLFormElement>) =>
    {
        e.preventDefault()

        const
        FIRST_NAME = FIRST_NAME_INPUT.current?.value,
        LAST_NAME  = LAST_NAME_INPUT.current?.value

        if (!FIRST_NAME && !LAST_NAME) return setError(true)

        try
        {
            if (FIRST_NAME !== propFirstName || LAST_NAME !== propLastName) await user_aUpdate(FIRST_NAME ? FIRST_NAME : propFirstName, LAST_NAME ? LAST_NAME : propLastName)
        }
        catch { return setError(true) }

        setError(false)
        onCancel()
    },
    [])

    return (
        <form
        className="d_flx f_cl_ a_ctr g_3 mb_7"
        onSubmit={eSubmit}
        >
            <div
            className="d_flx g_4"
            >
                <input
                className={`super_ipt super_txt_3 ${ERROR ? 'brd_c_err0' : ''}`}
                name="firstName"
                type="text"
                aria-label="First name"
                placeholder={propFirstName}
                ref={FIRST_NAME_INPUT}
                />

                <input
                className={`super_ipt super_txt_3 ${ERROR ? 'brd_c_err0' : ''}`}
                name="lastName"
                type="text"
                aria-label="Last name"
                placeholder={propLastName}
                ref={LAST_NAME_INPUT}
                />
            </div>

            <div
            className="d_flx g_4"
            >
                <button
                className="super_btn super_txt_heavy_0 @default pt_3 pr_3 pb_3 pl_3"
                type="submit"
                >
                    Save
                </button>

                <button
                className="super_btn super_txt_heavy_0 @default pt_3 pr_3 pb_3 pl_3"
                type="button"
                onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}