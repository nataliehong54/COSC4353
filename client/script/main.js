var counter = 0

get_address()

async function getQuote(){
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
        const response = await fetch("http://localhost:5000/getQuote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        });
        data_returned = await response.json();
        console.log(data_returned)
        document.getElementById("price").innerHTML=`$${data_returned.suggested_price}`;
        document.getElementById("subtotal").innerHTML=`$${data_returned.subtotal}`;
        document.getElementById("shipping").innerHTML=`$0.00`;
        document.getElementById("tax").innerHTML=`$${data_returned.tax}`;
        document.getElementById("grandtotal").innerHTML=`$${data_returned.grand_total}`;

    } catch(err){
        console.log(err)
    }

}

async function submitQuote(){
    getQuote()

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

    console.log(value);
    try {
        const response = await fetch("http://localhost:5000/handleFuelQuoteForm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        });
        data_returned = await response.json();
        console.log(data_returned)
        fuel_history = document.getElementById('dynamic_history')
        html = `<table> 
                <tr>
                    <th>Gallons</th>
                    <th>Date Requested</th>
                    <th>City</th>
                    <th>Price</th>
                </tr>`;
        if (data_returned != null){
            for (const i in data_returned){
                console.log(data_returned[i])
                html += '<tr>'
                for (const key in data_returned[i]){
                    console.log(data_returned[i][key])
                    if (key == 'price') html += `<th>$${data_returned[i][key]}</th>`
                    else html += `<th>${data_returned[i][key]}</th>`
                }
                html += '</tr>'
            }
        }
        html += '</table>'
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