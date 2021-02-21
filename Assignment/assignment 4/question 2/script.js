const X_class = 'x'
const CIRCLE_CLASS= 'circle'
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3 ,4, 5],
    [6, 7, 8],
    [0 ,3 ,6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2 ,4, 6]

]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('Winningmessage')
const restartButton = document.getElementById('restartbutton')
const winningMessageTextElement = document.querySelectorAll(['data-winning-message-text'])
//  if(winningMessageTextElement){
//      console.log("true")
//  }

let circleTurn
startgame()
restartButton.addEventListener('click',startgame)

function startgame(){
    circleTurn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_class)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
        // cell.addEventListener('click',handleClick,{once:true})
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

}


 function handleClick(e){
     const cell = e.target 
     const currentClass = circleTurn ? CIRCLE_CLASS : X_class
     placeMark(cell, currentClass)
      if(checkwins(currentClass)){
          endGame(false)
      }
      else if (isDraw()){
          endGame(true)
      }else{
        swapTurns()
        setBoardHoverClass() 
      }
 }
 function endGame(draw){
     if(draw){
         winningMessageTextElement.innerText = 'Draw!'
     }else{
         console.log('win')
         winningMessageTextElement.innerText= `${circleTurn ?"O's":"X's" }wins!`

     }
       winningMessageElement.classList.add('show')
    }

 function isDraw(){
     return [...cellElements].every(cell =>{
         return cell.classList.contains(X_class)|| cell.classList.contains(CIRCLE_CLASS)
     })
 }   
 function placeMark(cell , currentClass){
     cell.classList.add(currentClass)
 }
 function swapTurns(){
     circleTurn =!circleTurn;
 }
 function setBoardHoverClass(){
  board.classList.remove(X_class)
  board.classList.remove(CIRCLE_CLASS)
  if(circleTurn){
      board.classList.add(CIRCLE_CLASS)
  }
  else{
      board.classList.add(X_class)
  }
 }
 function checkwins(currentClass){
      return WINNING_COMBINATIONS.some(combination =>{
          return combination.every(index => {
              return cellElements[index].classList.contains(currentClass)
          } )
      })

 }