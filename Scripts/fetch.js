

async function GetJSON() {
    const response = await fetch('../data/data.json');
    const data = await response.json();
    console.log(data);
    return data;
    
}



export {GetJSON}