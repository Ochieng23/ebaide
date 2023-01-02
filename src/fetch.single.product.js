const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

const FindingClickedClhild = (cb, id) => {
    for (let i = 0; i < cb(id).length; i++) {
        cb(id)[i];
    };
};
console.log ( FindingClickedClhild, 'view-single-product');