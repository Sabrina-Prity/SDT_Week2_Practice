const searchBtn = document.querySelector('.src-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    document.querySelector('.meal-details').classList.remove('showRecipe');
});

// Fetch and Display Meal List Based on Ingredient or Name
function getMealList() {
    let searchInput = document.querySelector('.src-txt').value.trim();
    
    // First, try searching by name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        // Check if meals are found by name
        if (data.meals) {
            displayMeals(data.meals);
        } else {
            // If no meals found by name, try searching by ingredient
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayMeals(data.meals);
                } else {
                    mealList.innerHTML = "Sorry, we didn't find any meal!";
                    mealList.classList.add('notFound');
                }
            });
        }
    });
}

// display meals on the page
function displayMeals(meals) {
    let temp = "";
    meals.forEach(meal => {
        temp += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `;
    });
    mealList.innerHTML = temp;
    mealList.classList.remove('notFound');
}


function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            mealRecipeModal(data.meals[0])
        });
    }
}



function mealRecipeModal(meal) {
    let temp = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p class="fullRecipe">${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = temp;
    document.querySelector('.meal-details').classList.add('showRecipe');
}
