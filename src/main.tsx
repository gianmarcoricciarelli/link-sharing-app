import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { StoreContextProvider } from '@contexts/storeContext/storeContext.tsx'

import CreateAccount from '@pages/createAccount/createAccount.tsx'
import Details from '@pages/details/details.tsx'
import Links from '@pages/links/links.tsx'
import Login from '@pages/login/login.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StoreContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Links />} />
                    <Route path='details' element={<Details />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
            </Routes>
        </BrowserRouter>
    </StoreContextProvider>
)
