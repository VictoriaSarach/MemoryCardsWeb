//Cartas
totalPairs = 5;
let orderedCards = [`😎`, `🤑`, `👽`, `🤡`, `😂`, `😎`, `🤑`, `👽`, `🤡`, `😂`];
cards = document.querySelectorAll(".card");
//Botones
btnPlayAgain = document.getElementById("btn-playagain")
//Tiempo
timeManager = document.querySelector(".timer");
let timeUpdate;
let totalTime = 20;
//Record
recordContainer = document.getElementById("record")
let bestRecord = totalTime;
let actualRecord = totalTime;
//Pantalla Win/GameOver
gameOverScreen = document.getElementById("gameOverScreen");

//Play Again Funcion
btnPlayAgain.addEventListener("click", ()=>{
    window.location.reload();
}) 
//RECORD
let actualTime = 0; //Se inicializa en 0 para que al calcular el record actual inicie en 20s
updateRecord();

//TIMER
actualTime = totalTime;
timeManager.firstElementChild.innerHTML = totalTime;
function runGame(){
    actualTime--;
    timeManager.firstElementChild.innerHTML = actualTime;
    //PERDER
    if(actualTime<=0){
        clearInterval(timeUpdate);
        //Dar estlos a pantalla de lost game
        timeManager.firstElementChild.style.color = "#bf3333";
        gameOverScreen.lastElementChild.display = "none";
        btnPlayAgain.style.display = "block";
        gameOverScreen.style.visibility = "visible";
    }
}


//Iniciar juego
let gameStarted = false;
let showedCardsCount = 0;
let showedCards = [0, 0];
//Mostrar cartas Cards
for (const card of cards) {
    //Asigns random value
    let cardIndex = Math.floor(Math.random()*orderedCards.length);
    card.firstElementChild.innerHTML = orderedCards[cardIndex];
    orderedCards.splice(cardIndex, 1);

    //Adds Click event Listener
    card.addEventListener("click", ()=>{
        showCard(card, true);
    })   

}



//Show Cards
function showCard(card){
    if(gameStarted==false){
        gameStarted = true;
        timeUpdate = setInterval(runGame, 1000);
    }
    if(showedCards[1] == 0 && card != showedCards[0]){
        if(showedCardsCount < 2)
        {
            card.lastElementChild.classList.toggle("showCard", true); 
            showedCards[showedCardsCount] = card;
            showedCardsCount++;
        }
        //Una vez haya dos cartas, compararlas
        if(showedCardsCount == 2){
            compareCards();
        }

    }
}



//Compare Cards
function compareCards(){
    if(showedCards[0].firstElementChild.innerHTML == showedCards[1].firstElementChild.innerHTML)
    {
        //console.log("SON IGUALES");
        showedCards[0].lastElementChild.classList.add("border-green");
        showedCards[1].lastElementChild.classList.add("border-green");
        showedCards[0].classList.remove("interactive-card");
        showedCards[1].classList.remove("interactive-card");
        //Comprobar si se gano el juego
        totalPairs--;
        if(totalPairs==0){
            console.log("GANASTE");
            clearInterval(timeUpdate);
            btnPlayAgain.style.display = "block";
            //Record 
            updateRecord();
            //dar estilos a pantalla de WIN GAME
            btnPlayAgain.style.display = "block";
            gameOverScreen.style.backgroundColor = "rgb(123, 200, 123)"
            gameOverScreen.firstElementChild.style.color = "rgb(218, 218, 218)"
            gameOverScreen.firstElementChild.innerHTML = `YOU WON!` 
            gameOverScreen.lastElementChild.innerHTML = `Nailed it in ${actualRecord}s` ;
            gameOverScreen.style.visibility = "visible";
        }
        //Resetear cartas levantadas
        showedCardsCount = 0;
        showedCards = [0, 0];
    }
    else
    {
        //console.log("NO SON IGUALES");
        setTimeout(()=>{
            console.log(`La carta ${showedCards[0]} y la carta ${showedCards[1]} NO SON IGUALES`);
            console.log("unshow cards");
            showedCards[0].lastElementChild.classList.remove("showCard"); 
            showedCards[1].lastElementChild.classList.remove("showCard"); 
             //Resetear cartas levantadas
            showedCardsCount = 0;
            showedCards = [0, 0];
        }, 1500);
    }
}
//UPDATE RECORD
function updateRecord(){
    actualRecord = totalTime - actualTime;
    if(actualRecord<bestRecord){
        bestRecord=actualRecord;
        window.localStorage.setItem('bestRecord', bestRecord);
    }
    bestRecord = window.localStorage.getItem('bestRecord');
    if(bestRecord==null)bestRecord=totalTime;
    recordContainer.firstElementChild.innerHTML = `Best Record: ${bestRecord}`;
    //console.log(`actual: ${actualRecord}, best: ${bestRecord}`);
}


