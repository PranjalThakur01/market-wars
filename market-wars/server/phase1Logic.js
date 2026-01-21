const Team = require('./models/Team');

const runMarginCall = async () => {
    const teams = await Team.find({ isEliminated: false });
    
    // 1. Calculate Total Investment per Asset
    const totals = { library: 0, pizza: 0, gym: 0, incubator: 0 };
    teams.forEach(team => {
        totals.library += team.portfolio.library;
        totals.pizza += team.portfolio.pizza;
        totals.gym += team.portfolio.gym;
        totals.incubator += team.portfolio.incubator;
    });

    // 2. Identify the "Crowded" Asset (The Trap)
    const crowdedAsset = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
    console.log(`The Crowd followed: ${crowdedAsset}`);

    // 3. Find the "Sheep" (Teams with highest investment in the crowded asset)
    const sheep = await Team.find({ isEliminated: false })
        .sort({ [`portfolio.${crowdedAsset}`]: -1 })
        .limit(20);

    // 4. Eliminate them
    for (let s of sheep) {
        s.isEliminated = true;
        await s.save();
    }
    
    return { eliminatedCount: sheep.length, trap: crowdedAsset };
};

module.exports = { runMarginCall };