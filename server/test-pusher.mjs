import Pusher from "pusher";
import "dotenv/config";

const p = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "eu",
  useTLS: true,
});

p.trigger("test-room", "test:event", { ok: true })
  .then(() => console.log("Pusher OK"))
  .catch((e) => console.error("Pusher ERROR", e));
