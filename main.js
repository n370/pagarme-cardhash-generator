#!/usr/bin/env node

const inquirer = require('inquirer');
const pagarme = require('pagarme');

inquirer.prompt([
    {
        name: 'encryption_key',
        message: 'Chave de encriptacao: '
    },
    {
        name: 'card_number',
        message: 'Nro do cartao: '
    },
    {
        name: 'card_holder_name',
        message: 'Nome no cartao: '
    },
    {
        name: 'card_expiration_date',
        message: 'Data de expiracao: '
    },
    {
        name: 'card_cvv',
        message: 'CVV: '
    }
])
.then(answers => {
    const card = {
        card_number: answers.card_number,
        card_holder_name: answers.card_holder_name,
        card_expiration_date: answers.card_expiration_date,
        card_cvv: answers.card_cvv,
    };
    return pagarme.client.connect({
        encryption_key: answers.encryption_key
    })
    .then(client => client.security.encrypt(card));
})
.then(card_hash => {
    console.log('Após gerado, o card_hash tem validade de 5 minutos. Além disso, ele pode ser utilizado uma única vez.\n');
    console.log(card_hash);
});