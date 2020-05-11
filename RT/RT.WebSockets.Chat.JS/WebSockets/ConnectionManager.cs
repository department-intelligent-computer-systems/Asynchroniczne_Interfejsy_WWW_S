﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace RT.WebSockets.Chat.JS.WebSockets
{
    public class ConnectionManager
    {
        public ConcurrentDictionary<string, WebSocket> Sockets { get; }
        public ConnectionManager()
        {
            Sockets = new ConcurrentDictionary<string, WebSocket>();
        }

        public WebSocket GetSocketById(string id) => Sockets.FirstOrDefault(p => p.Key == id).Value;
        
        public string GetId(WebSocket socket) => Sockets.FirstOrDefault(p => p.Value == socket).Key;
        
        public void AddSocket(WebSocket socket)
        {
            Sockets.TryAdd(Guid.NewGuid().ToString(), socket);
        }

        public async Task RemoveSocket(string id)
        {
            Sockets.TryRemove(id, out var socket);
            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, 
                "Closed by the ConnectionManager",
                CancellationToken.None);
        }
    }
}
