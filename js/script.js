let mainRow = document.getElementById('restaurants');
let errorContainer = document.getElementById('notificationMessage');
let getData = () => fetch('./api/restaurants.json').then(data => data.json());
let restaurants = [];

let getRestaurantCard = (restaurant) => {

    let a = JSON.parse(localStorage.getItem('fav'));
    if(a !== null) {
       var favIconClass = (!a.find(res => res.id === restaurant.id)) ? 'fa-heart' : 'fa-heart-red';
    }
    else {
       var favIconClass = 'fa-heart';
    }
    return `<div class="col-md-3">
              <div class="card">
                  <div class="image">
                     <img src="${restaurant.img}" alt="Card image" />
                     <span class="favourite" onclick="markFavourite(this, ${restaurant.id})" id="${favIconClass}">
                     <i class="far fa-heart"></i>
                     </span>
                  </div>
                  <div class="card-body">
                       <h4 class="card-title">${restaurant.name}</h4>
                       <div class="stars" style="--rating:${restaurant.rating}" ></div>
                  </div>

                 
              </div>
            </div>`
}


let generateView = data => data.map(restaurant => getRestaurantCard(restaurant));

let loadRestaurants = () => {
   getData().then(data => {
      restaurants = JSON.parse(JSON.stringify(data));
      mainRow.innerHTML = generateView(data).join('');
   })
   .catch(err => {
      errorContainer.innerText = 'Something Went Wrong';
   })
}

let searchRestaurantData = () => {
   console.log('Search data called');
   let d = document.getElementById('myInput');
   let searchResult = restaurants.filter(restaurant =>restaurant.tags.toString().toUpperCase().indexOf(d.value.toUpperCase()) > -1);
   mainRow.innerHTML = generateView(searchResult).join('');
   errorContainer.innerText = ( searchResult.length === 0) ? 'No Results Found' : '';
}

let debounce = (fn,delay) => {
   let timeout;
   return function() {
     clearTimeout(timeout);
     timeout = setTimeout(() => fn(), delay);
   }
}

let searchData = debounce(searchRestaurantData, 500);

let markFavourite = (restaurant, id) => {
    if(!localStorage.getItem('fav')){
       let a = [];
       localStorage.setItem('fav', JSON.stringify(a));
    }
    let a = [];
    a = JSON.parse(localStorage.getItem('fav'));
    let favRestaurant = restaurants.filter(restaurant => restaurant.id === id);
    if(!a.find(restaurant => restaurant.id === id)) {
       a.push(...favRestaurant);
       restaurant.setAttribute("style", "color : red");
    }
    else {
       let indexOfExistingRes = a.find(restaurant => restaurant.id === id);
       a.splice(indexOfExistingRes, 1);
       restaurant.setAttribute("style","color:#fff");
    }
    localStorage.setItem('fav', JSON.stringify(a));
}
loadRestaurants();