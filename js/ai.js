(function (global) {
  function threatOn(game, r, c, myColor) {
    if (global.Thayam.isSafe(r, c)) return 0;
    let t = 0;
    for (const pl of game.players) {
      if (pl.color === myColor) continue;
      for (const coin of pl.coins) {
        if (!coin.pos || coin.finished) continue;
        const d = Math.abs(coin.pos[0] - r) + Math.abs(coin.pos[1] - c);
        if (d > 0 && d <= 6) t += 7 - d;
      }
    }
    return t;
  }
  function pickMove(game, moves) {
    if (!moves.length) return null;
    const T = global.Thayam;
    const finish = T.FINISH;
    const player = T.currentPlayer(game);
    const pending = player.coins.filter((c) => c.pathIndex < 0 && !c.finished).length;
    const onTrack = player.coins.filter((c) => c.pathIndex >= 0 && !c.finished).length;
    const scored = moves.map((m) => {
      let s = 0;
      const safe = T.isSafe(m.to[0], m.to[1]);
      if (m.to[0] === finish[0] && m.to[1] === finish[1]) s += 80;
      if (m.cut) s += 42;
      if (m.enter) s += pending ? 55 : 12;
      if (safe) s += 18;
      else s -= 8 + threatOn(game, m.to[0], m.to[1], player.color);
      if (onTrack >= 2 && m.pathIndex > 20) s += 4;
      else if (onTrack === 1 && !m.enter) s += m.pathIndex * 0.15;
      else s += Math.min(m.pathIndex, 12) * 0.35;
      if (pending && (m.value === 1 || m.value === 5) && !m.enter) s -= 40;
      const piece = player.coins[m.coinId];
      if (piece && piece.pos && piece.pathIndex >= 0) {
        const fromSafe = T.isSafe(piece.pos[0], piece.pos[1]);
        const toFinish = m.to[0] === finish[0] && m.to[1] === finish[1];
        if (fromSafe && !safe && !toFinish) s -= 30;
        if (!fromSafe) s += 14;
      }
      s += Math.random() * 1.5;
      return { m, s };
    });
    scored.sort((a, b) => b.s - a.s);
    return scored[0].m;
  }
  function pickValueAndMove(game) {
    const T = global.Thayam;
    const all = T.allLegalMoves(game);
    if (!all.length) return null;
    return pickMove(game, all);
  }
  function maybeAct(game) {
    const T = global.Thayam;
    const p = T.currentPlayer(game);
    if (!p.isAI || game.winner) return false;
    if (game.phase === "roll") {
      T.applyRoll(game, T.rollLongDice());
      return true;
    }
    if (game.phase === "move") {
      const move = pickValueAndMove(game);
      if (!move) {
        T.passTurnIfNoMoves(game);
        return true;
      }
      if (move.value) T.setActiveValue(game, move.value);
      T.applyMove(game, move);
      return true;
    }
    return false;
  }
  global.ThayamAI = { pickMove, maybeAct };
})(typeof window !== "undefined" ? window : globalThis);
