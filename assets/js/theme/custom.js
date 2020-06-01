import PageManager from "./page-manager";
const fetch = require('node-fetch');

export default class Custom extends PageManager {
  constructor(context) {
    super(context);
    this.url = window.location.href; 
}
  onReady(){
    const token = jsContext.token;
    const cartId = jsContext.cartId;
    function getProductAndSiteInfo() {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          query: `
            query MyFirstQuery {
              site {
                products (entityIds: [`+arr+`]) {
                  edges {
                    product: node {
                      ...ProductFields
                      }
                    }
                }
                settings {
                  storeName
                  url {
                    vanityUrl
                  }
                }
              }
            }
          fragment ProductFields on Product {
            id
            entityId
            name
            sku
            path
            defaultImage {
              img320px: url(width: 320)
              img640px: url(width: 640)
              img960px: url(width: 960)
              img1280px: url(width: 1280)
              altText
            }
            prices {
              price {
              value
              currencyCode
              }
            retailPrice {
              value
              currencyCode
            }
          }
        }
      `}),
    }).then(res => res.json())
       .then(res => res.data);
    }
    
    getProductAndSiteInfo().then(data => {
      // With our data loaded, render the product listing
      renderPage(data);
      console.log(data);
    
      }).catch(e => {
        // Some error was encountered
        throw(e);
      });
    /*
      Utility functions for rendering
    */
    
    // Based on the browser locale, provide a localized price
    function formatLocalizedPrice (price) {
      return new Intl.NumberFormat(navigator.language, {style: 'currency', currency: price.currencyCode}).format(price.value);
    }
    
    // Create a srcset string for responsive images
    function renderSrcset(image) {
      return `${image.img320px} 320w, ${image.img640px} 640w, ${image.img960px} 960w, ${image.img1280px} 1280w`
    }
    /*
      Page rendering logic
     */
    function renderPage(data) {
      // Set up the add-to-cart-url format
      const addToCartURLFormat = `${data.site.settings.url.vanityUrl}/cart.php?action=add&product_id=`
      // Render the HTML for the product listing by looping over each product in the response
      document.getElementById('multi-desc').innerHTML = `${data.site.products.edges.map(node => renderProduct(node.product, addToCartURLFormat)).reduce((productsHtml, productHtml) => productsHtml += productHtml)}`;
    }
    
    function renderProduct(product, addToCartURLFormat) {
      // Render the product into a bootstrap "card"
      return `
      <div class="card" style="max-width: 33%;">
        ${product.defaultImage ? `<img loading="lazy" class="card-img-top" style="min-height: 33%; object-fit: contain;" src="${product.defaultImage.img960px}" srcset="${renderSrcset(product.defaultImage)}" alt="${product.defaultImage.altText}">` : ''
        }
          <div class="card-body">
            <h5 class="card-title">${product.name} ${renderPrice(product.prices)}</h5>
                      
            <a href="${addToCartURLFormat}${product.entityId}" class="btn btn-primary">Add to cart</a>
          </div>
        </div>`
      }
    
    function renderPrice(prices) {
      // Render the price component from the supplied prices
      return `<span class="card-text text-muted">(${prices.retailPrice ? `<del><span class="font-italic">${formatLocalizedPrice(prices.price)}</span></del> ` : ''}${formatLocalizedPrice(prices.price)})</span>`
    }
    

    function addMultiToCart(productIds, cartId){
      /* Sets the URL to an existing cart id + /items, if not use the cart endpoint to create a new cart */
      let url = cartId ?
      `/api/storefront/carts/${cartId}/items`:
      `/api/storefront/cart`
      /* Set a data variable to our lineItems object with the product ids mapped with a quantity of 1 */
      let data = {
          lineItems: productIds.map(id => ({
              quantity: 1,
              productId: id
          }))
      }
      console.log(url);
      let options = {
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
              "Content-Type": "application/json"
          }
      }
      /* Finally we fetch the cart URL with the generated URL and supplied options */
      return fetch(url, options)
      .then(res => res.json())
      .then(json => location.reload()); // Reloads the page
      
    }
    const multiButton = document.querySelector('#multiButton');
    // Selects the #id that we'll attach the addMultiToCart function to
    multiButton.addEventListener('click', event  => {
      addMultiToCart(arr, cartId) // run the addMultiToCart function with the array we created and a cart ID if ones available in the context.
    });

  }
  
}
