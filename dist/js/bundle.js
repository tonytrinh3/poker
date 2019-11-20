/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n\r\nconst state = {};\r\n\r\n\r\n// const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()\r\n// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808\r\n\r\nconst getDeckOfCards = async () => {\r\n    try{\r\n        const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');\r\n        const data = await result.json();\r\n        \r\n\r\n        //this is an array of 5 \r\n        const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();\r\n        \r\n        const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();\r\n        \r\n\r\n        //https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render/33846747\r\n        //Because you are calling that function instead of passing the function to onClick, change that line to this:\r\n\r\n\r\n        let count = 0;\r\n        console.log(count);\r\n\r\n        \r\n        const renderCard = (cards,playerNumber) =>{\r\n            cards.forEach((curEl, index) => {\r\n                const displayCard = `<img src = ${curEl.image} alt = ${curEl.code}/>`;\r\n\r\n                const cardIndex = (playerNumber*10)+index+1;\r\n\r\n                document.querySelector(`.players-card__card--${cardIndex}`).insertAdjacentHTML('beforeend',displayCard);\r\n\r\n                //https://dev.to/karataev/set-css-styles-with-javascript-3nl5\r\n                let style = document.createElement('style');\r\n                style.innerHTML = `\r\n                .players-card__card--${index+1} {\r\n                background-color: green;\r\n                }\r\n                `;\r\n                document.head.appendChild(style);\r\n                //passed down the cards array from json, cardindex that is relevant to changing the card, and player number\r\n                renderNewCard(cards,cardIndex, playerNumber);\r\n\r\n            });\r\n        };\r\n\r\n            //receives the cards array from json, cardindex that is relevant to changing the card, and player number\r\n        const renderNewCard = (cards,index, playerNumber)=>{\r\n            //render new card\r\n            document.querySelector(`.players-card__card--${index}`).addEventListener('click', async () =>{   \r\n                count++\r\n                console.log(count);\r\n                const newCard = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)).json();\r\n                const displayNewCard = `<img src = ${newCard.cards[0].image} alt = ${newCard.cards[0].code}>`;\r\n                const el = document.querySelector(`.players-card__card--${index}`);\r\n                    \r\n                \r\n                //https://www.w3schools.com/jsref/met_node_removechild.asp\r\n                el.removeChild(el.childNodes[0]);\r\n                el.disabled=true;\r\n                \r\n                //https://dev.to/karataev/set-css-styles-with-javascript-3nl5\r\n                let style = document.createElement('style');\r\n                style.innerHTML = `\r\n                .players-card__card--${index} {\r\n                background-color: red;\r\n                border-radius: 10px;\r\n                padding: 4px;\r\n                }\r\n                `;\r\n                document.head.appendChild(style);\r\n\r\n                document.querySelector(`.players-card__card--${index}`).insertAdjacentHTML('beforeend', displayNewCard);\r\n\r\n                                \r\n                if (count === 3){\r\n                    disableAllCards(cards, playerNumber);\r\n            \r\n                    // let style = document.createElement('style');\r\n                    // style.innerHTML = `\r\n                    // .players-card__player-${playerNumber} .players-card__card {\r\n                    // background-color: red;\r\n                    // border-radius: 10px;\r\n                    // padding: 4px;\r\n                    // }\r\n                    // `;\r\n                    // document.head.appendChild(style);\r\n                    //reset count when 3 cards are changed\r\n                    count = 0;\r\n                }\r\n\r\n            });\r\n\r\n        };\r\n\r\n        const disableAllCards = (cardsArray, playerNumber) =>{\r\n            //cardsArray is just the array of cards from the json passed down\r\n            //https://www.w3schools.com/jsref/met_document_queryselectorall.asp\r\n            for(let i=0; i < cardsArray.length; i++){\r\n                const cardIndex = playerNumber * 10 + i + 1;\r\n                \r\n                document.querySelector(`.players-card__card--${cardIndex}`).disabled=true;\r\n            }\r\n        };\r\n\r\n\r\n        renderCard(playerOne.cards,1);\r\n        \r\n\r\n        document.querySelector(`.turn__button`).addEventListener('click', () =>{\r\n            //reset count when new turn\r\n            count = 0;\r\n            let style = document.createElement('style');\r\n            style.innerHTML = `\r\n            .players-card__player-1{\r\n                display: none;\r\n            }\r\n\r\n            .players-card__player-2{\r\n                display: block;\r\n                }\r\n            .turn__button{\r\n                display: none;\r\n            }\r\n            .showdown__button {\r\n                display: inline-block;\r\n                background-color: #FF4136;\r\n            }\r\n            `;\r\n            document.head.appendChild(style);\r\n            renderCard(playerTwo.cards,2);\r\n            document.querySelector(`.turn__button`).disabled=true;\r\n        });\r\n\r\n        document.querySelector(`.showdown__button`).addEventListener('click', () =>{\r\n            let style = document.createElement('style');\r\n            style.innerHTML = `\r\n            .players-card__player-1  {\r\n                display: block;\r\n            }\r\n            .players-card__player-1 p {\r\n                display: none;\r\n            }\r\n            .players-card__player-2 p{\r\n                display: none;\r\n            }\r\n            .players-card__card{\r\n                background-color: green;\r\n                border-radius: 10px;\r\n                padding: 4px;\r\n            }\r\n            .showdown__button {\r\n                display: none;\r\n            }\r\n            `;\r\n            document.head.appendChild(style);\r\n        });\r\n        \r\n    \r\n    } catch (error){\r\n        alert(error);\r\n    }\r\n    \r\n};\r\n\r\ngetDeckOfCards();\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });