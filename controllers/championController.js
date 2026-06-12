const Champion = require('../models/Champion');

// Cadastrar novo champion
exports.criarChampion = async (req, res) => {
  try {
    const novoChampion = new Champion(req.body);
    await novoChampion.save();
    res.status(201).json(novoChampion);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todos os champions (com filtro opcional por role)
exports.listarChampions = async (req, res) => {
  try {
    const { role } = req.query;
    let busca = {};
    if (role) busca.roles = role;

    const champions = await Champion.find(busca);
    res.json(champions);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Adicionar um game e recalcular o winRate médio
exports.adicionarGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { summoner, kda, build } = req.body;

    const champion = await Champion.findById(id);
    if (!champion) return res.status(404).json({ mensagem: 'Champion não encontrado' });

    champion.games.push({ summoner, kda, build });

    // Cálculo do winRate médio baseado nos KDAs
    const totalKda = champion.games.reduce((acc, game) => acc + game.kda, 0);
    champion.winRate = parseFloat((totalKda / champion.games.length).toFixed(2));

    await champion.save();
    res.status(201).json({ mensagem: 'Game adicionado!', champion });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.atualizarChampion = async (req, res) => {
  try {
    const champion = await Champion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!champion) {
      return res.status(404).json({ mensagem: 'Champion não encontrado' });
    }

    res.json(champion);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.deletarChampion = async (req, res) => {
  try {
    const champion = await Champion.findByIdAndDelete(req.params.id);

    if (!champion) {
      return res.status(404).json({ mensagem: 'Champion não encontrado' });
    }

    res.json({ mensagem: 'Champion removido com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};