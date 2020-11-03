/*
* LUẬT CHƠI:

TODO - Có 2 người chơi, mỗi người 1 lượt
TODO - Trong mỗi lượt, mỗi player tung xúc xắc bao lần tùy thích. Điểm xúc sắc sẽ được cộng dồn vào trong lượt chơi ở CURRENT
!    - Nhưng nếu tung ra 1, thì tất cả điểm trong lượt của người chơi sẽ mất, và sẽ đến lượt chơi của người khác
TODO - Nếu người chơi bấm nút Hold thì điểm sẽ được giữ lại ở DƯỚI PLAYER và sẽ đến lượt chơi của người khác
?    - Người đạt 100 điểm trước sẽ THẮNG
*/


// * - THIẾT LẬP BAN ĐẦU
var totalScore, playerState, roundScore, dice, isPlaying;
var diceImage = document.querySelector('.dice'); 
var btnRoll = document.querySelector('.btn-roll'); 
var btnHold = document.querySelector('.btn-hold'); 
var btnNewGame = document.querySelector('.btn-new');

init(); // HÀM RESET TRẠNG THÁI


// * SỰ KIỆN CHO CÁC NÚT
// ? NÚT ROLL
btnRoll.addEventListener('click', function(){
    if(isPlaying){
        btnHold.style.display = 'block';  // TRÁNH GIAN LẬN                            
        dice = Math.floor(Math.random() * 6 + 1);  // NÚT ROLL DICE                           
        diceImage.src = 'dice-' + dice + '.png';   // THAY ĐỔI HÌNH    
        diceImage.classList.toggle('roll-dice-animation'); // ANIMATION CHO DICE IMAGE
    
        delay(function(){ // GỌI HÀM DELAY - ĐỢI 500ms rồi xóa class thêm animation
            diceImage.classList.remove('roll-dice-animation');
        }, 500); 

        if(dice !== 1){  // TODO - TUNG KHÁC 1
            roundScore[playerState] += dice;  // LẤY GIÁ TRỊ CỦA NÚT
            document.querySelector('#current-' + playerState).textContent = roundScore[playerState];  // CẬP NHẬT ĐIỂM Ở CURRENT

        }else{
            btnHold.style.display = 'none';  // TRÁNH GIAN LẬN
            nextPlayer();  // TODO - ĐỔI LƯỢT CHƠI
        }
    }
});

// ? NÚT HOLD ĐIỂM
btnHold.addEventListener('click', function(){ // NÚT HOLD ĐIỂM
    if(isPlaying){
        totalScore[playerState] += roundScore[playerState];
        document.querySelector('#score-' + playerState).textContent = totalScore[playerState];
        
        if (totalScore[playerState] >= 100) {
            document.querySelector('#name-' + playerState).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + playerState + '-panel').classList.add('winner');
            document.querySelector('.player-' + playerState + '-panel').classList.remove('active');
            isPlaying = false;
        }else{
            nextPlayer();
        }
    }


});


// ? NÚT NEW GAME
btnNewGame.addEventListener('click', init);

// * - HÀM CẦN THIẾT
function init(){
    isPlaying = true;
    totalScore = [0,0];
    roundScore = [0,0];
    playerState = 0;
    dice = 0;
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  
}

function nextPlayer() {

    playerState == 0 ? playerState = 1 : playerState = 0;
    roundScore[playerState] = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();