# தாயம் · Thayam / Dayakattai

Tamil race game on a 7×7 board. 6 coins each, 2–4 players.

**Play now:** [https://spydersrini.github.io/thayam/](https://spydersrini.github.io/thayam/)

This is a web MVP. You vs AI (you are Red). Online multiplayer, Google sign-in, and colour-pick come later.

## How to play
1. Open the link in Safari or Chrome.
2. Tap **Roll dice**. Bonus values **1, 5, 6, 12** stack; then spend those numbers in any order.
3. Before you have ever entered a coin, only the first **1** (and rolls after it in that streak) count.
4. If any coin is still in the tray, a **1** (or **5** after the first coin is in) must bring one in. Tap a tray coin, then your home X.
5. Outer ring anti-clockwise → middle ring clockwise through the corner X → third ring clockwise → exact count into the centre.
6. X squares are safe and may stack. Plain squares hold one coin. Landing on an enemy off an X sends them back to the tray.
7. Win: all 6 coins on the centre.

**Rules** (top right) has house toggles and New game.

## House rules (default on)
- After the first coin is in, enter extra coins on 1 or 5
- Must cut at least once before inner rings
- A cut starts extra rolls after leftover numbers from that turn are spent

## Repo
Right now Pages only needs `index.html`. Engine / AI source also lives in this project as `js/` for later work.

## Later
- Pick your colour (not always Red)
- Pass-and-play without AI
- Google sign-in, invite link, live match
- Support / remove-ads (no pay-to-win)
