//const { ensureLoggedIn } = require("connect-ensure-login")
//const { response } = require("express")
//const { default: fetch } = require("node-fetch")

const username = document.getElementById('username')
const password = document.getElementById('password')
//const form = document.getElementById('login-form')
const errorElement = document.getElementById('error-msg-holder')

function validate(event) {
    form.addEventListener('submit', (e)=>{
        let message = []
        
        if(username.value == '' || username.value == null)
        {
            message.push('Username cannot be empty.')
        }
        if(username.value.length < 5)
        {
            message.push('Username must be at least 5 characters.')
        }
        if(password.value == '' || password.value == null)
        {
            message.push('Password cannot be empty.')
        }
        if(password.value.length < 6)
        {
            message.push('Password needs to be at least 6 characters.')
        }
        if(message.length >0)
        {
            e.preventDefault()
            errorElement.innerText = message.join(' ')
        }
    })
       // data_returned = await result.json();
        //console.log("data returned")
};