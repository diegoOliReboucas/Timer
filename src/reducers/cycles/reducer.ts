import { ActionTypes } from "./actions"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}
//No callback do useReducer "state", nao precisamos salvar apenas uma informação, por isso, criamos um CyclesState com os valores iniciais dentro dele



export function cyclesReducer (state: CyclesState, action: any) {
    switch(action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state, 
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
//Aqui estou pegando o id do novo ciclo que foi criado e, setando ele como id ativo
                }
//Ja que estamos passando uma interface para o call back do state no useReducer principal, nao podemos mais voltar apenas um array no RETURN, e sim um objeto. Nesse objeto, inicialmente retormos todos os dados que ja tem "...state". Apos isso sim, atualizamos o valor dos ciclos, usando o 'cycle: [...state.cycles [...]]
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if(cycle.id == state.activeCycleId) {
                        return {...cycle, interruptedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if(cycle.id == state.activeCycleId) {
                        return {...cycle, finishedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        default:
            return state
    }
    
}