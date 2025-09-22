const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#btn");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(code in countryList){
        let new_option=document.createElement("option");
        new_option.innerText=code;
        new_option.value=code;
        if(select.name==="from" && code==="USD"){
            new_option.selected="Selected";
        }else if(select.name==="to" && code==="INR"){
            new_option.selected="Selected";
        }
        select.append(new_option);
    }
    select.addEventListener("change",e=>{
        updateflag(e.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.getElementById("amount");
    let amtval = amount.value;

    if (amtval === "" || amtval < 1) {
        alert("Please enter a valid amount");
        return;
    }

    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

        let total = (amtval * rate).toFixed(3);
        msg.innerText = `${amtval} ${fromcurr.value} = ${total} ${tocurr.value}`;
    } catch (error) {
        console.error("Error fetching rates:", error);
        msg.innerText = "Could not fetch exchange rate.";
    }
};

const updateflag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}


btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
});

const swapBtn = document.getElementById("swap-btn");
swapBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;
    updateflag(fromcurr);
    updateflag(tocurr);
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});
