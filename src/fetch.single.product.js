const FindItemsByClassName = (name) => {
    const elements = document.querySelectorAll (name);
    return elements;
};
console.log(FindItemsByClassName ('.box'));

const GetingClickedItemInAList =  (cb, className) => {
    for (let i = 0; i < cb (className).length; i++) {};
};