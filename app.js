document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓",
        "🍍", "🍍", "🥝", "🥝", "🍒", "🍒", "🍉", "🍉"
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;
    let lives = 3;
    let hintsLeft = 5; // Número de dicas disponíveis

    const gameBoard = document.getElementById('game-board');
    const hintButton = document.getElementById('hint-button');
    const restartButton = document.getElementById('restart-button');
    const livesCount = document.getElementById('lives-count');

    // Atualiza o número de vidas na interface
    function updateLivesDisplay() {
        livesCount.textContent = lives;
    }

    // Atualiza o botão de dica
    function updateHintButton() {
        hintButton.textContent = `Dica (${hintsLeft})`;
        hintButton.disabled = hintsLeft === 0;
    }

    // Embaralha as cartas
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Cria o tabuleiro de jogo
    function createBoard() {
        const shuffledCards = shuffle(cards);
        gameBoard.innerHTML = ''; // Limpa o tabuleiro anterior

        shuffledCards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('carta');
            card.dataset.symbol = symbol;

            // Adiciona o evento de clique
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });

        // Libera o tabuleiro para interação
        lockBoard = false;
    }

    // Lógica para virar uma carta
    function flipCard(card) {
        if (lockBoard || card === firstCard || card.classList.contains('virada')) return;

        card.classList.add('virada');
        card.textContent = card.dataset.symbol;

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    }

    // Verifica se as duas cartas viradas correspondem
function checkMatch() {
    lockBoard = true;
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        // Marca as cartas como corretas
        firstCard.classList.add('correto');
        secondCard.classList.add('correto');

        matchedPairs++;
        resetTurn();

        if (matchedPairs === cards.length / 2) {
            setTimeout(() => {
                alert('Parabéns! Você venceu!');
                restartButton.disabled = false; // Habilita o botão "Reiniciar"
            }, 500);
        }
    } else {
        lives--;
        updateLivesDisplay();

        if (lives === 0) {
            setTimeout(() => {
                alert('Você perdeu! Clique em "Reiniciar" para jogar novamente.');
                restartButton.disabled = false; // Habilita o botão "Reiniciar"
            }, 500);
            return;
        }

        setTimeout(() => {
            firstCard.classList.remove('virada');
            secondCard.classList.remove('virada');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

    // Reseta o turno
    function resetTurn() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Reinicia o jogo
    function restartGame() {
    matchedPairs = 0;
    lives = 3;
    hintsLeft = 5; // Restaura o número de dicas

    // Atualiza os elementos de interface
    updateLivesDisplay();
    updateHintButton();

    // Remove eventos e reseta o tabuleiro
    gameBoard.innerHTML = ''; // Limpa o tabuleiro anterior
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    // Recria o tabuleiro de jogo
    createBoard();

    // Desabilita o botão de reiniciar novamente
    restartButton.disabled = true;
	}


    // Mostra uma dica para o jogador
function showHint() {
    if (hintsLeft <= 0 || lockBoard) return;

    hintsLeft--;
    updateHintButton();

    const allCards = Array.from(gameBoard.children);

    // Mostra temporariamente todas as cartas que não estão corretas ou viradas
    allCards.forEach(card => {
        if (!card.classList.contains('correto') && !card.classList.contains('virada')) {
            card.classList.add('virada');
            card.textContent = card.dataset.symbol;
        }
    });

    lockBoard = true; // Bloqueia o tabuleiro temporariamente

    setTimeout(() => {
        allCards.forEach(card => {
            // Revirar somente as cartas que não são a primeira ou a segunda ativas
            if (
                !card.classList.contains('correto') &&
                card !== firstCard &&
                card !== secondCard
            ) {
                card.classList.remove('virada');
                card.textContent = '';
            }
        });

        lockBoard = false; // Libera o tabuleiro após esconder as cartas
    }, 1000);
}

    // Adiciona eventos aos botões
    hintButton.addEventListener('click', showHint);
    restartButton.addEventListener('click', restartGame);

    // Inicializa o jogo
    updateLivesDisplay();
    updateHintButton();
    createBoard();
});
