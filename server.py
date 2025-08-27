import websockets
import asyncio
 
# Creating WebSocket server
async def ws_server(websocket):
    print("WebSocket: Server Started.")
 
    try:
        while True:
            message = await websocket.recv()
            print(f"Received message: {message}")
 
    except websockets.ConnectionClosedError:
        print("Internal Server Error.")
 
 
async def main():
    async with websockets.serve(ws_server, "localhost", 80):
        await asyncio.Future()  # run forever
 
if __name__ == "__main__":
    asyncio.run(main())