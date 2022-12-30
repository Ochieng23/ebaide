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
    
});

console.log(productObject);
