import Logo from '../lib/tsx/Logo'

import Nav from './@header/Nav'

export default function Header()
{
    return (
        <header
        id="HEADER"
        className="d_flx j_sbt a_ctr pt_1 pr_5 pb_1 pl_5 b_brd"
        >
            <h1>
                <Logo />
            </h1>

            <Nav />
        </header>
    )
}