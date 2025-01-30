document.addEventListener('DOMContentLoaded', () => {
    const colors = ["green", "red", "yellow", "blue"];
    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let highestLevel = 0;
    let isPlayerTurn = false;
    let lockBoard = false; // Bloqueio do tabuleiro durante a sequência

    const startButton = document.getElementById('start-button');
    const statusDiv = document.getElementById('status');
    const currentLevelSpan = document.getElementById('current-level');
    const highestLevelSpan = document.getElementById('highest-level');

    // Atualiza o status do jogo com suporte para HTML
    function updateStatus(message) {
        statusDiv.innerHTML = message; // Permite renderizar HTML no status
    }

    // Atualiza o nível atual e o maior nível
    function updateLevels() {
        currentLevelSpan.textContent = level;
        if (level > highestLevel) {
            highestLevel = level;
            highestLevelSpan.textContent = highestLevel;
        }
    }

    // Gera uma nova cor na sequência
    function nextSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
        level++;
        updateLevels();
        updateStatus(`<p>Nível ${level}: Observe a sequência.</p>`);
        playSequence();
    }

    // Mostra a sequência de cores
    function playSequence() {
        lockBoard = true; // Bloqueia o tabuleiro durante a sequência
        let delay = 0;

        sequence.forEach((color, index) => {
            setTimeout(() => {
                flashColor(color);
                if (index === sequence.length - 1) {
                    setTimeout(() => {
                        updateStatus(`<p>Sua vez!</p>`);
                        isPlayerTurn = true;
                        playerSequence = [];
                        lockBoard = false; // Desbloqueia o tabuleiro após a sequência
                    }, 600);
                }
            }, delay);
            delay += 800;
        });
    }

    // Destaca uma cor
    function flashColor(color) {
        const element = document.getElementById(color);
        element.style.opacity = "0.5";
        setTimeout(() => {
            element.style.opacity = "1";
        }, 300);
    }

    // Verifica a sequência do jogador
    function checkPlayerSequence(color) {
        if (!isPlayerTurn || lockBoard) return; // Ignora cliques enquanto o tabuleiro está bloqueado

        playerSequence.push(color);
        flashColor(color);

        const currentIndex = playerSequence.length - 1;

        if (playerSequence[currentIndex] !== sequence[currentIndex]) {
            updateStatus(
                `<p>Você errou! Maior nível: ${highestLevel}.</p><p>Clique em Iniciar para recomeçar.</p>`
            );
            resetGame();
            startButton.disabled = false; // Habilita o botão "Iniciar" novamente
            return;
        }

        if (playerSequence.length === sequence.length) {
            isPlayerTurn = false;
            setTimeout(nextSequence, 1000);
        }
    }

    // Reseta o jogo
    function resetGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        isPlayerTurn = false;
        lockBoard = false; // Garante que o tabuleiro seja desbloqueado
        currentLevelSpan.textContent = "0";
    }

    // Inicia o jogo
    startButton.addEventListener('click', () => {
        startButton.disabled = true; // Bloqueia o botão "Iniciar" durante o jogo
        resetGame();
        updateStatus(`<p>Prepare-se!</p>`);
        setTimeout(nextSequence, 1000);
    });

    // Adiciona eventos de clique às cores
    colors.forEach(color => {
        const element = document.getElementById(color);
        element.addEventListener('click', () => {
            if (!lockBoard) {
                checkPlayerSequence(color);
            }
        });
    });
});
