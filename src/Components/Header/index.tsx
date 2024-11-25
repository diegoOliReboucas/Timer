import { HeaderContainer } from "./styles";

import {Timer, Scroll} from 'phosphor-react'
import logo from '../../assets/Logo.svg'
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} />
            <nav>
                <NavLink to="/"><Timer size={24}/></NavLink>
                <NavLink to="/History"><Scroll size={24}/></NavLink>
{/* O NavLink é usado para navegar pelas paginas, quando for clicado no icone importado, por exemplo, ele vai para a pagina que foi passada no 'to' do NavLink */}
            </nav>
        </HeaderContainer>
    )
}