import Copy from '../lib/tsx/Copy'

import STYLE from './@footer/footer.module.scss'

export default function Footer()
{
    return (
        <footer
        id="FOOTER"
        className={`${STYLE.footer} d_flx j_ctr pt_7 pb_6`}
        >
            <Copy />
        </footer>
    )
}