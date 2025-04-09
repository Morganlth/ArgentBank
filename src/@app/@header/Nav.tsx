import { useEffect         } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { user_selectorProfile, user_aSignOut, user_aProfile } from '../../lib/stores/User'

import STYLE from './@nav/nav.module.scss'

export default function Nav()
{
    const
    navigate = useNavigate(),
    PROFILE  = useSelector(user_selectorProfile)

    useEffect(() => { if (!PROFILE) (async () => { try { await user_aProfile() } catch { navigate('/') } })() }, [])

    return (
        <nav
        className={STYLE.nav}
        >
            <ul
            className="super_txt_heavy_1 d_flx g_2 mr_2"
            >
            {
                PROFILE
                    ? <>
                        <li>
                            <Link
                            className="c_gry1"
                            to="/user"
                            >
                                <i
                                className="fa fa-user-circle"
                                ></i>
                
                                &nbsp;{PROFILE.firstName}
                            </Link>
                        </li>

                        <li>
                            <Link
                            className="c_gry1"
                            to="/"
                            onClick={user_aSignOut}
                            >
                                <i
                                className="fa fa-sign-out"
                                ></i>
                
                                &nbsp;Sign Out
                            </Link>
                        </li>
                    </>
                    : <li>
                        <Link
                        className="c_gry1"
                        to="/sign-in"
                        >
                            <i
                            className="fa fa-user-circle"
                            ></i>
            
                            &nbsp;Sign In
                        </Link>
                    </li>
            }
            </ul>
        </nav>
    )
}