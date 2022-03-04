//HTML ELEMENTS
const foodLabel = document.querySelector(".food-label");
const foodImg = document.querySelector("#food-img");

const drinkLabel = document.querySelector(".drink-label");
const drinkImg = document.querySelector("#drink-img");

const newDinnerBtn = document.querySelector("#new-dinner");

const dropdownFoodBtn = document.querySelector(".dropdown-food");
const foodDropdownList = document.querySelector("#food-dropdown-list");
const foodIngredientsList = document.querySelector(".food-ingredients-list");
const foodStepsList = document.querySelector(".food-steps-list");

const dropdownDrinksBtn = document.querySelector(".dropdown-drinks");
const drinkDropdownList = document.querySelector("#drink-dropdown-list");
const drinkIngredientsList = document.querySelector(".drink-ingredients-list");
const drinkStepsList = document.querySelector(".drink-steps-list");

async function getData(){
    //get random meal's JSON file
    const foodData = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const foodJSON = await foodData.json();

    //get only first meal from JSON file
    const foodInfo = foodJSON.meals[0];

    //get random drink's JSON file
    const drinkData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    const drinkJSON = await drinkData.json();

    //get only first drink from JSON file
    const drinkInfo = drinkJSON.drinks[0];

    //setup up food's label and image
    foodLabel.innerHTML = foodInfo.strMeal;
    foodImg.src = foodInfo.strMealThumb;

    //reset the text of the food ingredient and instruction lists
    foodIngredientsList.innerHTML = "";
    foodStepsList.innerHTML = "";

    //for each ingredient in the JSON, format it and then add it to the food ingredient list
    for(let i = 1;i<=20;i++){
        let ingredient = foodInfo[`strIngredient${i}`] || "";
        let measure = foodInfo[`strMeasure${i}`] || "";
        if(!(ingredient === "") && !(measure === "") && !(measure === " ") && measure.includes("to") || measure.includes("and") || measure.includes("chopped") || measure.includes("in")){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${ingredient}, ${measure} `);
            node.appendChild(textNode);
            foodIngredientsList.appendChild(node);
        }else if(!(ingredient === "") && !(measure === "") && !(measure === " ") && !(measure.includes("to")) && !(measure.length === 1)){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${measure} of ${ingredient}`);
            node.appendChild(textNode);
            foodIngredientsList.appendChild(node);
        }else if(!(ingredient === "") && !(measure === "") && !(measure === " ") && measure.length === 1){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${measure} ${ingredient}`);
            node.appendChild(textNode);
            foodIngredientsList.appendChild(node); 
        }else if (!(ingredient === "") && !(measure === "") && !(measure === " ") ){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${ingredient}`);
            node.appendChild(textNode);
            foodIngredientsList.appendChild(node);
        }
    }

    //split the text of instructions into individual instructions and 
    //for each add it to the food instruction list
    const foodSteps = foodInfo.strInstructions.split("\r\n");
    console.log(foodSteps)
    let i = 0;
    foodSteps.forEach((val,index)=>{
       
        if(val !== "" && !(val.includes("STEP")) && val.length > 3){
            i += 1;
            let node = document.createElement("li");
            let textNode = document.createTextNode(`Step ${i}: ${val}`);
            node.appendChild(textNode);
            foodStepsList.appendChild(node);
        }
    })
    
    //reset the text of the drink ingredient and instruction lists
    drinkIngredientsList.innerHTML = "";
    drinkStepsList.innerHTML = "";

    //for each ingredient in the JSON, format it and then add it to the drink ingredient list
    for(let i = 1;i<=20;i++){
        let ingredient = drinkInfo[`strIngredient${i}`] || "";
        let measure = drinkInfo[`strMeasure${i}`] || "";
        if(!(ingredient === "") && !(measure === "") && !(measure === " ") && measure.includes("to") || measure.includes("and") || measure.includes("chopped") || measure.includes("in")){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${ingredient}, ${measure} `);
            node.appendChild(textNode);
            drinkIngredientsList.appendChild(node);
        }else if(!(ingredient === "") && !(measure === "") && !(measure === " ") && measure.length === 1){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${measure} ${ingredient}`);
            node.appendChild(textNode);
            drinkIngredientsList.appendChild(node); 
        }else if(!(ingredient === "") && !(measure === "") && !(measure === " ") && !(measure.includes("to")) && !(measure.length === 1)){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${measure} of ${ingredient}`);
            node.appendChild(textNode);
            drinkIngredientsList.appendChild(node);
        }else if (!(ingredient === "") && !(measure === "") && !(measure === " ")){
            let node = document.createElement("li");
            let textNode = document.createTextNode(`${ingredient}`);
            node.appendChild(textNode);
            drinkIngredientsList.appendChild(node);
        }
    }
    
    //split the text of instructions into individual instructions 
    //and for each add it to the food instruction list
    const drinkSteps = drinkInfo.strInstructions.split("\r\n");
    i = 0;
    drinkSteps.forEach((val,index)=>{
        if(val !== "" && !val.includes("STEP") && val.length > 3){
            i += 1;
            let node = document.createElement("li");
            let textNode = document.createTextNode(`Step ${i}: ${val}`);
            node.appendChild(textNode);
            drinkStepsList.appendChild(node);
        }
    })

    //setup up =drink's label and image
    drinkLabel.innerHTML = drinkInfo.strDrink;
    drinkImg.src = drinkInfo.strDrinkThumb;
}

//when the program runs for the first time, fetch the data and setup the food and drink sections
try{
    getData();
} catch(error){
    console.log(error);
}

//when the new dinner button is pressed, fetch the data again and setup a new food and drink section
newDinnerBtn.addEventListener("click", (e) => {
    try{
        getData();
    } catch(error){
        console.log(error);
    }
})

//toggle the food section's dropdown
dropdownFoodBtn.addEventListener("click", (e) => {
    console.log(foodDropdownList.style.display)
    if(foodDropdownList.style.display === "block"){
        foodDropdownList.style.display = "none";
    }else if (drinkDropdownList.style.display ==="" || drinkDropdownList.style.display ==="none"){
        foodDropdownList.style.display = "block";
    }
   
})

//toggle the drink sections's dropdown
dropdownDrinksBtn.addEventListener("click", (e) => {
    if(drinkDropdownList.style.display ==="block"){
        drinkDropdownList.style.display = "none";
    }else if (drinkDropdownList.style.display ==="" || drinkDropdownList.style.display ==="none"){
        drinkDropdownList.style.display = "block";
    }
})