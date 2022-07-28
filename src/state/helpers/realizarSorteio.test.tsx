import React from 'react';
import { realizarSorteio } from './realizarSorteio';

describe('dado um sorteio de amigo secreto', () => {
    test('cada participante não soretia o proprio nome', () => {
        const participantes = [
            'Ana',
            'Catarina',
            'Juliana',
            'Joao',
            'Vinicius',
            'Natalia'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})