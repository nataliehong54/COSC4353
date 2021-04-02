const Full_Name = document.getElementById('Full Name')
const Address_1 = document.getElementById('Address 1')
const Address_2 = document.getElementById('Address 2')
const City = document.getElementById('City')
const State = document.getElementById('State')
const Zipcode = document.getElementById('Zipcode')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

display_data()

function validate(){
  form.addEventListener('submit', (e) =>{
    let messages = []
    if(Full_Name.value == '' || Full_Name.value == null){
      messages.push('Name is required.')
    }
  /*
    if(Full_Name.value.length >= 50){
      messages.push('Name needs to be below 50 characters.')
    }
    */

    if(Address_1.value == '' || Address_1.value == null){
      messages.push('Address is required.')
    }
  /*
    if(Address_1.value.length >= 100){
      messages.push('Address needs to be below 100 characters.')
    }

    if(Address_2.value.length >= 100){
      messages.push('Address needs to be below 100 characters.')
    }
    */

    if(City.value == '' || City.value == null){
      messages.push('City is required.')
    }

    /*
    if(City.value.length > 100){
      messages.push('City needs to be below 100 characters.')
    }
    */

    if(Zipcode.value == '' || City.value == null){
      messages.push('Zipcode is required.')
    }

    if(Zipcode.value.length != 5){
      messages.push('5 character zipcode required.')
    }

    if(messages.length > 0){
      e.preventDefault()
      errorElement.innerText = messages.join(', ')
    } else{
      send_data()
      fetch("http://localhost:5000/sendmongo", {
        method: "Get",
        headers: { "Content-Type": "application/json" },
      });
    }
  })
}

async function send_data(){
  const body = {
    var1 : Full_Name.value,
    var2 : Address_1.value,
    var3 : Address_2.value,
    var4 : City.value,
    var5 : State.value,
    var6 : Zipcode.value

  }

  /*
  const body1 = {
    var1 : Full_Name.value
  }
  */
  try {   
    const response = await fetch("http://localhost:5000/send_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    //const send_name = Full_Name
   
    data_returned = await response.json();
    // res.redirect('/client/index.html')
    display_data()
  } catch(err){
      console.log(err)
  }


 
}

  // try{
  //    const response_mongo = await fetch("http://localhost:5000/sendmongo", {
  //       method: "Get",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     data_returned = await response_mongo.json();
  //     console.log("data returned")
  //   }catch(err){
  //     console.log(err)
  //   }



async function display_data(){
  try {
    const response = await fetch("http://localhost:5000/getUserAddress", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    data_returned = await response.json();
    console.log(data_returned)
    user_info_section = document.getElementById('user_info');
    if (data_returned != null){
      html = '<ul class="user_info">'
      for (var key in data_returned){
          var value = data_returned[key]
          html += `<li>${value}</li>`
      }
      html += '</ul>'
      user_info_section.innerHTML = html;
    }
  } catch(err){
      console.log(err)
  }
}


/*
//drop down box
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  */

function send_address(){
    console.log("send_address is being called")
    try {
        console.log("calling /sendmongo")
        console.log("successful /sendmongo call");
    } catch(err){
        console.log(err)
    }
}
