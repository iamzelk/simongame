<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Simon Game</title>
</head>
<body>
    <div class="container">
        <!-- Imagem lateral -->
        <div class="image-container">
            <img src="./img/ia.png" alt="Imagem do Jogo">
        </div>

        <!-- Jogo -->
        <div class="game-container">
            <h1>Simon Game</h1>
			<div id="status" class="status"></div>
            <div id="game-board">
                <div id="green" class="color"></div>
                <div id="red" class="color"></div>
                <div id="yellow" class="color"></div>
                <div id="blue" class="color"></div>
            </div>
            <div class="info">
                <p><strong>Nível atual:</strong> <span id="current-level">0</span></p>
                <p><strong>Maior nível alcançado:</strong> <span id="highest-level">0</span></p>
			<button id="start-button">Iniciar</button>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
