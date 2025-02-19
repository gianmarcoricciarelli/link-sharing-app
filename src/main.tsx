import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { StoreContextProvider } from '@contexts/storeContext/storeContext.tsx'

import CreateAccount from '@pages/createAccount/createAccount.tsx'
import Login from '@pages/login/login.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StoreContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
            </Routes>
        </BrowserRouter>
    </StoreContextProvider>
)
