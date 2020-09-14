const productsList = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('category');
    let currency = getCurrencyQueryParameter();
    let language = getLanguageQueryParameter();
    let categoryTitle = getCategoryTitle(categoryId);

    let limit = 5; // need to change
    let page = urlParams.get('page');
    let offset = (page - 1) * limit;

    productsController.getAllProducts(categoryId, language, currency, limit, offset).then(products => {
        renderProductsList(products, categoryTitle);
        renderPagination(products.total, limit)
    });
};

const getCategoryTitle = (categoryId) => {
    switch (categoryId) {
        case '1':
            return document.getElementById('ringsCategory').textContent;
        case '2':
            return document.getElementById('braceletsCategory').textContent;
        case '3':
            return document.getElementById('pedantsCategory').textContent;
        case '4':
            return document.getElementById('earringsCategory').textContent;
        case '5':
            return document.getElementById('chokersNecklacesCategory').textContent;
        case '6':
            return document.getElementById('setsCategory').textContent;
        default:
            return document.getElementById('categoryAllItems').textContent;
    }
};

const renderProductsList = (response, title, limit) => {
    renderCategoryTitle(title);

    if (response.data === null) {
        renderEmptyList();
    } else {
        renderTotalItemsText(response.total, response.data.length);
        renderItems(response.data, getCurrentCurrency());
    }
};

const renderEmptyList = () => {
    let noItems = document.createElement('div');
    noItems.className = 'article-level-4 text-center font-weight-medium';
    noItems.innerText = translations[currentLanguage].categories.noItemsInCategory;

    document.querySelector('#productsPageItemsList').appendChild(noItems);
};

const renderItems = (items, currency) => {
    for (let i = 0; i < items.length; i++) {
        const itemTitle = items[i].title;
        const itemPrice = items[i].price;
        const itemId = items[i].id;
        const itemImg = items[i].images[0].url;

        let productsListItem = document.createElement('div');
        productsListItem.className = 'col-md-3 mb-20';
        productsListItem.innerHTML = `
<div class="item" id="item_id_${itemId}" style="background: url(${itemImg})  center center no-repeat; min-height: 250px; background-size: contain;">
    <div class="price_cta_preview">
    <a href="/product-page.html?product_id=${itemId}">${itemTitle} | ${itemPrice} 
       <span class="currentCurrencyValPrice">${currency}</span>
       </a>
    </div>
</div>`;

        document.querySelector('#productsPageItemsList').appendChild(productsListItem);
    }
};

const renderCategoryTitle = (title) => {
    let catTitleItem = document.createElement('div');
    catTitleItem.className = 'font-weight-medium';
    catTitleItem.innerHTML = `${title}`;
    document.querySelector('#catTitle').appendChild(catTitleItem);
};


const renderTotalItemsText = (totalItems, itemsCount) => {
    let itemsCountElement = document.createElement('div');
    itemsCountElement.innerHTML = `Showing ${itemsCount} of ${totalItems} items`;
    document.querySelector('#itemsCount').appendChild(itemsCountElement);
};

const renderPagination = (totalItems, limit) => {
    let paginationWrapper = document.getElementById('pagination');
    let amountOfItems = Math.ceil(totalItems / limit);

    for (let i = 1; i <= amountOfItems; i++) {
        renderPageButton(i, paginationWrapper);
    }
}

const renderPageButton = (pageNumber, wrapper) => {
    let addItems = document.createElement('a');

    addItems.className = 'mr-15';
    addItems.setAttribute('href', `${window.location.host}/products-page.html?category=0&page=${pageNumber}`);
    addItems.innerHTML = `Page ${pageNumber}`;

    wrapper.appendChild(addItems);
}

if (window.location.pathname === '/products-page.html') {
    productsList();
}