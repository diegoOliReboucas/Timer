import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"

import { GlobalStyle } from "./Styles/Global"
import { defaultTheme } from "./Styles/Themes/Default"
import { CyclesContextProvider } from "./contexts/CyclesContext"



//Aqui criamos o contexto, para compartilhar informações entre componentes

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />
        {/* Router é o componente importado */}
      </CyclesContextProvider>
        <GlobalStyle />
      </BrowserRouter>
{/* BrowserRouter é necessario ser importado e ficar em volta do componente Router, para que as rotas do aplicativo funcionem */}
    </ThemeProvider>
  )
}

export default App
