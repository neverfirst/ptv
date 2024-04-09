let ItemID = new URLSearchParams(new URL(window.location.href).search).get('id');
if (!(ItemID)) {
    window.location.pathname = ''
}

fetch('https://api.polytoria.com/v1/store/:id'.replace(':id', ItemID))
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed with status code " + response.status);
    }
  })
  .then(data => {
    if (data.isLimited === false) {
        window.location.pathname = ''
        return ''
    }

    document.title = document.title.replace(':ItemName', data.name)

    let ItemName = document.querySelector('.item-name a');
    let ItemIMG = document.querySelector('.item-src img');
    let ItemType = document.querySelector('.item-type > h3');
    let ItemPrice = document.querySelector('.item-price');
    let ItemValue = document.querySelector('.item-value');
    let ItemAverage = document.querySelector('.item-average');
    let ItemDemand = document.querySelector('.item-demand');
    let ItemOwners = document.querySelector('.item-owners');
    let ItemTrend = document.querySelector('.item-trend');

    ItemIMG.src = data.thumbnail
    ItemName.innerText = data.name
    ItemName.setAttribute('href', 'https://polytoria.com/store/' + data.id)
    ItemType.innerText = data.type.charAt(0).toUpperCase() + data.type.slice(1)
    ItemPrice.getElementsByTagName('h3')[0].innerText = ' - '
    ItemPrice.getElementsByTagName('h5')[0].innerText = 'PRICE (OG: :OG)'.replace(':OG', data.price)
    ItemValue.getElementsByTagName('h3')[0].innerText = 'None'
    ItemAverage.getElementsByTagName('h3')[0].innerText = data.averagePrice
    ItemDemand.getElementsByTagName('h3')[0].innerText = 'Not set'
    ItemOwners.getElementsByTagName('h3')[0].innerText = data.sales
    ItemTrend.getElementsByTagName('h3')[0].innerText = ' - '
  })
  .catch(error => {
    console.error(error);
    // Handle any errors that occurred during the request
  });