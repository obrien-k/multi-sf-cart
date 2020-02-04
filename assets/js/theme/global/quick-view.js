import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';
import 'slick-carousel';

export default function (context) {
    const modal = defaultModal();
    console.log(context)
    if (context['productIds']) {
        

        console.log([context['productIds']]);
        [context['productIds']].forEach((id) => {
            utils.api.product.getById(id, { template: 'products/quick-view' }, (err, response) => {
                let sel = document.querySelector('#multi-desc');
                console.log(sel + '18');
                sel.innerHTML = response;
                console.log(sel + '20');
                console.log(err);
            });
        })
    
        
    }
    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            modal.$content.find('[data-slick]').slick();

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}
