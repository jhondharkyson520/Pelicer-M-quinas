let products = [];

const loadProducts = async () => {
    try {
        const response = await fetch('db.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        products = await response.json();
        console.log('Produtos carregados:', products);
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
};

loadProducts().then(() => {
    let totalProductsShown = 6; 
    const productsSection = document.querySelector('.products');
    const button = document.getElementById('ver-mais');
    const searchInput = document.getElementById('searchInput');

    const loadInitialProducts = () => {
        productsSection.innerHTML = '';
        for (let i = 0; i < totalProductsShown && i < products.length; i++) {
            addProductToDOM(products[i], i);
        }

        if (totalProductsShown >= products.length) {
            button.style.display = 'none';
        }
    };

    const loadMoreProducts = () => {
        const remainingProducts = products.length - totalProductsShown;
        const productsToAdd = Math.min(remainingProducts, 6);

        for (let i = totalProductsShown; i < totalProductsShown + productsToAdd; i++) {
            addProductToDOM(products[i], i);
        }

        totalProductsShown += productsToAdd;

        if (totalProductsShown >= products.length) {
            button.style.display = 'none';
        }
    };

    if (button) {
        button.addEventListener('click', loadMoreProducts);
    }

    

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = filterProducts(products, searchTerm);

        productsSection.innerHTML = '';

        filteredProducts.forEach((product, index) => {
            addProductToDOM(product, index);
        });

        if (filteredProducts.length == 0) {        
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'Nenhum resultado encontrado.';
            noResultsMessage.style.color = '#FFF';
            productsSection.appendChild(noResultsMessage);
            filteredProducts = 0;
        }

        if (searchTerm == '') {
            totalProductsShown = 6
            loadInitialProducts();
            return;
        }

        
    };

    const filterProducts = (products, searchTerm) => {
        if (searchTerm === '') {
            return products;
        }
        return products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    };

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    loadInitialProducts();
});
