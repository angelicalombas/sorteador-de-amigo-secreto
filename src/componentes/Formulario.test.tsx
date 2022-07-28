import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe('o comportamento do Formulario.tsx', ()=> {

    test('quando o input está vazio, novos participanetes não podem ser adicionados', () => {
    
        //renderizar o componente
        // render(<Formulario />)
        //renderizar o componente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    
        //encontrar o botão - getByRole busca pela responsabilidade
        const botao = screen.getByRole('button')
    
        //garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
    
        //garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    
    })
    
    test('adicionar um participane caso exista um nome preenchido', () => {
        //renderizar o componente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    
        //encontrar o botão - getByRole busca pela responsabilidade
        const botao = screen.getByRole('button')
    
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        //garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
    
        //garantir que o input não tenha um valor
        expect(input).toHaveValue("")
    })
    
    test('nomes duplicados não podem ser adinionados na lista', () => {
        //renderizar o componente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    
        //encontrar o botão - getByRole busca pela responsabilidade
        const botao = screen.getByRole('button')
    
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
    
        const mensagemDeErro = screen.getByRole('alert')
    
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('a mensagem de erro deve sumir após o timer', () => {
    
        //emula a contagem de segundo
        jest.useFakeTimers()
    
        //renderizar o componente
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
    
        //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    
        //encontrar o botão - getByRole busca pela responsabilidade
        const botao = screen.getByRole('button')
    
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
        fireEvent.click(botao)
    
        let mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeInTheDocument()
    
        act(() =>{
            //se na aplicação tem um tempo determinado para fazer algo, esse comando faz com que a aplicação ache que já passou o tempo de espera
            jest.runAllTimers()
        })
    
        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
    })
})


