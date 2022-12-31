const SelectElementById = (id) => {
    const element = document.getElementById(id);
    return element;
};

const GetValueOfSelectElement = (element, id) => {
    return element(id).value;
};

const CreateNewElement = (tag) => {
    const element = document.createElement(tag);
    return element;
};

const AddClassToNewElement = (element, tag, className) => {
    element(tag).classList.add(className);
    return;
};

const RemoveClassFromNewElement = (element, id, className) => {
    element(id).classList.remove(className);
};

const GetSelectedElementWithClassName = (className) => {
    const element = document.querySelector("."+className);
    return element;
};

const GetSelectedElementsWithClassName = (className) => {
    const element = document.querySelectorAll("."+className);
    return element;
};

const ProductBackendAPIURI = 'https://service.goebaide.com/api/product/all_products';

const PullProductsFromBackendAPI = () => {
    fetch (ProductBackendAPIURI, {
        method: 'GET',
    })
    .then ( (response) =>{
        return response.json();
    })
    .then ( (data) => {
        if (data.error){

            return;
        };
        console.log(data.data)
    })
    .catch ( (err) => {});
};