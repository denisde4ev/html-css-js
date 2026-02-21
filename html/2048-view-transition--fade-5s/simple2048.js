var board;
var score = 0;
var rows = 4;
var column = 4;

window.onload= function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]


   

    for(let r =0; r < rows ;r++){
        for(let c =0;c<column;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0;r<rows;r++){
        for(let c =0;c < column ; c++){
            if(board[r][c] ==0){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if(!hasEmptyTile()) return;


    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * column);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
       }
    }
}

function updateTile(tile,num){
    tile.innerText ="";
    tile.classList.value="";
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192")
        }
    }

}

document.addEventListener("keyup",(e)=>{
    if(e.code =="ArrowLeft"){
        slideLeft();
         setTwo();
         checkWin();  
    }
     else if(e.code =="ArrowRight"){
        slideRight();
         setTwo();
         checkWin();  
    }
    else if(e.code =="ArrowUp"){
        slideUp();
         setTwo();
         checkWin();  

    }
      else if(e.code =="ArrowDown"){
        slideDown();
         setTwo();
         checkWin();  

    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0);
}

function slide(row){
    row = filterZero(row);

    for(let i =0; i<row.length-1;i++){
        if(row[i]== row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }

        
        }
        row = filterZero(row);

        while(row.length < column){
            row.push(0);
    }
    return row;
}

function slideLeft() {
    for(let r =0; r<rows ;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0;c < column ;c++){
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

   if (!checkWin()) {  
        if (isGameOver()) alert("💀 Game Over!");
   }
}

function slideRight() {
    for(let r =0; r<rows ;r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0;c < column ;c++){
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

   if (!checkWin()) {  
        if (isGameOver()) alert("💀 Game Over!");
   }
}

 function slideUp(){
    for(let c = 0 ; c < column ;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r =0 ; r < rows ;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

   if (!checkWin()) {  
        if (isGameOver()) alert("💀 Game Over!");
   }
 }

  function slideDown(){
    for(let c = 0 ; c < column ;c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for(let r =0 ; r < rows ;r++){
              board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }

   if (!checkWin()) {  
        if (isGameOver()) alert("💀 Game Over!");
   }
 }

 function isGameOver() {
   
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < column; c++) {
            if (board[r][c] === 0) {
                return false;  
            }
        }
    }

    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < column - 1; c++) {
            if (board[r][c] === board[r][c + 1]) {
                return false;
            }
        }
    }

    for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < column; c++) {
            if (board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }

    
    return true;
}

function checkWin() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < column; c++) {
            if (board[r][c] === 2048) {
                alert("🎉 Congratulations! You reached 2048! 🎉");
                return true;
            }
        }
    }
    return false;
}

