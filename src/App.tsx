import { StrictMode }                   from 'react'
import { createRoot }                   from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import Screen from './lib/contexts/Screen'
import Events from './lib/contexts/Events'

import USER from './lib/stores/User'

import Header from './@app/Header'
import Main   from './@app/Main'
import Footer from './@app/Footer'

import Home   from './routes/+page'
import SignIn from './routes/signIn/+page'
import User   from './routes/user/+page'

import './@app/app.scss'

const ROUTES: [path: string, Page: React.FC][] =
[
    ['/'       , Home  ],
    ['/sign-in', SignIn],
    ['/user'   , User  ]
]

createRoot(document.getElementById('APP')!).render(
    <StrictMode>
        <BrowserRouter>
            <Screen>
                <Events>
                    <Provider
                    store={USER}
                    >
                        <Header />
                        
                        <Main>
                            <Routes>
                            {
                                ROUTES.map(([path, Page]) =>
                                    <Route
                                    key={path}
                                    path={path}
                                    element={<Page />}
                                    />
                                )
                            }
                            </Routes>
                        </Main>

                        <Footer />
                    </Provider>
                </Events>
            </Screen>
        </BrowserRouter>
    </StrictMode>
)