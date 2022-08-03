let arr=[[],[],[],[],[],[],[],[],[]];

let temp=[[],[],[],[],[],[],[],[],[]];

let board=[[],[],[],[],[],[],[],[],[]];


for(let i=0 ; i<arr.length ; i++){
    for(let j=0 ; j<arr.length ; j++){
        arr[i][j]=document.getElementById(i * 9 + j);
    }
}


function resetColor(){
    for(let i=0 ; i < 9 ; i++){
        for(let j=0 ; j < 9 ; j++){
            arr[i][j].style.color='#393B3B';
        }
    }
}


function updateColor(board){
    for(let i=0 ; i < 9 ; i++){
        for(let j=0 ; j < 9 ; j++){
            if(board[i][j]==0){
                arr[i][j].style.color='#0E8A00';
            }
        }
    }
}

function updateTemp(board){
    for(let i=0 ; i < 9 ; i++){
        for(let j=0 ; j < 9 ; j++){
            if(board[i][j] != 0){
                temp[i][j]=true;
            }
            else{
                temp[i][j]=false;
            }
        }
    }
}


function changeBoard(board){
    for(let i=0 ; i < 9 ; i++){
        for(let j=0 ; j < 9 ; j++){
            if(board[i][j] > 0){
                arr[i][j].innerText=board[i][j];
            }
            else{
                arr[i][j].innerText='';
            }
        }
    }
}

function generateSoduko(){
    let difficulty=$('.difficulty :selected').val();
    $.get('https://sugoku.herokuapp.com/board?difficulty=' + difficulty , function(data){
        board=data.board;
        resetColor();
        updateTemp(board);
        changeBoard(board);
        updateColor(board);
    })
   
}



$('.generate-soduko').click(generateSoduko);

function isPossible(board , r , c , num , n){
    for(let i=0 ; i < n ; i++){
        if(board[r][i]==num || board[i][c]==num){
            return false;
        }
    }

    let stR=r-r%3;
    let stC=c-c%3;

    for(let i=stR ; i < stR+3 ; i++){
        for(let j=stC ; j < stC+3 ; j++){
            if(board[i][j]==num){
                return false;
            }
        }
    }

    return true;
}




function solveBoard(board , i , j , n){
    if(i==n){
        changeBoard(board);
        return;
    }

    if(j==n){
        solveBoard(board , i+1 , 0 , n);
        return;
    }

    if(board[i][j] != 0){
        solveBoard(board , i , j+1 , n);
        return;
    }

    for(let num=1 ; num <= 9 ; num++){
        if(isPossible(board , i , j , num , n)){
            board[i][j]=num;
            solveBoard(board , i , j+1 , n);
            board[i][j]=0;
        }
    }
}

function solve(){
    solveBoard(board , 0 , 0 , 9);
}

$('.solve-soduko').click(solve);

