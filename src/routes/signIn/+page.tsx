import { useState, useEffect } from 'react'
import { useNavigate         } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { user_selectorProfile } from '../../lib/stores/User'

import STYLE from './@signIn/signIn.module.scss'

import Form from './@signIn/Form'

export default function SignIn()
{
    const
    [SIGN_UP, setSignUp] = useState(false),
    navigate             = useNavigate(),
    PROFILE              = useSelector(user_selectorProfile)

    useEffect(() => { if (PROFILE) navigate('/user') }, [PROFILE])

    function button_eClick() { setSignUp(!SIGN_UP) }

    return (
        <section
        id="SIGN_IN"
        className={`${STYLE.signIn} f_1 b_drk1`}
        >
            <div
            className="d_flx f_cl_ a_ctr mt_9 m__aut pt_7 pr_7 pb_7 pl_7 b_brd b_lgh0"
            >
                <i
                className={`${STYLE.icon} c_gry1 fa fa-user-circle sign-in-icon`}
                ></i>

                <h2
                className="super_txt_heavy_5 mt_5 mb_5 c_gry1"
                >
                    Sign {SIGN_UP ? 'Up' : 'In'}
                </h2>

                <Form
                propSignUp={SIGN_UP}
                />

                <button
                className="super_txt_1 mt_5 b_trp c_gry1"
                onClick={button_eClick}
                >
                    {SIGN_UP ? 'Already registered' : 'No account yet'}?&nbsp;

                    <span
                    className="tdl_udl"
                    >
                        Sign {SIGN_UP ? 'in' : 'up'}
                    </span>
                </button>
            </div>
        </section>
    )
}