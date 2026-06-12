const express = require('express');
const router = express.Router();
const championController = require('../controllers/championController');

// Rotas para /api/champions
router.post('/', championController.criarChampion);
router.get('/', championController.listarChampions);
router.put('/:id', championController.atualizarChampion);
router.delete('/:id', championController.deletarChampion);

// Rota para games
router.post('/:id/games', championController.adicionarGame);

module.exports = router;
