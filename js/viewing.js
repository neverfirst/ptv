"use strict";

let ItemID = new URLSearchParams(new URL(window.location.href).search).get('id');

fetch('item-info.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed with status code " + response.status);
    }
  })
  .then(data => {
    const selectedItem = data.assets.find(item => item.id === parseInt(ItemID));

    document.title = document.title.replace(':ItemName', selectedItem.name);

    let ItemName = document.querySelector('#item-name a');
    let ItemIMG = document.querySelector('#item-image');
    let ItemType = document.querySelector('#item-type > h3');
    let ItemPrice = document.querySelector('#item-price');
    let ItemValue = document.querySelector('#item-value');
    let ItemAverage = document.querySelector('#item-average');
    let ItemDemand = document.querySelector('#item-demand');
    let ItemOwners = document.querySelector('#item-owners');
    let ItemTrend = document.querySelector('#item-trend');

    ItemName.innerText = selectedItem.name;
    ItemIMG.src = selectedItem.thumbnail;
    ItemName.setAttribute('href', 'https://polytoria.com/store/' + selectedItem.id);
    ItemType.innerText = selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1);
    ItemPrice.getElementsByTagName('h3')[0].innerText = 'NOT WORKING YET';
    ItemPrice.getElementsByTagName('h5')[0].innerText = 'PRICE (OG: :OG)'.replace(':OG', selectedItem.price);
    ItemValue.getElementsByTagName('h3')[0].innerText = selectedItem.value;
    ItemAverage.getElementsByTagName('h3')[0].innerText = selectedItem.averagePrice;
    ItemDemand.getElementsByTagName('h3')[0].innerText = selectedItem.demand;
    ItemOwners.getElementsByTagName('h3')[0].innerText = selectedItem.sales;
    ItemTrend.getElementsByTagName('h3')[0].innerText = selectedItem.trend;

    let ItemAcronym = document.createElement('span');
    ItemAcronym.classList.add('darken');
    ItemAcronym.innerText = ' (' + selectedItem.acronym + ') ';
    ItemName.appendChild(ItemAcronym);

    if (selectedItem.acronym === null) {
      ItemAcronym.innerHTML = '';
    }
  })
  .catch(error => {
    console.error(error);
    // Handle any errors that occurred during the request
  });