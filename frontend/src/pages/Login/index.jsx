import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../Login/index.css'

export default function Login(){
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await login(email, password)
            navigate('/dashboard')
        } catch {
            setError('Email ou senha invalidos')
        } finally {
            setLoading(false)
        }
        console.log({email, password})

    }

    return (
        <div className='telalogin'>
            <form onSubmit={handleSubmit}>
                <div className='boxlogin'> 
                    <div className='login'>
                <h1>Login</h1>
                    </div>
                <input type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} />
                <input type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />

                {error && <p className='Erro'>{error}</p>}
                <button type='submit' disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
                </div> 
            </form>
        </div>
    )
}

