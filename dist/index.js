/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const register = __webpack_require__(/*! ./register */ \"./src/register.js\");\nconst name = \"ocheing\";\n\n//# sourceURL=webpack://ebaide/./src/index.js?");

/***/ }),

/***/ "./src/register.js":
/*!*************************!*\
  !*** ./src/register.js ***!
  \*************************/
/***/ ((module) => {

eval("const newElement = tag => {\n  const newElement = document.createElement(tag);\n  return newElement;\n};\n//Get Element\nconst ElementById = id => {\n  const element = document.getElementById(id);\n  return element;\n};\n\n//Closing form on submission\nconst closeRegistrationForm = () => {\n  ElementById(\"reg_form\").style.display = \"none\";\n};\n//Error handling\nconst Error = msg => {\n  const para = newElement(\"p\");\n  para.innerHTML = msg;\n  ElementById(\"reg_form\").appendChild(para);\n};\n\n/**\r\n * @TODO clear and replace error messages on every submit with error:\r\n * @param {*} e \r\n * @returns \r\n */\nconst getData = e => {\n  e.preventDefault();\n  const firstname = ElementById(\"firstname\").value;\n  const lastname = ElementById(\"lastname\").value;\n  const phonenumber = ElementById(\"phonenumber\").value;\n  const email = ElementById(\"email\").value;\n  const password = ElementById(\"password\").value;\n  if (firstname === \"\" && lastname === \"\" && phonenumber === \"\" && email === \"\" && password === \"\") {\n    Error(\"All fields must be filled!\");\n    return;\n  }\n  if (password.length < 8) {\n    Error(\"Password must be at least 8 characters\");\n    return;\n  }\n  const body = JSON.stringify({\n    firstname,\n    lastname,\n    phonenumber,\n    email,\n    password\n  });\n  fetch(\"https://service.goebaide.com/api/auth/register\", {\n    method: \"POST\",\n    body: body,\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(response => {\n    return response.json();\n  }).then(data => {\n    //closeRegistrationForm();\n    console.log(data.status);\n    if (data.status === \"error\") {\n      const para = newElement(\"p\");\n      para.innerHTML = data.error;\n      console.log(para);\n      document.body.appendChild(para);\n      return;\n    }\n    ;\n    const para = newElement(\"p\");\n    para.innerHTML = data.message;\n    document.body.appendChild(para);\n  }).catch(error => {\n    const para = newElement(\"p\");\n    para.innerHTML = error.error;\n    console.log(para.innerHTML);\n    document.body.appendChild(para);\n  });\n};\nElementById(\"reg_form\").addEventListener(\"submit\", getData);\nmodule.exports = {\n  newElement,\n  ElementById\n};\n\n//# sourceURL=webpack://ebaide/./src/register.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;