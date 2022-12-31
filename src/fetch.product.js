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

const AddClassToNewElement = (element, tag, className) => {};