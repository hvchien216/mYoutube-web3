import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVE_PEER_API_KEY }),
});

export default LivePeerClient;
