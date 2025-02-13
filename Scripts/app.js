import { GetJSON } from "./fetch.js";

const contentDisplay = document.getElementById("contentDisplay");

const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");

const pages10Btn = document.getElementById("pages10Btn");
const pages20Btn = document.getElementById("pages20Btn");
const pages30Btn = document.getElementById("pages30Btn");
const pages40Btn = document.getElementById("pages40Btn");
const pages50Btn = document.getElementById("pages50Btn");

const sortIDBtn = document.getElementById("sortIDBtn");
const sortFirstNameBtn = document.getElementById("sortFirstNameBtn");
const sortLastNameBtn = document.getElementById("sortLastNameBtn");
const sortHeightBtn = document.getElementById("sortHeightBtn");
const sortAgeBtn = document.getElementById("sortAgeBtn");

const currentPageDisplay = document.getElementById("currentPageDisplay");
const totalPagesDisplay = document.getElementById("totalPagesDisplay");

// Global variables
let peopleArray = [];
let pageSize = 10;
let currentPage = 1;
let totalPages = 1;


// Get data and set up the people array + total pages
const setStuff = async () => {
    const whatever = await GetJSON();
    peopleArray = whatever.People;
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    console.log(peopleArray);
    return peopleArray;
}


// Get items for the current page
async function getItems(page) 
{
    const start = (page - 1) * pageSize;
    return peopleArray.slice(start, start + pageSize);
}

// Display the current page
async function displayCurrentPage()
{
    contentDisplay.innerHTML = "";
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

// Next page function
async function nextPage()
{
    if (currentPage < totalPages) 
    {
        currentPage++;
        currentPageDisplay.innerHTML = currentPage;
        await displayCurrentPage();
    }
}

// Previous page function
async function previousPage() 
{
    if (currentPage > 1)
    {
        currentPage--;
        currentPageDisplay.innerHTML = currentPage;
        await displayCurrentPage();
    }
}


nextBtn.addEventListener('click', () => {
    nextPage();
})

previousBtn.addEventListener('click', () => {
    previousPage();
})

// Onload function
async function initialize() {
   
    await setStuff();
    displayCurrentPage();
}
initialize();

// Event listeners for page size buttons
pages10Btn.addEventListener('click', () => {
    pageSize = 10;
    // Rounds up to the nearest whole number
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    currentPage = 1;
    displayCurrentPage();
})

pages20Btn.addEventListener('click', () => {
    pageSize = 20;
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    currentPage = 1;
    displayCurrentPage();
})

pages30Btn.addEventListener('click', () => {
    pageSize = 30;
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    currentPage = 1;
    displayCurrentPage();
})

pages40Btn.addEventListener('click', () => {    
    pageSize = 40;
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    currentPage = 1;
    displayCurrentPage();
})

pages50Btn.addEventListener('click', () => {
    pageSize = 50;
    totalPages = Math.ceil(peopleArray.length / pageSize);
    totalPagesDisplay.innerHTML = totalPages;
    currentPage = 1;
    displayCurrentPage();
})

// Event listeners for sort buttons
sortIDBtn.addEventListener('click', () => {
    peopleArray.sort((a, b) => a.Id - b.Id);
    displayCurrentPage();
})

// LocalCompare is used to sort strings based on the users Langueage
sortFirstNameBtn.addEventListener('click', () => {
    peopleArray.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
    displayCurrentPage();
})

sortLastNameBtn.addEventListener('click', () => {
    peopleArray.sort((a, b) => a.LastName.localeCompare(b.LastName));
    displayCurrentPage();
})

// Since the height is a string, we need to parse it to a number
sortHeightBtn.addEventListener('click', () => {
    peopleArray.sort((a, b) => parseFloat(a.Height) - parseFloat(b.Height));
    displayCurrentPage();
})

sortAgeBtn.addEventListener('click', () => {
    peopleArray.sort((a, b) => a.Age - b.Age);
    displayCurrentPage();
})