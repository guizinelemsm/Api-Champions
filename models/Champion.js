const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  summoner: { type: String, required: true },
  kda: { type: Number, required: true, min: 0 },
  build: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChampionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  classe: { type: String, required: true },
  patchLancamento: { type: String, required: true },
  roles: [{ type: String, enum: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'] }],
  games: [GameSchema],
  winRate: { type: Number, default: 0 }
});

module.exports = mongoose.model('Champion', ChampionSchema);
