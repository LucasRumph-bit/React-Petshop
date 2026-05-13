import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

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
                <h2>
                    PetShop
                </h2>
                <nav>
                    <link to="/dashboard">Dashboard</link>
                    <link to="/pets">Pets</link>
                    <link to="/#">Donos</link>
                    <link to="/#">Serviços</link>
                    <link to="/#">Tipos de Serviços</link>
                    <link to="/#">Usuarios</link>
                </nav>
            </aside>

            <div>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </div>
    )
} 

export default MainLayout