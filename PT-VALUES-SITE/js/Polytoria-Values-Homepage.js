// Get card layout
let CardLayout = document.getElementsByClassName('card-layout')[0]

// Get newest collectible header
let NewestCollectibleHead = document.getElementsByClassName('newest-collectible')[0]

// Remove every item card except for the newest collectible header
Array.from(CardLayout.children).forEach(element => {if (element != CardLayout.children[0]){element.remove();}});

// Define the inner HTML of item cards
let ItemCardContents = `
<a href="./viewing/:ItemID.html" class="no-decoration-item-text">
    :ItemName
    <img src=":ItemThumbnail" class="item-card">
</a>
`

// Define limited items array
let LimitedItems = []

// Get the first 100 items that are a hat, a tool, or a face sorted by creation date
fetch('https://api.polytoria.com/v1/store?types[]=hat&types[]=tool&types[]=face&sort=createdAt&order=desc&limit=100')
  .then(response => response.json())
  .then(data => {
    // Filter out items that aren't limited
    data.assets.forEach(item => {
      if (item.isLimited === true) {
        LimitedItems.push(item)
      }
    });

    // Create item cards for each limited
    LimitedItems.forEach(item => {
        let NewItemCard = document.createElement('div')
        NewItemCard.id = 'card'
        NewItemCard.classList.add(item.type + '-type')
        NewItemCard.innerHTML = ItemCardContents.replace(':ItemID', item.id).replace(':ItemName', item.name).replace(':ItemThumbnail', item.thumbnail)
        CardLayout.appendChild(NewItemCard)

        if (item === LimitedItems[0]) {
            let ItemName = NewestCollectibleHead.getElementsByTagName('h1')[0]
            let H3 = NewestCollectibleHead.getElementsByTagName('h3')
            let IMG = NewestCollectibleHead.getElementsByTagName('img')[0]
            ItemName.innerText = item.name
            H3[1].innerText = '"' + item.description + '"'
            H3[2].innerText = "Type: " + item.type.charAt(0).toUpperCase() + item.type.slice(1)
            H3[3].innerText = "OG Price: " + item.price + " bricks"
            IMG.setAttribute('src', item.thumbnail)
            fetch('https://api.polytoria.com/v1/store/' + item.id)
                .then(response => response.json())
                .then(data => {
                    H3[4].innerText = "Owned: " + data.sales
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });