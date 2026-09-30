# Pokédex — treino de consumo de API

Pokedex que consome a [PokéAPI](https://pokeapi.co/) para treinar requisições HTTP,
consumo de API e JavaScript assíncrono. Projeto de estudo, sem framework e sem build.

## O que treina

- **`fetch` com parameters na URL** — `offset` e `limit` montados por template string
- **Requisições em cascata** — a listagem devolve URLs; cada uma precisa de um segundo `fetch`
- **`Promise.all` com `map`** — N requisições disparadas em paralelo, aguardadas juntas
- **Mapeamento de dados com fallback** — a PokéAPI traz `types[0]`, às vezes `types[1]`, às vezes nenhum
- **Classe como modelo de domínio** — `Pokemon` encapsula o objeto que a API devolve
- **Estado global de paginação** — `Offset` controla o carregamento incremental

A parte que mais ensina: entender que `data.results` só traz o nome e a URL. O resto
dos dados exige uma segunda rodada de requisições — e fazer isso em paralelo, sem
esperar uma por vez.

## Como rodar

Precisa de um servidor local — o projeto usa módulos ES (`type="module"`), que não
funcionam via `file://`.

```bash
# com Python
python3 -m http.server 8000

# ou com Node
npx serve
```

Depois abra <http://localhost:8000>.

## Estrutura

```
index.html                      marcação da página
templates/
├── script/script.js            classes, fetch e renderização
└── styles/global.css           estilos
```

## API

| Recurso | Uso |
| --- | --- |
| `GET /api/v2/pokemon?offset=&limit=` | Lista paginada; cada item traz `name` e `url` |
| `GET /api/v2/pokemon/{nome}/` | Detalhe: tipos, sprites, atributos |

## Licença

MIT
