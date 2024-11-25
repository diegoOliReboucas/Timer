import { useFormContext } from 'react-hook-form'
import {FormContainer,MinutesAmountInput,TaskInput} from './styles'

import { useContext } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function NewCycleForm() {
    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()

    return(
        <FormContainer>
        <label htmlFor="Task">Vou trabalhar em</label>
        <TaskInput 
            id='Task' 
            type="text"
            disabled={!!activeCycle}
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
//Register serve para "gerenciar" os campos do input, dentro dele por exemplo, temos o OnChange, Value, etc... é como se ele resumisse esses campos, podemos colocar o {valueAsNumber: true} para definir que o valor inserido sera um numero
            />

        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput 
            id="minutesAmount" 
            type="number" 
            placeholder="00" 
            disabled={!!activeCycle}
            step={5} 
            {...register('minutesAmount', {valueAsNumber: true})}
        />

        <span>minutos.</span>
    </FormContainer>
    )
}