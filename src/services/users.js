// users.js
import User from '../models/user.js';

export const getUsers = async () => {
    const users = await User.find();
    return users;
};

export const getUser = async (id) => {
    const user = User.findById(id);
    return user;
};

export const getUserByName = async (name) => {
    const users = await User.find({ nome: { $regex: name, $options: 'i' } });
    return users;
};

export function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
}

export function validateEMAIL(email) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
   return emailPattern.test(email); 

}

export const createUser = async (params) => {
    
    if(!validateEMAIL(params.email)){
        throw new Error('e-mail inválido');
    }
    if (!validateCPF(params.cpf)) {
        throw new Error('CPF inválido');
    }

    const user = new User({
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    });

    await user.save();
    return user;
};

export const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
};

export const updateUser = async (id, params) => {
    if(!validateEMAIL(params.email)){
        throw new Error('e-mail inválido');
    }
    if (params.cpf && !validateCPF(params.cpf)) {
        throw new Error('CPF inválido');
    }

    const user = await User.findByIdAndUpdate(id, params, { new: true });
    return user;
};
