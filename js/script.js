const darkOverlay = document.getElementById('darkOverlay');
const lightOverlay = document.getElementById('lightOverlay');
const wandContainer = document.getElementById('wandContainer');
const wand = document.getElementById('wand');
const fire = document.getElementById('fire');
const smoke = document.getElementById('smoke');
let wordMeanings = []; 

function showFireEffect() {
    darkOverlay.style.display = 'none';
    lightOverlay.style.display = 'block';
    wandContainer.style.display = 'flex';
    fire.style.display = 'block';
    smoke.style.display = 'none';
}

function showSmokeEffect() {
    darkOverlay.style.display = 'none';
    lightOverlay.style.display = 'none';
    wandContainer.style.display = 'flex';
    fire.style.display = 'none';
    smoke.style.display = 'block';
}

function hideEffects() {
    darkOverlay.style.display = 'none';
    lightOverlay.style.display = 'none';
    wandContainer.style.display = 'none';
}

let score = 0;
let remainingSpells;
const spells = [
    {
        name: "Accio",
        effect_jp: "対象物を自分に引き寄せる",
        effect_en: "Summons an object to the caster",
        wrong1: "小さな爆発を起こす",
        wrong1_en: "Creates a small explosion",
        wrong2: "対象物を透明にする",
        wrong2_en: "Turns the object invisible",
        wrong3: "壊れた物を修復する",
        wrong3_en: "Repairs broken objects",
    },
    {
        name: "Alohomora",
        effect_jp: "鍵を開ける",
        effect_en: "Unlocks doors",
        wrong1: "火を起こす",
        wrong1_en: "Creates fire",
        wrong2: "物体を浮かせる",
        wrong2_en: "Levitates objects",
        wrong3: "呪文や攻撃から防ぐ",
        wrong3_en: "Protects against spells and attacks",
    },
    {               
        name: "Expelliarmus",
        effect_jp: "対象の手からアイテム（主に杖）を弾き出す",
        effect_en: "Disarms the target",
        wrong1: "軽傷を治す",
        wrong1_en: "Heals minor injuries",
        wrong2: "対象を無言にする",
        wrong2_en: "Silences the target",
        wrong3: "即座に、取り返しのつかない死を引き起こす",
        wrong3_en: "Causes instant, irreversible death",
    },
    {
        name: "Incendio",
        effect_jp: "火を起こす",
        effect_en: "Creates fire",
        wrong1: "ドアを解錠する",
        wrong1_en: "Unlocks doors",
        wrong2: "対象を気絶させる",
        wrong2_en: "Stuns the target",
        wrong3: "隠されたメッセージや見えないインクを明らかにする",
        wrong3_en: "Reveals hidden messages or invisible ink",
    },
    {
        name: "Leviosa",
        effect_jp: "対象物を浮かせる",
        effect_en: "Levitates objects",
        wrong1: "対象を制御する",
        wrong1_en: "Controls the target",
        wrong2: "壊れた物を修復する",
        wrong2_en: "Repairs broken objects",
        wrong3: "術者の声を増幅する",
        wrong3_en: "Amplifies the caster's voice",
    },
    {
        name: "Lumos",
        effect_jp: "杖の先端から光を放つ",
        effect_en: "Emits light from the wand tip",
        wrong1: "ダークマークを呼び出す",
        wrong1_en: "Conjures the Dark Mark",
        wrong2: "対象の足を踊らせる",
        wrong2_en: "Forces the target's legs to dance",
        wrong3: "周囲の人々の耳にブンブン音を聞かせる",
        wrong3_en: "Fills nearby people's ears with buzzing",
    },
    {
        name: "Obliviate",
        effect_jp: "対象者の記憶を消去する",
        effect_en: "Erases the target's memories",
        wrong1: "対象者の体を麻痺させる",
        wrong1_en: "Paralyzes the target's body",
        wrong2: "固体を粉々に砕く",
        wrong2_en: "Blasts solid objects into pieces",
        wrong3: "激痛を引き起こす",
        wrong3_en: "Inflicts severe pain",
    },
    {
        name: "Stupefy",
        effect_jp: "対象者を気絶させる",
        effect_en: "Stuns the target",
        wrong1: "対象物を術者に呼び寄せる",
        wrong1_en: "Summons an object to the caster",
        wrong2: "対象物を拡大する",
        wrong2_en: "Enlarges an object",
        wrong3: "物体や人を移動させる",
        wrong3_en: "Moves objects or people",
    }            
];

function startQuiz() {
    remainingSpells = [...spells];
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    generateQuestion();
}

