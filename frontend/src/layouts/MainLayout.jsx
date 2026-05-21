import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Pets from "../assets/Pets.jpg"
import Donos from "../assets/Dono.jpg"

function MainLayout(){
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div>
            <aside>
                <nav className="navbar">
                    <div className="logo">
                    <ul className="nav-links">
                    <Link className="linkNavbar" to="/dashboard">Dashboard</Link>
                    <Link to="/pets">Pets</Link>
                    <Link to="/owners">Donos</Link>
                    <Link to="/#">Serviços</Link>
                    <Link to="/#">Tipos de Serviços</Link>
                    <Link to="/#">Usuarios</Link>
                    <button onClick={handleLogout}>Sair</button>
                    </ul>
                    </div>
                </nav>
            </aside>
            <div className="boxs">
                <div className="box">
                    <h1><Link to="/pets">Pets</Link></h1>
                    <h2>Conheça nossos Pets</h2>
                    <img src={Pets} alt="Donos" title="Dono" width={350} height={350} />
                </div>
                <div className="box">
                    <h1><Link to="/owners">Donos</Link></h1>
                    <h2>Pagina dos Donos</h2>
                    <img src={Donos} alt="Pets" title="Pets" width={350} height={350} />
                </div>
            </div>
        </div>
    )
} 

export default MainLayout