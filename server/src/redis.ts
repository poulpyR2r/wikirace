import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL is not set");
  client = createClient({ url });
  client.on("error", (e) => console.error("Redis client error", e));
  await client.connect();
  return client;
}
