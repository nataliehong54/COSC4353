//const { response } = require("express")

//const form = document.getElementById('reg-form')
const username = document.getElementById('username')
const password = document.getElementById('password')
const confirmm = document.getElementById('confirm')
const errorElement = document.getElementById('error')

//form.addEventListener('submit', registerUser)
//Send data as JSON to server
async function validateUser(){

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
        message.push('Password must be at least 6 characters.')
      }
      if(confirmm.value == '' || confirmm.value == null)
      {
        message.push('Confirm password cannot be empty.')
      }
      if(confirmm.value.length < 6 && confirmm.value != password.value)
      {
        message.push('Passwords do not match')
      }
      if(message.length > 0)
      {
        e.preventDefault()
        errorElement.innerText = message.join(' ')
      }
    })

    try{
        const result = await fetch("http://localhost:5000/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        data_returned = await result.json();
        console.log("registered")

    }catch(error){
        console.log(error)
    }

        //console.log(result)

        if (result.status === 'ok') {
          alert('Successfully register')
        } else {
          alert(result.error)
        }
      }

