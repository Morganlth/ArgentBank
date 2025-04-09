import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { user_selectorProfile, user_aProfile } from '../../lib/stores/User'

import Loader from '../../lib/tsx/Loader'

import Edit     from './@user/Edit'
import Accounts from './@user/Accounts'

export default function User()
{
    const
    [PRESSED, setPressed] = useState(false),
    navigate              = useNavigate(),
    PROFILE               = useSelector(user_selectorProfile)

    useEffect(() => { if (!PROFILE) (async () => { try { await user_aProfile() } catch { navigate('/') } })() }, [])

    function button_eClick() { setPressed(!PRESSED) }

    return (
        <section
        id="USER"
        className="f_1 d_flx f_cl_ a_ctr b_drk1"
        >
        {
            PROFILE
            ? <>
                <h2
                className="super_txt_heavy_6 mt_5 mb_5 c_lgh0 t_ctr"
                >
                    Welcome back<br />
                    {PROFILE.firstName} {PROFILE.lastName}!
                </h2>

            {
                PRESSED
                    ? <Edit
                    propFirstName={PROFILE.firstName}
                    propLastName={PROFILE.lastName}
                    onCancel={button_eClick}
                    />
                    : <button
                    className="super_btn super_txt_heavy_0 @default mb_7 pt_3 pr_3 pb_3 pl_3"
                    type="button"
                    onClick={button_eClick}
                    >
                        Edit Name
                    </button>
            }

                <Accounts />
            </>
            : <div
            className="container f_1 d_flx a_ctr"
            >
                <Loader />
            </div>
        }
        </section>
    )
}