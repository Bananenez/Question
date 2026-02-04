const quizMusic = new Audio("music-quiz.mp3");
quizMusic.loop = true;
quizMusic.volume = 0.4;

const yesMusic = new Audio("music-yes.mp3");
yesMusic.volume = 0.6;

let musicStarted = false;


const quiz = [
    { q: "Quelle est ma boisson préférée ?", a: ["Redbull", "IceTea", "DrPepper", "Jus"], c: 2 },
    { q: "Mon plus gros défaut ?", a: ["Trop parfait", "Têtu", "Lent", "Pas drôle"], c: 0 },
    { q: "Ce que je préfère faire le soir ?", a: ["Sortir", "Regarder un film", "Parler avec toi", "Dormir"], c: 2 },
    { q: "Ce qui me fait le plus rire ?", a: ["Les pets", "Toi", "Clémence", "J'ai fait caca sur mes mains"], c: 1 },
    { q: "Mon endroit préféré ?", a: ["La mer", "La maison", "Avec toi", "L'Afrique du Sud"], c: 2 },
    { q: "Ce que je remarque en premier chez toi ?", a: ["Tes yeux", "Ton sourire", "Ta voix", "Tout"], c: 3 },
    { q: "Ce que je préfère ?", a: ["Chiens", "Ma femme", "Ma maman", "BBL"], c: 1 },
    { q: "Ce que tu représentes pour moi ?", a: ["Une amie", "Quelqu’un d’important", "Mon bonheur", "Tout ça"], c: 3 },
    { q: "Est-ce que tu m'aimes ?", a: ["Pas sûr", "Un peu", "Oui", "Évidemment"], c: 3 }
];

const images = [
    "images/nez.jpg",
    "images/bbl.jpg",
    "images/lunettes.jpg",
    "images/soireedepart.jpg",
    "images/teinture.jpg",
    "images/bisousGPbx.jpg",
    "images/axolote.jpg",
    "images/pomme.jpg",
    "images/too.jpg"
];

let index = 0;
let noCount = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const messageEl = document.getElementById("message");
const leftImages = document.getElementById("leftImages");
const rightImages = document.getElementById("rightImages");

function updateBackground() {
    const pink = Math.floor((index / 10) * 255);
    document.body.style.background = `rgb(255, ${200 - pink/3}, ${220 - pink/4})`;
}

function addImage(i) {
    const img = document.createElement("img");
    img.src = images[i];
    (i % 2 === 0 ? leftImages : rightImages).appendChild(img);
}

function showQuestion() {
    updateBackground();
    messageEl.textContent = "";
    answersEl.innerHTML = "";
    questionEl.textContent = `Question ${index + 1} / 10 — ${quiz[index].q}`;

    quiz[index].a.forEach((text, i) => {
        const btn = document.createElement("button");
        btn.className = "choice";
        btn.textContent = text;
        btn.onclick = () => {
            if (!musicStarted) {
                quizMusic.play().catch(()=>{});
                musicStarted = true;
            }

            if (i === quiz[index].c) {
                addImage(index);
                index++;
                index < quiz.length ? showQuestion() : finalQuestion();
            } else {
                messageEl.textContent = "Mauvaise réponse 😏 On recommence depuis le début.";
                index = 0;
                leftImages.innerHTML = "";
                rightImages.innerHTML = "";
                setTimeout(showQuestion, 2000);
            }
        };

        answersEl.appendChild(btn);
    });
}

function finalQuestion() {
    questionEl.textContent = "Veux-tu être ma Valentine ? 💘";
    answersEl.innerHTML = "";
    messageEl.textContent = "";

    const yes = document.createElement("button");
    yes.className = "yes";
    yes.textContent = "Oui ❤️";
    yes.onclick = celebrate;

    const no = document.createElement("button");
    no.className = "no";
    no.textContent = "Non 🙄";
    no.onclick = () => {
        noCount++;
        yes.style.transform = `scale(${1 + noCount * 0.2})`;

        const msgs = [
            "Es-tu sûre…?",
            "Tu t’es trompée de bouton 😏",
            "Hmm… essaie encore",
            "Ce bouton n’a pas l’air fiable",
            "Le bouton Oui à l'air trop bien non ? 😍",
            "Dernière chance avant que je m'énerve 💥"
        ];

        messageEl.textContent = msgs[Math.min(noCount - 1, msgs.length - 1)];
    };

    answersEl.appendChild(yes);
    answersEl.appendChild(no);
}

function celebrate() {
    quizMusic.pause();
    quizMusic.currentTime = 0;

    yesMusic.play();

    document.getElementById("card").innerHTML = `
    <h1>💖 OUIIIII 💖</h1>
    <p>Joyeuse Saint-Valentin mon amour 🥰</p>
        <p>Réserve ta soirée le samedi 14/02 pour diner avec moiii 🌸💖🥰</p>
  `;

    for (let i = 0; i < 80; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.textContent = Math.random() > 0.5 ? "🌸" : "❤️";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = 3 + Math.random() * 4 + "s";
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const fw = document.createElement("div");
            fw.className = "firework";
            fw.style.left = Math.random() * 100 + "vw";
            fw.style.top = Math.random() * 100 + "vh";
            document.body.appendChild(fw);
            setTimeout(() => fw.remove(), 1200);
        }, i * 200);
    }

    const dogs = [
        "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
        "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
    ];

    dogs.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.position = "fixed";
        img.style.width = "150px";
        img.style.bottom = "20px";
        img.style.left = "50%";
        img.style.transform = `translateX(${(i - 1) * 180}px)`;
        img.style.zIndex = 5;
        document.body.appendChild(img);
    });
}

showQuestion();
