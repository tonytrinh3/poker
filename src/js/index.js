import Hand from "./pokersolver-master/pokersolver.js"
const state = {};

var hand1 = Hand.solve(['3d', '4d', 'Kd', '5d', '2s']);
var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Qs', 'Qd']);
var winner = Hand.winners([hand1, hand2]); // hand2

console.log(hand1);
console.log(hand2);
console.log(winner);



// const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()
// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

const getDeckOfCards = async () => {
    try{
        const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await result.json();
        

        //this is an array of 5 
        const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();
        
        const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();
        
        state.playerOneCards = playerOne.cards;
        console.log(state.playerOneCards)
            state.playerTwoCards = playerTwo.cards;

        //https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render/33846747
        //Because you are calling that function instead of passing the function to onClick, change that line to this:


        let count = 0;
        console.log(count);

        
        const renderCard = (cards,playerNumber) =>{
            cards.forEach((curEl, index) => {
                const displayCard = `<img src = ${curEl.image} alt = ${curEl.code}/>`;

                const cardIndex = (playerNumber*10)+index+1;

                document.querySelector(`.players-card__card--${cardIndex}`).insertAdjacentHTML('beforeend',displayCard);

                //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
                let style = document.createElement('style');
                style.innerHTML = `
                .players-card__card--${index+1} {
                background-color: green;
                }
                `;
                document.head.appendChild(style);
                //passed down the cards array from json, cardindex that is relevant to changing the card, and player number
                renderNewCard(cards,cardIndex, playerNumber);

            });
        };

            //receives the cards array from json, cardindex that is relevant to changing the card, and player number
        const renderNewCard = (cards,index, playerNumber)=>{
            //render new card
            document.querySelector(`.players-card__card--${index}`).addEventListener('click', async () =>{   
                count++
                console.log(count);
                const newCard = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)).json();
                const displayNewCard = `<img src = ${newCard.cards[0].image} alt = ${newCard.cards[0].code}>`;
                const el = document.querySelector(`.players-card__card--${index}`);
                    
                
                //https://www.w3schools.com/jsref/met_node_removechild.asp
                el.removeChild(el.childNodes[0]);
                el.disabled=true;
                
                //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
                let style = document.createElement('style');
                style.innerHTML = `
                .players-card__card--${index} {
                background-color: red;
                border-radius: 10px;
                padding: 4px;
                }
                `;
                document.head.appendChild(style);

                document.querySelector(`.players-card__card--${index}`).insertAdjacentHTML('beforeend', displayNewCard);

                                
                if (count === 3){
                    disableAllCards(cards, playerNumber);
            
                    // let style = document.createElement('style');
                    // style.innerHTML = `
                    // .players-card__player-${playerNumber} .players-card__card {
                    // background-color: red;
                    // border-radius: 10px;
                    // padding: 4px;
                    // }
                    // `;
                    // document.head.appendChild(style);
                    //reset count when 3 cards are changed
                    count = 0;
                }

            });

        };

        const disableAllCards = (cardsArray, playerNumber) =>{
            //cardsArray is just the array of cards from the json passed down
            //https://www.w3schools.com/jsref/met_document_queryselectorall.asp
            for(let i=0; i < cardsArray.length; i++){
                const cardIndex = playerNumber * 10 + i + 1;
                
                document.querySelector(`.players-card__card--${cardIndex}`).disabled=true;
            }
        };


        renderCard(playerOne.cards,1);
        

        document.querySelector(`.turn__button`).addEventListener('click', () =>{
            //reset count when new turn
            count = 0;
            let style = document.createElement('style');
            style.innerHTML = `
            .players-card__player-1{
                display: none;
            }

            .players-card__player-2{
                display: block;
                }
            .turn__button{
                display: none;
            }
            .showdown__button {
                display: inline-block;
                background-color: #FF4136;
            }
            `;
            document.head.appendChild(style);
            renderCard(playerTwo.cards,2);
            document.querySelector(`.turn__button`).disabled=true;
        });

        const handSolve = (playersCards) => {
            const cardsArray = playersCards.map((curEl)=>{
              let codeArray = curEl.code.split("");
              let cardNumber = codeArray[0];
              
              if(cardNumber === "0"){
                cardNumber = "T";
              }
          
              const suit = codeArray[1].toLowerCase();
              return codeArray = cardNumber.concat(suit);
              
            })
            return cardsArray;
          }
          
         console.log(handSolve(playerOne.cards));

        document.querySelector(`.showdown__button`).addEventListener('click', () =>{
            let style = document.createElement('style');
            style.innerHTML = `
            .players-card__player-1  {
                display: block;
            }
            .players-card__player-1 p {
                display: none;
            }
            .players-card__player-2 p{
                display: none;
            }
            .players-card__card{
                background-color: green;
                border-radius: 10px;
                padding: 4px;
            }
            .showdown__button {
                display: none;
            }
            `;
            document.head.appendChild(style);
        });
        
    
    } catch (error){
        alert(error);
    }
    
};

getDeckOfCards();

