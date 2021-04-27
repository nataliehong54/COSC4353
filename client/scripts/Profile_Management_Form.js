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

    if(Address_1.value == '' || Address_1.value == null){
      messages.push('Address is required.')
    }

    if(City.value == '' || City.value == null){
      messages.push('City is required.')
    }

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
    }
  })
}

async function send_data(){
  console.log("send_data function called")
  const body = {
    var1 : Full_Name.value,
    var2 : Address_1.value,
    var3 : Address_2.value,
    var4 : City.value,
    var5 : State.value,
    var6 : Zipcode.value
  }
  try {   
    const response = await fetch("http://localhost:5000/send_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    display_data()
  } catch(err){
      console.log(err)
  }
}

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
      html = '<div class="card">'
          html += `<h1>${data_returned['name']}</h1>`;
          html += `<p class="title">${data_returned['add_1']} ${data_returned['add_2']}</p>`;
          html += `<h3>${data_returned['city']}, ${data_returned['state']}</h3>`;
          html += `<h3>${data_returned['zipcode']}</h3>`
      html += '</div'
      user_info_section.innerHTML = html;
    }
  } catch(err){
      console.log(err)
  }
}
