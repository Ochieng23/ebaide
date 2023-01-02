const FindItemsByClassName = (name) => {
    const elements = document.querySelectorAll (name);
    console.log(elements);
};

const DisplaysingleProduct = () => {
    console.log('DisplaysingleProduct');
};

const GetingClickedItemInAList =  (cb, className) => {
    for (let i = 0; i < cb(className).length; i++) {
        console.log (cb(className)[i]);
    };
};

setTimeout(
    FindItemsByClassName('.view-product'), 20000
)