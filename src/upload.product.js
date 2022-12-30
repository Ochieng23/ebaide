const GetElementById  = (id) => {
    return document.getElementById(id);
};

const GetElementValue = (elem, id) => {
    return elem(id).value;
};

const productObject = JSON.stringify( {
    title: GetElementValue(GetElementById, 'title-input'),
    description: GetElementValue(GetElementById, 'description-input'),
    price: GetElementValue(GetElementById, 'price-input'),
    variation:{
        color: GetElementValue(GetElementById, 'color-input'),
        size: GetElementValue(GetElementById, 'size-input'),
        quantity: GetElementValue(GetElementById, 'quantity-input'),
    },
    'product-image': GetElementValue(GetElementById, 'image-input'),
});

const GetToken = () => {
    const token = sessionStorage.getItem('login_token');
    return token;
};

const uploadApiUri = 'https://service.goebaide.com/api/product/new';

const PingFetchRequest = (uri, prod) => {

    fetch (uri, {
        method: 'POST',
        body: prod,
        headers: {
            'Authorization': 'Bearer ',
            'Content-Type': 'application/json',
        }
    })
};
