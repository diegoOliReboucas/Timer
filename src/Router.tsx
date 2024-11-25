import {Routes, Route} from 'react-router-dom'
import { Home } from './Pages/Home/index'
import { History } from './Pages/History/index'
import { DefaultLayout } from './layouts/DefaultLayout/index'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<Home />}/>
                <Route path='/history' element={<History />}/>
            </Route>
{/* O route que esta em volta dos outros 2 Routes, é o DefaultLayout e, serve para o aplicativo saber quais as paginas do outlet (componente que se encontra no DefaultLayout), para exibir na tela */}
{/* Nesse caso, foi passada apenas a / no path, porque queremos esse componente seja aplicado para todas as rotas do aplicativo. Caso estivessemos desenvolvendo um aplicativo de banco, por
exemplo e, tivessemos um layout que quisessemos que fosse aplicado para todos os componentes que começassem com "/admin" podemiamos passar esse parametro para o path */}
        </Routes>
//Esse componente é o componente que gerencia as rotas da aplicação, todos os caminhos deverão ser passados aqui. Por exemplo, quando clicado em https://localhost3000/history ele vai
//para a pagina history, se deixar apenas a / apos o path, quer dizer que esta redirecionando para a pagina padrao do site. Esse componente devera ser importado no app.tsx
    )
}