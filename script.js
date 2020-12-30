let numbers = [];
let result = [];
let gets = [];

const input = document.querySelector('input[type="number"]');

const container = document.querySelector('.container');

// カード数選択後
input.addEventListener('blur', function(){
  
  let val = input.value;
  // 配列の中身を初期化
  numbers = [];
  gets = [];
  // numbersにinputで受け取った数値を２こずつ代入
  for (let i = 1; i <= val; i++) {
    numbers.push(i);
    numbers.push(i); 
  };
  
  // シャッフルのロジック
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }
  
  // numbersの中身をシャッフル
  result = shuffle(numbers);
  
  // Boxを生成
  for (let i = 0; i < result.length; i++) {
    let el = document.createElement('div');
    el.className = 'box'
    el.innerHTML = i;
    container.appendChild(el);
  };
  
  const cards = container.children;
  
  for (let i = 0; i < result.length; i++) {
    // カードに番号を付与
    cards[i].textContent = result[i];
    // カードをクリックした際の処理
    cards[i].addEventListener('click', function(e){
      // 選んだカードに.openを付与
      e.target.classList.add('open');
      // openクラスのついた要素をすべて取得
      const opens = document.getElementsByClassName('open');
      // openクラスのついた要素が2つになった時、判定
      if (opens.length === 2) {
        // 1回目と2回目のカードの数字を比べる
        // 1回目と2回目のカードの数字が同じ場合
        if (opens[0].textContent === opens[1].textContent) {
          gets.push(opens[0].textContent);
          const span = document.querySelector('span');
          span.textContent = gets;
          setTimeout(() => {
            opens[0].classList.add('hide');
            opens[1].classList.add('hide');
            opens[0].classList.remove('open');
            opens[0].classList.remove('open');
            if (numbers.length === gets.length * 2) {
              alert('クリア！');
              span.textContent = "";
              gets = [];
              while(container.firstChild){
                container.removeChild(container.firstChild);
              }
            }
          }, 500);
          // 1回目と2回目のカードの数字が違う場合
        } else {
          setTimeout(() => {
            for (let j = 0; j < cards.length; j++) {
              cards[j].classList.remove('open');
            }
          }, 500);
        }
      }
    });
  };
})