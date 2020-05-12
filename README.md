# Cornerstone
This modification of [BigCommerce's](https://github.com/bigcommerce/) [Cornerstone](https://github.com/bigcommerce/cornerstone) theme includes a custom product page called "multi-layout" which uses a modified product-view. It displays a "Combo to Cart" button for placeholder product IDs to all be added to the cart. It utilizes BigCommerce's Storefront Cart and GraphQL APIs. 

To apply this to a product on your store you'll need to include the custom field "is_bundled" with a value of true, as well as "foo" with the value for any Product ID you want added to cart and displayed on the page. Apply the "multi-layout.html" custom template to that product, and the changes should be seen on your storefront.

This repository was created for the article, "Using Storefront APIs to Create Custom Product Display Page Experiences".
