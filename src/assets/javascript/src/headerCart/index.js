$('#cart').on('click', function (e) {
    let container = $(".shopping-cart");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.fadeToggle("fast");
    }
});

const quantityCartHeader = () => {
    let amountOfAddedItemsInCart = $('.shopping-cart-items .clearfix');
    if (amountOfAddedItemsInCart) {
        $('#cartQuantityHeader').html(amountOfAddedItemsInCart.length);
        $('#cartQuantityContainer').html(amountOfAddedItemsInCart.length);
    }

    if ($('.shopping-cart-items .clearfix').length >= 1) {
        $('.empty_cart').addClass('d-none')
    }

};

const cartSum = () => {
    let cartTotalSumHeader = $('#cartTotalSumHeader');
    let itemPrice = document.querySelectorAll('.itemPrice');

    let totalSum = 0;

    for (let i = 0; i < itemPrice.length; i++) {
        let singleItemPrice = itemPrice[i];
        totalSum += parseFloat(singleItemPrice.innerText.substr(1));
        let toFixedTest = totalSum.toFixed(2);
        cartTotalSumHeader.html('$ ' + `${toFixedTest}`);
    }
};

const toggleCurrencyList = () => {
    $('#currency').change(function () {
        let currency = $("#currency option:checked").val();
        $('.curr').html(currency);
        console.log(currency);
    });

    // $('#currentCurrency').on('click', function () {
    //     $('.currency_hidden').fadeToggle("fast");
    // })
    //
    // $('#currencyEuro').on('click', function () {
    //     $('#currentCurrency').html($('#currencyEuro').html())
    // })
};

const categoriesToggle = () => {
    let cat1 = document.getElementById('ringsTestString');
    let cat2 = document.getElementById('braceletsTestString');
    let cat3 = document.getElementById('pedantsTestString');
    let cat4 = document.getElementById('earringsTestString');
    let cat5 = document.getElementById('chokersNecklacesTestString');

    cat1.onclick = () => {
        window.location.href = 'products-page.html?=1'
    };
    cat2.onclick = () => {
        window.location.href = 'products-page.html?=2'
    };
    cat3.onclick = () => {
        window.location.href = 'products-page.html?=3'
    };
    cat4.onclick = () => {
        window.location.href = 'products-page.html?=4'
    };
    cat5.onclick = () => {
        window.location.href = 'products-page.html?=5'
    };
};

quantityCartHeader();
cartSum();
categoriesToggle();
toggleCurrencyList();

//$.getJSON('http://164.90.218.246:8000/admin/products', function (data) {
//  console.log(data)
//});


