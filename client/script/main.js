var counter = 0

get_address()

async function submitFuelForm(){
    // console.log("printing")
    // console.log(document.getElementById("gallons"))
    let data_returned = '';
    const the_form = document.getElementById("fuel_quote_form");
    const data = new FormData(the_form);
    const value = Object.fromEntries(data.entries());
    for (const [key, values] of data.entries()){
        console.log(key)
        if (values == ''){
            alert("Please fill all the required fields")
            return;
        }
    }

    try {
        const response = await fetch("http://localhost:5000/handleFuelQuoteForm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        });
        data_returned = await response.json();
        console.log(data_returned)
        fuel_history = document.getElementById('dynamic_history')
        html = ''
        if (data_returned != null){
            for (const i in data_returned){
                console.log(data_returned[i])
                html += '<ul class="ul_list">'
                for (const key in data_returned[i]){
                    console.log(data_returned[i][key])
                    html += `<li>${data_returned[i][key]}</li>`
                }
                html += '</ul>'
            }
        }
        fuel_history.innerHTML = html;

    } catch(err){
        console.log(err)
    }

}

async function get_address(){
    try {
        const response = await fetch("http://localhost:5000/getUserAddress", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        data_returned = await response.json();
        console.log(data_returned);
    } catch(err){
        console.log(err.message);
    }

    add_1 = document.getElementById('delivery_address');
    add_2 = document.getElementById('delivery_address2');
    city = document.getElementById('city');
    state = document.getElementById('state');
    zipcode = document.getElementById('zip_code');
    if (data_returned != null){
        add_1.value = data_returned['add_1']
        add_2.value = data_returned['add_2']
        city.value = data_returned['city']
        state.value = data_returned['state']
        zipcode.value = data_returned['zipcode']
    }
}

async function getFuelQUote(){
    const gallons = document.getElementById('gallons').value;
    const state = document.getElementById('state').value;
    const body = {gallons, state};
    try{
        const result = await fetch('http://localhost:5000/handleFuelQuoteForm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        result.json();
    }catch(err){
        console.log(err);
    }
}