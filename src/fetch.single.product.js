const FindItemsByClassName = (name) => {
    const elements = document.querySelectorAll (name);
    return elements;
};
console.log(FindItemsByClassName ('.btn'))
// const DisplaysingleProduct = () => {
//     console.log('DisplaysingleProduct');
// };

// const GetingClickedItemInAList =  (cb1, cb2, className) => {
//     for (let i = 0; i < cb1(className).length; i++) {
//         cb1(className)[i].addEventListener ('click', cb2);
//     };
// };

//GetingClickedItemInAList (FindItemsByClassName, DisplaysingleProduct, '.view-product')