import Login from './pages/login/login'
import { User } from './types'

function App() {
    const user: Partial<User> = JSON.parse(localStorage.getItem('lsa') || '{}')

    return user.email ? (
        <div>
            <p>App</p>
        </div>
    ) : (
        <Login />
    )
}

export default App
