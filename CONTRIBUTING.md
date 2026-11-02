# Contributing to Creative Login

Thanks for helping! New characters are the most welcome contribution.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. The gallery is at `#/gallery`.

## Adding a character

1. Create `src/characters/MyCharacter.tsx`. Copy an existing character as a template.
2. Use the shared pieces from `./core` (`CharacterSvg`, `Eye`, `Blush`, `Sweat`, `Zzz`).
   Keep the import from `./core` on **one line**; the gallery's single-file code builder relies on it.
3. Put all CSS in the `CSS` string and prefix every class and keyframe with `lc-<name>-`
   so characters never clash.
4. Drive the animation with the `--stretch` CSS variable (0..1) and the
   `data-mood` / `data-full` attributes on the root.
5. Register it in `src/characters/registry.ts` (name, emoji, description, confetti, strength messages).
6. Check it in the gallery: every mood, strength 0% → 100%, and "Copy code".

## Before opening a pull request

```bash
npm run lint
npm run build
```

Both must pass. Please keep characters friendly and respectful. Original artwork only:
don't copy characters from other games, films or brands.

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).
