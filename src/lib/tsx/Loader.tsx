// credit: https://loading.io/css/

import STYLE from './@loader/loader.module.scss'

export default function Loader()
{
    return (
        <div
        className={`${STYLE.loader} d_ilb p_rlt`}
        >
        {
            Array(8).fill(null).map((_, key) =>
                <div
                key={key}
                ></div>
            )
        }
        </div>
    )
}