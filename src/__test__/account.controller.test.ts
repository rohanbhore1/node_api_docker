import supertest from 'supertest'
import {app} from '../index'
//1

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

const email ={"email":"jon@may@gmail.com"}
const notExistEmailId ={"email":"make@happy@gmail.com"}
const notEligibleAccount = {"email":"noto@eligible@gmail.com"}
 
describe('account',()=>{
    describe('get all active account user route',()=>{

        describe('if active account holder user exist',()=>{
            it("should return 200",async ()=>{
                await supertest(app)
                .get('/account')
                .expect(200)
                .then(result => {
                    expect(
                    result && result.body && result.body.users 
                    &&result.body.users[0] &&
                    result.body.users[0].first_name &&
                    result.body.users[0].last_name &&
                    result.body.users[0].email &&
                    result.body.users[0].monthly_salary &&
                    result.body.users[0].monthly_expenses 
                    )
                })
            })
        })

        describe('if active account dose not exist',()=>{
            it("should return 404",async ()=>{
                await supertest(app)
                .get('/account')
                .expect(404)
                .then(result => {
                    expect(
                    result && result.body && result.body.users 
                    )
                })
            })
        })
    })

    describe('Activate account by email id route',()=>{
        describe('account activated success',()=>{
            it("should return 200",async ()=>{
                await supertest(app)
                .post('/account')
                .send(email)
                .expect(200)
                .then(result => {
                    expect(
                    result && result.body && result.body.message &&
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

        describe('account already activated',()=>{
            it("should return 409",async ()=>{
                await supertest(app)
                .post('/account')
                .send(email)
                .expect(409)
                .then(result => {
                    expect(
                    result && result.body && result.body.message 
                    )
                })
            })
        })

        describe('account with email id is not exist',()=>{
            it("should return 404",async ()=>{
                await supertest(app)
                .post('/account')
                .send(notExistEmailId)
                .expect(404)
                .then(result => {
                    expect(
                    result && result.body && result.body.message 
                    )
                })
            })
        })

        describe('Not eligible to create account ',()=>{
            it("should return 412",async ()=>{
                await supertest(app)
                .post('/account')
                .send(notEligibleAccount)
                .expect(412)
                .then(result => {
                    expect(
                    result && result.body && result.body.message 
                    )
                })
            })
        })
    })

    
})


