import { useContext } from 'react'

import { SCREEN } from '../../../../lib/contexts/Screen'

import STYLE from './@account/account.module.scss'

type ACCOUNT_TT_DATA =
{
    title      : string,
    amount     : number,
    description: string
}

export default function Account({propAccount}: {propAccount: ACCOUNT_TT_DATA})
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <section
        className={`${STYLE.account} d_flx ${MOBILE ? 'f_cl_' : 'j_sbt a_ctr'} pt_6 pr_6 pb_6 pl_6 b_brd b_lgh0 brd_c_drk0`}
        >
            <div
            className="wrapper c_gry1"
            >
                <h3
                className="super_txt_1 fw_400"
                >
                    {propAccount.title}
                </h3>

                <p
                className="amount super_txt_heavy_7"
                >
                    ${propAccount.amount.toLocaleString('en-US')}
                </p>

                <p
                className="description super_txt_1"
                >
                    {propAccount.description}
                </p>
            </div>

            <button
            className={`${STYLE.view} super_btn super_txt_heavy_2 @default ${MOBILE ? 'w_any' : ''} mt_4 pt_2 pr_2 pb_2 pl_2`}
            type="button"
            >
                View transactions
            </button>
        </section>
    )
}

export type { ACCOUNT_TT_DATA }