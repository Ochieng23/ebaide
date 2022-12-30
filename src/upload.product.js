const GetElementById  = (id) => {
    return document.getElementById(id);
};

const GetElementValue = (elem, id) => {
    return elem(id).value;
};
(GetElementValue(GetElementById, 'title-input') === '' ||
GetElementValue(GetElementById, 'description-input')==='' ||
GetElementValue(GetElementById, 'price-input') === '' ||
GetElementValue(GetElementById, 'color-input') === '' ||
GetElementValue(GetElementById, 'size-input')  === '' ||
GetElementValue(GetElementById, 'quantity-input') === '' || )
console.log('GetElementValue'):
return;

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

const PingFetchRequest = (event, uri, prod, token) => {
    event.preventDefault();
    fetch (uri, {
        method: 'POST',
        body: prod,
        headers: {
            'Authorization': 'Bearer '+token(),
            'Content-Type': 'application/json',
        },
    })
    .then ( (response) => {
        return response.json();
    })
    .then ( (data) => {
        console.log(data);
    })
    .catch ( (err) => {
        console.log(err);
    } );
};

GetElementById ('upload_product').addEventListener ( 'submit', 
PingFetchRequest.bind(null, uploadApiUri, productObject, GetToken));