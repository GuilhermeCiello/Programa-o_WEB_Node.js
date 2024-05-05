import { validateCPF, validateEMAIL } from '../services/users.js';


describe('teste unitario para funcao validateCPF',() =>{
    it('Teste com CPF valido',() => {
        var cpf = '309.785.370-76';
        expect(validateCPF(cpf)).toBe(true);
 })
 it('Teste com CPF invalido', () => {
    var cpf = '000.000.000-00';
    expect(validateCPF(cpf)).toBe(false);
})
});

describe('teste unitario para funcao validateEMAIL',() =>{
    it('Teste com Email valido',() => {
        var email = 'guilherme@gmail.com';
        expect(validateEMAIL(email)).toBe(true);
 })
 it('Teste com Email invalido', () => {
    var email = 'guilherme.com';
    expect(validateEMAIL(email)).toBe(false);
})
});