import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles"
import { useContext } from "react"

//React hook form é uma biblioteca que nos ajuda a controlar formularios no React, para termos um controle dos seus campos podemos integrar ela com outra biblioteca, chamada de zod (porem para integrar elas duas, precisamos importar uma terceira biblioteca chamada de hookForm/resolvers)
import { NewCycleForm } from "./NewCycleForm"
import { Countdown } from "./Countdown"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { CyclesContext } from "../../contexts/CyclesContext"

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().
    min(5, 'O ciclo deve ser de no mínimo 5 minutos').
    max(60, 'O ciclo deve ser de no máximo 60 minutos'),
})
//Nesse objeto "newCycleForm..." colocamos as "regras" que o campo devera receber, como por exemplo o campo 'task' recebendo a regra de que sera uma string e tera tamanho minimo de 1. Podemos tambem adicionar uma mensagem para quando a regra nao for atendida

// interface newCycleFormData {
//     task: string;
//     minutesAmount: number;
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
//Esse 'type' foi criado apenas para typar a aplicação, passado como parametro dentro do <> ao lado do useForm, ele usa o newCycleForm... como parametro, porem como nao podemos adicionar funções JS dentro do TS por regra, precisamos adicionar sempre um typeof antes.


export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

//Do useForm podemos importar alguns componentes que compoem o objeto "Form", a baixo temos alguns exemplo (register, handleSubmit, watch, reset)
    const newCycleForm = useForm<NewCycleFormData>({
            resolver: zodResolver(newCycleFormValidationSchema),
//Aqui dentro do resolver, adicionamos a função criada para gerenciar as "regras" dos inputs.
            defaultValues: {
                task: '',
                minutesAmount: 0,
            }
//Dentro do objeto useForm, podemos adicionar o 'defaultValues' para definir os valores iniciais do campo, é sempre bom adicionar porque se dermos um reset no campo apos a validação, os campos voltarao a ter esses valores
        })

    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    } 

    const task = watch('task')
//Watch é um parametro existente dentro do useForm que serve para monitorar nossa variavel, ele vai sempre checar quando ela for acionada, seja quando alguem escreve algo no input ou qualquer outra ação. Nesse caso, foi passada ao input 'task'.

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
{/* No onSubmit do formulario, adicionamos a ação "handleSubmit" que é uma função padrao do useForm e, dentro dela adicionamos como parametro outra funcão, que criamos nós mesmos, nessa segunda função iremos paasar os parametros do que sera acionado ao submit */}
            
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown/>

                {activeCycle ? (
                <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                    <HandPalm size={24}/>
                    Interromper
                </StopCountdownButton>
                ): (
                <StartCountdownButton type="submit" disabled={!task}>
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}