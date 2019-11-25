import Hand from "./pokersolver-master/pokersolver.js"
const state = {};





// const fetchAsyncA = async () => await (await fetch('https://api.github.com')).json()
// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

const getDeckOfCards = async () => {
    try{
        const result = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await result.json();
        

        //this is an array of 5 
        const playerOne = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();
        
        const playerTwo= await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`)).json();
        

        const handArray = (playersCards) => {
            const cardsArray = playersCards.map((curEl)=>{
              return pokerSolverConversion(curEl.code);
              
            })
            return cardsArray;
        };

        const pokerSolverConversion = (cardCode) =>{
            const splitCardCode= cardCode.split("");
              let cardNumber = splitCardCode[0];
              
              if(cardNumber === "0"){
                cardNumber = "T";
              }
          
              const suit = splitCardCode[1].toLowerCase();

              return cardNumber.concat(suit);
        };
    

        state.playerOneCards = playerOne.cards;
        state.playerCardsArray__1 = handArray(state.playerOneCards);
        
       
        state.playerTwoCards = playerTwo.cards;
        state.playerCardsArray__2 = handArray(state.playerTwoCards);
        console.log(state)

        //https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render/33846747
        //Because you are calling that function instead of passing the function to onClick, change that line to this:


        let count = 0;
        

        
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
                renderNewCard(cards,index, playerNumber);

            });
        };

            //receives the cards array from json, cardindex that is relevant to changing the card, and player number
        const renderNewCard = (cards, index, playerNumber)=>{
            //render new card
            const cardIndex = (playerNumber*10)+index+1;
            document.querySelector(`.players-card__card--${cardIndex}`).addEventListener('click', async () =>{   
                count++
             
                const newCard = await(await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=1`)).json();
                
                const displayNewCard = `<img src = ${newCard.cards[0].image} alt = ${newCard.cards[0].code}>`;
                const el = document.querySelector(`.players-card__card--${cardIndex}`);

                if(playerNumber ===1){
                    state.playerCardsArray__1.splice(index,1,pokerSolverConversion(newCard.cards[0].code));
                    console.log(state.playerCardsArray__1);
                } else if (playerNumber === 2){
                    state.playerCardsArray__2.splice(index,1,pokerSolverConversion(newCard.cards[0].code));
                }
                
                
                //https://www.w3schools.com/jsref/met_node_removechild.asp
                el.removeChild(el.childNodes[0]);
                el.disabled=true;
                
                //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
                let style = document.createElement('style');
                style.innerHTML = `
                .players-card__card--${cardIndex} {
                background-color: red;
                border-radius: 10px;
                padding: 4px;
                }
                `;
                document.head.appendChild(style);

                document.querySelector(`.players-card__card--${cardIndex}`).insertAdjacentHTML('beforeend', displayNewCard);



                                
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

        


        document.querySelector(`.showdown__button`).addEventListener('click', () =>{

            const hand1 = Hand.solve(state.playerCardsArray__1);
            const hand2 = Hand.solve(state.playerCardsArray__2);
            const winner = Hand.winners([hand1, hand2]); 
            


            console.log(hand1);
            console.log(hand2);
            console.log(winner);


            document.querySelector(`.winner`).innerHTML = `${winner[0].descr}`;

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

            .winner{
                display: block;
            }
            `;
            document.head.appendChild(style);



            
      
                    

        });


    
    } catch (error){
        alert(error);
    }
    
};

getDeckOfCards();

