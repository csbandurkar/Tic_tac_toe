//  to select all boxes
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// let's creat the function to initialize the game 
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pe bhi empty karana padega
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        // one thing is missing ....re aply same css properties
        box.classList = `box box${index + 1}`;

    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player-${currentPlayer}`;
}

initGame();
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";

    }
    else {
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}
function checkGameOver() {
    // //TO DO
    let answer = "";
    winningPosition.forEach((position) => {
        // all 3-boxes should bw non empty and should have exactly same value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            //DISSABLE POINTERS EVENT
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        // it means we have a winner
        if (answer !== "") {
            gameInfo.innerText = `Winner Player -${answer}`;
            newGamebtn.classList.add("active");
            return;
        }
        // when there is no winner
        let fillcnt = 0;
        gameGrid.forEach((box) => {
            if (box !== "")
                fillcnt++;
        });
        // game tied when fill cnt==9;
        if (fillcnt === 9) {
            gameInfo.innerText = `Match tied !`;
            newGamebtn.classList.add("active");

        }
        // else if(answer==="")
        // {
        //     gameInfo.innerText=`Match tied`;
        //     return;
        // }   
    });

    // newGamebtn.classList.add("active");
};
function handleClick(index) {
    if (gameGrid[index] === "") {
        // b- it will change in UI 
        boxes[index].innerHTML = currentPlayer;
        // it will change in grid array function in initGame()
        gameGrid[index] = currentPlayer;

        // pointer events none
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        // check koi jeet to nhi gya 
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);



