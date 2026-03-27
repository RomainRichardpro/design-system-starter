# Design System Starter

> Un template pour industrialiser un Design System avec Figma, React et Claude AI.

## Ce que ce template te permet de faire

- Transformer tes variables Figma en tokens CSS automatiquement
- Documenter ton Design System dans Storybook
- Créer des composants React accessibles et testés avec Claude AI
- Déployer ta documentation en ligne via GitHub Pages

## Avant de commencer

Tu as besoin des outils suivants installés sur ton ordinateur :

| Outil | Pourquoi | Lien |
|-------|----------|------|
| Node.js 18+ | Faire tourner le projet | https://nodejs.org |
| pnpm | Gestionnaire de dépendances | https://pnpm.io/fr/installation |
| Git | Récupérer et versionner le code | https://git-scm.com |
| Claude Pro + MCP Figma | Lire Figma et générer les composants | https://claude.ai |

> Si tu n'as jamais utilisé un terminal, pas de panique —
> chaque commande est expliquée étape par étape dans le guide Storybook.

## Démarrage

### Étape 1 — Copier le template

Sur cette page GitHub, clique sur le bouton vert **"Use this template"**
puis **"Create a new repository"**.

Donne un nom à ton repo (ex: `mon-projet-design-system`),
laisse les autres options par défaut, et clique sur **"Create repository"**.

### Étape 2 — Récupérer le projet sur ton ordinateur

Ouvre ton terminal et lance ces deux commandes
(remplace l'URL par celle de ton repo) :

```bash
git clone https://github.com/TON-COMPTE/TON-REPO.git
cd TON-REPO
```

### Étape 3 — Installer le projet

```bash
make setup
```

> Cette commande installe toutes les dépendances du projet.
> Elle peut prendre 1 à 2 minutes.

### Étape 4 — Lancer Storybook

```bash
make dev
```

> Ouvre ton navigateur sur **http://localhost:6007**

✅ Tu vois Storybook ? Tu peux continuer dans le guide intégré.

## La suite

Tout le guide est directement dans Storybook, dans la section **"Démarrage"**.
Tu y trouveras les étapes pour connecter tes tokens Figma, créer tes premiers
composants et déployer ta documentation.

---

Auteur : Romain Richard — Lead System Designer
Licence : MIT
