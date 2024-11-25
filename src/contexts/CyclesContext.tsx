import {  createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer} from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptCurrentCycleAction } from "../reducers/cycles/actions";

interface CreateCycleData{
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}
//Dentro dessa interface, deveremos passar quais as informações iremos armazenar dentro do contexto

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({children}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
//Por termos colocado o codigo que estava dentro do reducer em outro componente, aqui nesse useReducer apenas precisamos importar o componente para o lugar do state, igual foi feito nesse caso com o "cyclesReducer"
        cycles: [],
        activeCycleId: null
    }
//Aqui é o valor inicial do estado, retornando como um objeto 'por conta da interface que foi criada, caso contrario era pra ser um ARRAY'.
)
//O useReducer é usado para armazenar informções para no futuro podermos alterar elas ou consultalas, assim como o useState. Preferimos utilizar o useReducer ao invez do useState com informações mais complexas, pricipalmente quando precisaremos alterar essas informações.
//Por exemplo, esse Array de ciclos, para alterar ele, é uma operação relativamente custosa. E quando precisarmos utilizar alguma função, por exemplo o InterruptCycle, precisariamos copiar o codigo e levar para outro componente, com o Reducer isso nao é necessario.
//O useRecuer recebe 2 parametros, o primeiro é uma função, essa função recebe 2 parametros, o primeiro é o 'state' que é o valor real da variavel de ciclos e o segundo é uma 'action' que é qual ação o usuario quer realizar dentro da variavel. E o segundo é o valor inicial dos ciclos (nesse caso de cima é o cycles: [])
//dispatch é o nome dado a uma função na qual eu quero disparar a qualquer momento, diferente do useState, onde usamos o set'cycle' por exemplo, para alterar a variavel

    const {cycles, activeCycleId} = cyclesState
//Aqui pegamos as variaveis que estao dentro do objeto "cyclesState"

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                data: activeCycleId
            }
        })
//Quando estamos usando reducers, ao invez de enviar uma informação crua, por exemplo: Dispatch(activeCycleId), nós enviamos um objeto com um "type" e nele falamos a ação que desejamos realizar, por exemplo: ADD_NEW_CYCLE
// E dentro de um outro objeto chamado payload, enviamos os dados do novo ciclo, assim. Payload: {data: "dados"}

    }

    function createNewCycle(data: CreateCycleData) {
//Reset é um parametro existente dentro do useForm que serve para resetar os campos do input, foi passado dentro da função que é acionada no submit para resetar os campos apos clicar no botão
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

//Essa parte é o mesmo que pegar todos os dados do array cycles, repetir eles e adicionar os novos dados, que virão do newCycle

        dispatch(addNewCycleAction(newCycle))
//como estamos usando um componente para as ACTIONS, apenas precisamos importar a função do componente dentro desse dispatch. Diferentemente do 'markCurrentCycleAsFinished', onde é necessario enviar todas as informações, como type, payload, data.

        setAmountSecondsPassed(0)
}

function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())

}

    return (
        <CyclesContext.Provider value={{cycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle}}>
            {children}
        </CyclesContext.Provider>
    )
}