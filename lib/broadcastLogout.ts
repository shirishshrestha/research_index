/**
 * Broadcast Channel for cross-tab logout
 * When user logs out in one tab, all other tabs should be notified
 */

const CHANNEL_NAME = "auth_channel";
const LOGOUT_MESSAGE = "logout";

let channel: BroadcastChannel | null = null;

/**
 * Initialize broadcast channel for listening to logout events
 */
export function setupLogoutBroadcast(
  onLogout: () => void,
  isProtectedRoute: boolean
) {
  // Only setup in browser environment
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined")
    return;

  // Create channel if not exists
  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }

  // Listen for messages only on protected routes
  if (isProtectedRoute) {
    channel.onmessage = (event) => {
      if (event.data === LOGOUT_MESSAGE) {
        onLogout();
      }
    };
  }

  // Cleanup function
  return () => {
    if (channel) {
      channel.close();
      channel = null;
    }
  };
}

/**
 * Broadcast logout event to all tabs
 */
export function broadcastLogout() {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined")
    return;

  try {
    const broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    broadcastChannel.postMessage(LOGOUT_MESSAGE);
    broadcastChannel.close();
  } catch (error) {
    console.error("Failed to broadcast logout:", error);
  }
}
