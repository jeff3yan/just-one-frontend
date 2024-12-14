// Utility to retrieve or generate a persistent session
export const getOrCreateSessionId = (): string => {
  const existingSessionId = localStorage.getItem('session_id');
  if (existingSessionId) {
    return existingSessionId;
  }
  const newSessionId = crypto.randomUUID(); // Generate a new UUID for the socket_id
  localStorage.setItem('session_id', newSessionId);
  return newSessionId;
};
