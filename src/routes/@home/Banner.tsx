import { useContext } from 'react'

import { SCREEN } from '../../lib/contexts/Screen'

import STYLE from './@banner/banner.module.scss'

const BANNER_LIST_ITEMS = ['No fees.', 'No minimum deposit.', 'High interest rates.'] as const

export default function Banner()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <div
        className={`${STYLE.banner} d_flx ${MOBILE ? 'j_ctr pt_7' : 'j_end pt_11 pr_11'} b_brd`}
        >
            <section
            className="h_fit pt_7 pr_7 pb_7 pl_7 b_lgh0 c_gry1"
            >
                <ul
                className={`super_txt_heavy_${MOBILE ? 1 : 5}`}
                >
                {
                    BANNER_LIST_ITEMS.map((s: string, key: number) =>
                        <li
                        key={key}
                        >
                            <p>
                                {s}
                            </p>
                        </li>
                    )
                }
                </ul>
        
                <p
                className={`super_txt_${MOBILE ? 0 : 3} mt_5`}
                >
                    Open a savings account with Argent Bank today!
                </p>
            </section>
        </div>
    )
}