import Account from './@accounts/Account'

import STYLE from './@accounts/accounts.module.scss'

import type { ACCOUNT_TT_DATA } from './@accounts/Account'

export default function Accounts()
{
    const ACCOUNTS =
    [
        {
            title      : 'Argent Bank Checking (x8349)',
            amount     : 2_082.79,
            description: 'Available Balance'
        },
        {
            title      : 'Argent Bank Savings (x6712)',
            amount     : 10_928.42,
            description: 'Available Balance'
        },
        {
            title      : 'Argent Bank Credit Card (x8349)',
            amount     : 184.30,
            description: 'Current Balance'
        }
    ] as const satisfies ACCOUNT_TT_DATA[]

    return (
        <ul
        className={`${STYLE.accounts} d_flx f_cl_ g_7`}
        >
        {
            ACCOUNTS.map((account: ACCOUNT_TT_DATA, key: number) =>
                <li
                key={key}
                >
                    <Account
                    propAccount={account}
                    />
                </li>
            )
        }
        </ul>
    )
}