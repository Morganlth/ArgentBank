import { useContext } from 'react'

import { SCREEN } from '../../lib/contexts/Screen'

import STYLE from './@features/features.module.scss'

type FEATURES_TT_LIST_ITEMS =
{
    title  : string,
    content: string,
    icon   :
    {
        img: string,
        alt: string
    }
}

const FEATURES_LIST_ITEMS =
[
    {
        title  : 'You are our #1 priority',
        content: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
        icon   :
        {
            img: 'icon-chat.png',
            alt: 'Chat Icon'
        }
    },
    {
        title  : 'More savings means higher rates',
        content: 'The more you save with us, the higher your interest rate will be!',
        icon   :
        {
            img: 'icon-money.png',
            alt: 'Money Icon'
        }
    },
    {
        title  : 'Security you can trust',
        content: 'We use top of the line encryption to make sure your data and money is always safe.',
        icon   :
        {
            img: 'icon-security.png',
            alt: 'Security Icon'
        }
    }
] as const satisfies FEATURES_TT_LIST_ITEMS[]

export default function Features()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <section
        className={`${STYLE.features}`}
        >
            <ul
            className={`d_flx ${MOBILE ? 'f_cl_' : ''}`}
            >
            {
                FEATURES_LIST_ITEMS.map(({title, content, icon: {img, alt}}: FEATURES_TT_LIST_ITEMS, key: number) =>
                    <li
                    key={key}
                    className="f_1"
                    >
                        <article
                        className={`${STYLE.feature} d_flx f_cl_ a_ctr pt_8 pr_8 pb_8 pl_8 t_ctr`}
                        >
                            <img
                            className={`${STYLE.icon} mb_4 pt_4 pr_4 pb_4 pl_4 brd_r_50`}
                            src={`/images/${img}`}
                            alt={alt}
                            />

                            <h2
                            className="super_txt_heavy_4 mb_4 c_gry2"
                            >
                                {title}
                            </h2>

                            <p
                            className="super_txt_1 mb_4 c_gry1"
                            >
                                {content}
                            </p>
                        </article>
                    </li>
                )
            }
            </ul>
        </section>
    )
}