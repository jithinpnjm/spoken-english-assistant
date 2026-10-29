import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";
import { test } from "node:test";
import { WebSocket, WebSocketServer } from "ws";
import { attachAudioBridge } from "./audioBridge";
import { getRuntimeConfig } from "./config";

test("upstream 1011 reason reaches the browser and releases the session", async () => {
  const upstreamServer = new WebSocketServer({ port: 0 });
  const server = http.createServer();
  const config = { ...getRuntimeConfig({}), geminiApiKey: "test-key" };
  const bridge = attachAudioBridge(server, config, undefined, () => {
    const address = upstreamServer.address();
    if (!address || typeof address === "string") throw new Error("No upstream address");
    return new WebSocket(`ws://127.0.0.1:${address.port}`);
  });
  try {
    upstreamServer.on("connection", (socket) => {
      socket.once("message", () => socket.close(1011, "Internal error encountered"));
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("No bridge address");
    const client = new WebSocket(`ws://127.0.0.1:${address.port}/api/audio-bridge`);
    await once(client, "open");
    const closed = once(client, "close");
    client.send(JSON.stringify({ setupClient: { lesson: { topic: "Greetings" } } }));
    const [code, reason] = await closed;
    assert.equal(code, 1011);
    assert.equal(reason.toString(), "Internal error encountered");
    assert.equal(bridge.stats().activeTotal, 0);
  } finally {
    server.close();
    upstreamServer.close();
  }
});
