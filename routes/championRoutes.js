const express = require('express');
const router = express.Router();
const championController = require('../controllers/championController');

// Rotas para /api/champions
router.post('/', championController.criarChampion);
router.get('/', championController.listarChampions);

// Rota para games
router.post('/:id/games', championController.adicionarGame);

module.exports = router;
