const {User} = require('../models');

const userData = [
{
    username: 'dmadon',
    email: 'deanna.madon@gmail.com',
    password: 'trekkie123'
},
{
    username: 'jlpicard',
    email: 'jlpicard@starfleet.com',
    password: 'makeItSo'
},
{
    username: 'glaforge',
    email: 'glaforge@starfleet.com',
    password: 'ayeCaptain'
},
{
    username: 'jtkirk',
    email: 'jtkirk@starfleet.com',
    password: 'takeUsOut'
},
{
    username: 'spock',
    email: 'spock@starfleet.com',
    password: 'fascinating'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;