function generateQuestion() {
    wordMeanings = [];
    document.getElementById("words").style.display = "none";
    hideEffects(); 
    document.getElementById("result").innerHTML = ""; 
    if (remainingSpells.length === 0) {
        endQuiz();
        return;
    }
    const backgroundIndex = Math.floor(Math.random() * 3) + 1;
    document.body.style.backgroundImage = `url("images/background${backgroundIndex}.jpg")`;
    const spellIndex = Math.floor(Math.random() * remainingSpells.length);
    const spell = remainingSpells[spellIndex];
    remainingSpells.splice(spellIndex, 1);
    document.getElementById("spell").innerText = spell.name;
    document.getElementById("result").innerHTML = "";

    const options = [
        {
            text: spell.effect_en,
            effect: spell.effect_en,
            effect_jp: spell.effect_jp,
            correct: true,
        },
        {
            text: spell.wrong1_en, // 日本語から英語に変更
            effect: spell.effect_en,
            effect_jp: spell.effect_jp,
            correct: false,
        },
        {
            text: spell.wrong2_en, // 日本語から英語に変更
            effect: spell.effect_en,
            effect_jp: spell.effect_jp,
            correct: false,
        },
        {
            text: spell.wrong3_en, // 日本語から英語に変更
            effect: spell.effect_en,
            effect_jp: spell.effect_jp,
            correct: false,
        },
    ];

    shuffleArray(options);

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option.text;
        // 正解かどうかの情報をbuttonオブジェクトに追加
        button.correct = option.correct;
        button.onclick = () => {
            checkAnswer(button, option.correct, option.effect_jp);
        };
        optionsContainer.appendChild(button);
    });
    
    wordMeanings.push({
        name: spell.name,
        effect_en: spell.effect_en,
        effect_jp: spell.effect_jp,
        wrong1_en: spell.wrong1_en,
        wrong2_en: spell.wrong2_en,
        wrong3_en: spell.wrong3_en,
        wrong1: spell.wrong1,
        wrong2: spell.wrong2,
        wrong3: spell.wrong3,
    });    

    // Add wrong options to the wordMeanings array
    options.forEach(option => {
        if (!option.correct) {
            wordMeanings.push({
                name: spell.name,
                effect_en: option.text,
                effect_jp: option.text, // wrong options have the same text for en and jp
            });
        }
    });

}

function checkAnswer(button, isCorrect, effect_jp) {
    const optionsContainer = document.getElementById("options");
    const allButtons = optionsContainer.querySelectorAll("button");
    allButtons.forEach((button) => {
        button.disabled = true;
    });

    if (isCorrect) {
        showFireEffect();
        button.style.backgroundColor = "orange";  // 正解の選択肢のボタンの背景色をオレンジに設定
    } else {
        showSmokeEffect();
        // 不正解だった場合、全てのボタンをループして正解の選択肢を見つけ、その色を変える
        allButtons.forEach((otherButton) => {
            if (otherButton.correct) {
                otherButton.style.backgroundColor = "orange";
            }
        });
    }

    setTimeout(() => {
        hideEffects();
    }, 1500);

    setTimeout(() => {
        document.getElementById("showWordsButton").style.display = "block";

        if (isCorrect) {
            document.getElementById("result").innerHTML = "正解！Correct! (" + effect_jp + ")";
            score++;
            updateScore();
        } else {
            document.getElementById("result").innerHTML = "不正解！Incorrect! (" + effect_jp + ")";
        }

    }, 1600);
}

function showWords() {
    document.getElementById("wordsContainer").style.display = "block";
    const wordsList = document.getElementById("words");
    wordsList.innerHTML = "";

    wordMeanings.forEach((wordMeaning) => {
        const li = document.createElement("li");
        li.innerText = `${wordMeaning.name}: ${wordMeaning.effect_en} (English), ${wordMeaning.effect_jp} (日本語)`;
        wordsList.appendChild(li);
    });
}

// showWords 関数を以下のように修正
function showWords() {
    const wordsTable = document.getElementById("words");
    const tbody = wordsTable.querySelector("tbody");
    tbody.innerHTML = "";

    wordMeanings.forEach((word) => {
        // Assuming each wordMeaning object has an effect and wrongs in both English and Japanese
        if (word.effect_en && word.effect_jp && word.wrong1_en && word.wrong2_en && word.wrong3_en && word.wrong1 && word.wrong2 && word.wrong3) {
            ['effect_en', 'wrong1_en', 'wrong2_en', 'wrong3_en'].forEach((key, i) => {
                const tr = document.createElement("tr");
                const tdEn = document.createElement("td");
                const tdJp = document.createElement("td");
                
                const jpKey = ['effect_jp', 'wrong1', 'wrong2', 'wrong3'][i]; // This gets the corresponding Japanese key
                
                tdEn.innerText = word[key];
                tdJp.innerText = word[jpKey];

                tr.appendChild(tdEn);
                tr.appendChild(tdJp);
                tbody.appendChild(tr);
            });
        }
    });

    wordsTable.style.display = "table";
}
    
    
    function endQuiz() {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("scoreDisplay").style.display = "block";
        document.getElementById("finalScore").textContent = score;
        showWords();  // 追加：クイズ終了時に単語リストを表示する

        // スコアに応じたメッセージを表示する機能を追加
        let message;
        if (score = 0 ) {
            message = "You are definitely friends with Dudley.";
        } else if (score >= 1 && score <= 3) {
            message = "It seems too early to become a wizard.";
        } else if (score >= 4 && score <= 6) {
            message = "You should ask Hermione to teach you a spell.";
        } else if (score >= 7 && score <= 8) {
            message = "Buy a magic wand at the Ollivander Wand Shop.";
        } else if (score >= 9 && score <= 10) {
            message = "You will be the best Muggle at Hogwarts School of Witchcraft and Wizardry.";
        } else {
            message = "Oops! Something went wrong.";
        }

        // メッセージを表示する
        document.getElementById("finalMessage").textContent = message;


        // メッセージをコンソールに表示する
        console.log(message);
    }
    
    function updateScore() {
        document.getElementById("score").innerText = score;
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
