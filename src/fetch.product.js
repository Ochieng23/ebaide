const SelectElementById = (id) => {
    const element = document.getElementById(id);
    return element;
};

const GetValueOfSelectElement = (element, id) => {
    return element(id).value;
};