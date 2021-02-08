const result = document.getElementById('mealDetails');

// search button
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', (event) => {
   event.preventDefault();
   const inputField = document.getElementById('inputField').value;
   getUserData(inputField);
});

// input field code here
function getUserData(inputField) {
   result.style.display = "none";
   const meal = document.getElementById('meal');
   let url = "";
   if (inputField.length === 1) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputField}`;
      meal.innerHTML = null;
      meal.innerHTML = null;
   } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputField}`;
      meal.innerHTML = null;
      meal.innerHTML = null;
   }
   fetch(url)
      .then(res => res.json())
      .then(data => {
         displayData(data)
      })
}

// all meal box here
const displayData = data => {
   let text = "";
   if (data.meals) {
      data.meals.forEach(item => {
         const div = document.createElement('div');
         const allMealInfo = text + `
            <button onclick="showMealDetails('${item.strMeal}')" class="meal-box">
               <div>
                  <div>
                     <img class="img-fluid rounded" src="${item.strMealThumb}"/>
                     <div class="text">
                        <h5>${item.strMeal}</h5>
                     </div>
                  </div>
               </div>
            </button>`;
         div.innerHTML = allMealInfo;
         meal.appendChild(div);
      });
   }
   else {
      result.style.display = "none"
      const div = document.createElement('div');
      text = `
        <div class="error">
            <h3>Opps! this meal is not available right now.</h3>
        </div>`;
      div.innerHTML = text;
      meal.appendChild(div);
   }
}

// meal details here
const showMealDetails = (string) => {
   url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
   fetch(url)
      .then(res => res.json())
      .then(data => {
         result.style.display = "block"
         const div = document.createElement('div');
         let mealInfo;
         data.meals.forEach(eachItem => {
         if (string === eachItem.strMeal) {
            mealInfo = `
               <div>
                  <img src="${eachItem.strMealThumb}" class="img-fluid rounded">
                  <div class="item-details">
                     <div class="my-3">
                        <h3>${eachItem.strMeal}</h3>
                        <b>Ingredients</b>
                     </div>
                     <ul>
                        <li>${eachItem.strIngredient1}</li>
                        <li>${eachItem.strIngredient2}</li>
                        <li>${eachItem.strIngredient3}</li>
                        <li>${eachItem.strIngredient4}</li>
                        <li>${eachItem.strIngredient5}</li>
                        <li>${eachItem.strIngredient6}</li>
                        <li>${eachItem.strIngredient7}</li>
                        <li>${eachItem.strIngredient8}</li>
                        <li>${eachItem.strIngredient9}</li>
                        <li>${eachItem.strIngredient10}</li>
                     </ul>
                  </div>
               </div>`;
            }
         })
         div.innerHTML = mealInfo;
         result.appendChild(div);
      });
   result.innerHTML = null;
}
