# Cornerstone
This modification of BigCommerce's Cornerstone theme includes a custom "multi-layout" page which uses a modified product-view. It displays a "Combo to Cart" button for placeholder product IDs to all be added to cart. It also utilizes the Storefront Cart and GraphQL APIs. 

To apply this to a product on your store you'll need to include the custom field "is_bundled" with a value of true, as well as "foo" with the value for any Product ID you want added to cart and displayed on the page. Apply the "multi-layout.html" custom template to that product, and the changes should be seen on your storefront.
