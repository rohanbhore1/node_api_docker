import supertest from 'supertest'
import {app} from '../index'

const newUserData ={
    "first_name":"tom",
    "last_name":"hanks",
    "email":"tom@hanks5@gmail.com",
    "monthly_salary":102033,
    "monthly_expenses":232
}
const duplicateUserData ={
    "first_name":"tom",
    "last_name":"hanks",
    "email":"tom@hanks3@gmail.com",
    "monthly_salary":102033,
    "monthly_expenses":232
}
describe('user',()=>{
    describe('get all user route',()=>{
        
        describe('if user exist',()=>{
            it("should return 200",async ()=>{
                await supertest(app)
                .get('/user')
                .expect(200)
                .then(result => {
                    expect(
                    result && result.body && result.body.users &&
                    result.body.users[0] &&
                    result.body.users[0].first_name &&
                    result.body.users[0].last_name &&
                    result.body.users[0].email &&
                    result.body.users[0].monthly_salary &&
                    result.body.users[0].monthly_expenses 
                    )
                })
            })
        })

        describe('user not exist',()=>{
            it("should return 404",async ()=>{
                await supertest(app)
                .get('/user')
                .expect(404)
                .then(result => {
                    expect(
                    result && result.body
                    )
                })
            })
        })
    })

    describe('get user with email id route',()=>{
        describe('user exist',()=>{
            it("should return 200",async ()=>{
                await supertest(app)
                .get('/user/jon@may@gmail.com')
                .expect(200)
                .then(result => {
                    expect(
                    result && result.body && result.body.users &&
                    result.body.users[0] &&
                    result.body.users[0].first_name &&
                    result.body.users[0].last_name &&
                    result.body.users[0].email &&
                    result.body.users[0].monthly_salary &&
                    result.body.users[0].monthly_expenses 
                    )
                })
            })
        })
        describe('user not exist',()=>{
            it("should return 404",async ()=>{
                await supertest(app)
                .get('/user/jon1@may@gmail.com')
                .expect(404)
                .then(result => {
                    expect(
                    result && result.body && result.body.status && result.body.message
                    )
                })
            })
        })
    })
    
    describe('add user details route',()=>{
        describe('add new user',()=>{
            it("should return 200",async ()=>{
                await supertest(app)
                .post('/user')
                .send(newUserData)
                .expect(200)
                .then(result => {
                    expect(
                    result && result.body && result.body.user &&
                    result.body.user &&
                    result.body.user.first_name &&
                    result.body.user.last_name &&
                    result.body.user.email &&
                    result.body.user.monthly_salary &&
                    result.body.user.monthly_expenses 
                    )
                })
            })
        })
        describe('add duplicate user',()=>{
            it("should return 409",async ()=>{
                await supertest(app)
                .post('/user')
                .send(duplicateUserData)
                .expect(409)
                .then(result => {
                    expect(
                    result && result.body && result.body.status &&
                    result.body.message
                    )
                })
            })
        })
        
    })
})


