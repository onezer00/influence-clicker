# Influencer Clicker

Um jogo clicker casual onde você começa como uma pessoa anônima e tenta conquistar a internet. Cada clique gera novos seguidores e você pode comprar upgrades para acelerar seu crescimento.

## Como Jogar

1. Clique no botão principal para ganhar seguidores.
2. Use seus seguidores e dinheiro para comprar upgrades como câmera, dancinhas virais, escândalos, bots e collabs.
3. Evolua até se tornar o "governante da internet".

O jogo possui sistema de cash que permite comprar upgrades premium usando a moeda do jogo.

## Executar Localmente

```bash
# usando um servidor simples
npx serve .
```

Acesse `http://localhost:3000` ou a porta indicada e instale o jogo como PWA no navegador.

## Estrutura PWA

- **index.html**: página principal do jogo.
- **script.js**: lógica do jogo e registro do service worker.
- **manifest.json**: manifesto PWA com nome e ícones (substitua os ícones em `assets/icons/`).
- **service-worker.js**: cache offline das páginas e assets.

## Publicação

Tudo está pronto para publicar no [Itch.io](https://itch.io/) ou instalar em qualquer celular como app.
