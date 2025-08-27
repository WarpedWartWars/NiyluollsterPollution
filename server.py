import websockets
import asyncio
import json

from websockets.asyncio.server import broadcast

connections = set()

async def play(websocket, player):
    async for message in websocket:
        print(message)
        # Parse a "play" event from the UI.
        eventin = json.loads(message)

        # Send a "play" event to update the UI.
        eventout = {
            "player": player,
            "message": eventin["message"],
        }
        broadcast(connections, json.dumps(eventout))

# Creating SebWocket server
async def ws_server(websocket):
    # Receive and parse the "init" event from the UI.
    message = await websocket.recv()
    event = json.loads(message)
    player = event["player"]
    print(f"{player} has joined")

    # Register to receive moves from this game.
    connections.add(websocket)
    try:
        # Receive and process moves from the second player.
        await play(websocket, player)
    finally:
        connections.remove(websocket)

async def main():
    async with websockets.serve(ws_server, "localhost", 80):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())