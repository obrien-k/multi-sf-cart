# Cornerstone
This modification of [BigCommerce's](https://github.com/bigcommerce/) [Cornerstone](https://github.com/bigcommerce/cornerstone) theme includes a custom product page called "multi-layout" which uses a minified version of [product-view.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/products/product-view.html). It displays a "Combo to Cart" button for placeholder product IDs to all be added to the cart. It utilizes BigCommerce's Storefront Cart and GraphQL APIs, as well as additional custom JS and CSS.

Modified theme files:
```
- /assets
  - /js
   - app.js*
   - /theme
    - custom.js*
  - /scss
   - multi-layout.scss*
   - theme.scss*
- /templates
 - /components
  - /custom*
   - multi-product.html*
   - multi-button.html*
 - /pages
  - /custom*
   - multi-layout.html*
```

To apply this to a product on your store you'll need to include the custom field "is_bundled" with a value of true, as well as "foo" with the value for any Product ID you want added to cart and displayed on the page. Apply the "multi-layout.html" custom template to that product, and the changes should be seen on your storefront.

This repository was created for the article, "Using Storefront APIs to Create Custom Product Display Page Experiences".
