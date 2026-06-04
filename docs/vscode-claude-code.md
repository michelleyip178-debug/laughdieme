# Using the Claude Code extension in VS Code

A quick guide for working on **laughdieme** with Claude Code inside VS Code.

## 1. Install
- VS Code → **Extensions** (⇧⌘X) → search **"Claude Code"** (by Anthropic) → **Install**.
- Or run `claude` once in a terminal and let it set up the IDE integration.
- Sign in when prompted (same Claude account).

## 2. Open the project (this matters)
**File → Open Folder →** `~/Documents/laughdieme` — open the **project folder itself**, not its
parent. That way Claude Code auto-loads [`CLAUDE.md`](../CLAUDE.md) and already knows the stack,
the nvm/PATH quirk, deploy steps, and brand conventions.

## 3. The basics
- Toggle the Claude panel: the **Claude Code icon** in the sidebar, or **⌘Esc**.
- Type what you want — edits appear as **inline diffs** you can Accept / Reject.
- **Selection-aware**: highlight code, then ask "refactor this" / "explain this".
- **`@`-reference files**: e.g. `@src/app/page.tsx` to point Claude at a file.
- It sees your open tabs, linter errors, and terminal output automatically.

## 4. The everyday loop
1. Ask, e.g. *"Add an FAQ section to the landing page in the playful brand style."*
2. Review the **diffs** inline → Accept.
3. Integrated terminal (**⌃`**) → `npm run dev` → check http://localhost:3000.
   - If `node: command not found`:
     `export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
4. Ship via the branch/PR workflow — ask Claude *"create a branch, commit, push, and open a PR,"*
   or use the **Source Control** panel (⌃⇧G).

## 5. Handy shortcuts
| Action | Shortcut |
|--------|----------|
| Toggle Claude panel | **⌘Esc** |
| Add selected code to Claude | select → right-click → **Add to Claude** |
| Integrated terminal | **⌃`** |
| Source Control (commit/push) | **⌃⇧G** |

## 6. Tips for this project
- Let Claude run `npm run build` before pushing (it's a rule in `CLAUDE.md`).
- Keep changes on a **branch** to get a Vercel **preview URL** before production.
- After big changes, ask *"update CLAUDE.md"* so future sessions stay accurate.
- For visual work: design in **Figma** first, then ask Claude to *"implement this Figma design
  matching our brand tokens."*

See also: [`README.md`](../README.md) and [`CLAUDE.md`](../CLAUDE.md).
