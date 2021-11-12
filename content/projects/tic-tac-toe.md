# Tic Tac Toe
<p align="center">A 2-Player web app for competitive Tic Tac Toe!</p>

> Tic Tac Toe is chess for intellectuals <cite>&mdash; Isaac Newton</cite>

## What is it?
After getting bored at lunch, my friends and I discovered the world of competitive Tic-Tac-Toe. We wanted a simple place to play that wouldn't get blocked on our school's WiFi, so I developed the app to host on this [site](/tic-tac-toe).

## How does it work?

### Endpoints & API Documentation
This app doesn't use websockets for realtime processing. Instead, there are 3 endpoints.

1. [/api/tic-tac-toe/create](/api/tic-tac-toe/create)
- This endpoint lets you use a `GET` request to get back the following data:

```json
{
    "message": "<str>",
    "id": "<str, game id>"
}
```

2. [/api/tic-tac-toe/play](/api/tic-tac-toe/play)
- This endpoint lets you use a `POST` request (with the following schema) to make a move:

```json
{
    "id": "<str, game id>",
    "spotClaimed": "<arr::int, len = 2, no idx with a val > 2 (if playing 3 x 3), eg. [1, 1]>
}
```

3. [/api/tic-tac-toe/view/:id](/api/tic-tac-toe/view/:id)
- This endpoint lets you use a `GET` request to get back the following data:

```json
{
    "message": "<str>",
    "board": "<arr::arr::int, 2D array representing the current 3 x 3 board>"
}
```

4. [/api/tic-tac-toe/reset/:id](/api/tic-tac-toe/reset/:id)
- This endpoint lets you use a `GET` request to clear the board. It is useful for users who want to play multiple games but don't want to make new sessions every time.

### General Notes
The player creating the game via endpoint #1 has their IP stored to validate further requests and gets the first move as the `X` player. They can share their game link to their friend, who will get their IP stored to validate further requests and play as the `O` player. In this sense, games (once started) are functionally private. `lastModified` timestamps are stored to help prevent games from taking up dead space.

*frontend coming soon . . .*