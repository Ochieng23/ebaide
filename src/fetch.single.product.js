const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

const FindingClickedClhild = (cb, id) => {
    const len = setTimeout (cb(id).children.length, 7000);
    return len
};
console.log ( FindingClickedClhild(FindParentProductHolder, 'view-single-product'));