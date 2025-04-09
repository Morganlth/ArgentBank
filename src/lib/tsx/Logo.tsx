import STYLE from './@logo/logo.module.scss'

export default function Logo()
{
    return (
        <a
        className={`${STYLE.logo} d_ilb max_w_any`}
        href="/"
        aria-label="Logo"
        >
            <img
            className="w_any"
            src="/logo.png"
            alt="Argent Bank"
            />
        </a>
    )
}