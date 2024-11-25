import { Cycle } from "./reducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}
//Esse enum é criado para definirmos um nome para todas as ACTIONS da aplicação, para que, quando precisarmos escrever alguma delas, ou mesmo fazer alguma alteração no nome, podermos realizar essa alteração por aqui mesmo, assim alterando todas ao mesmo tempo. Alem de que, quando precisarmos escrever uma nova função com essa action, nao precisamos lembrar do nome de cabeça (podemos apenas digitar um . e ele ja ira nos sugerir o nome)

export function addNewCycleAction(newCycle: Cycle) {
    return {
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle,
            },
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}
//Nesse componente de Actions, usaremos para criar uma função para cada action que temos na aplicação. Nas 2 ultimas actions nao precisaremos passar nenhum payload por que o 'activeCycleId' ja esta sendo passado como parametro no proprio reducer

export function interruptCurrentCycleAction() {
   return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}