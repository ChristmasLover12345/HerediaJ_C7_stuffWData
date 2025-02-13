import { GetJSON } from "./fetch.js";

const contentDisplay = document.getElementById("contentDisplay");

let pageSize = 10;
let currentPage = 1;



const setStuff = async () => {
    const whatever = await GetJSON();
    let poepleArray = whatever.People
    console.log(poepleArray);
    return poepleArray;
}



async function getItems(page) 
{
    const test = await setStuff();
    const start = (page - 1) * pageSize;
    return test.slice(start, start + pageSize);
}

async function displayCurrentPage()
{
    const items = await getItems(currentPage);
    for (let item of items) 
    {
        const div = document.createElement("div");
        const name = document.createElement("p");
        const height = document.createElement("p");
        const age = document.createElement("p");
        const id = document.createElement("p");

        div.classList.add("w-[95%]", "rounded-[5px]", "flex", "justify-between", "items-center", "bg-black", "p-1", "m-1", "border", "border-white");
        name.innerText = `${item.FirstName} ${item.LastName}`;
        name.classList.add("text-[20px]", "font-bold", "text-white");
        height.innerText = `Height: ${item.Height}`;
        height.classList.add("text-[16px]", "text-white");
        age.innerText = `Age: ${item.Age}`;
        age.classList.add("text-[16px]", "text-white");
        id.innerText = `ID: ${item.Id}`;
        id.classList.add("text-[16px]", "text-white");

        div.appendChild(name);
        div.appendChild(height);
        div.appendChild(age);
        div.appendChild(id);
        contentDisplay.appendChild(div);
    }
}

function nextPage()
{
    if (currentPage < totalPages) 
    {
        currentPage++;
        displayCurrentPage();
    }
}

function previousPage() 
{
    if (currentPage > 1)
    {
        currentPage--;
        displayCurrentPage();
    }
}

displayCurrentPage();
    