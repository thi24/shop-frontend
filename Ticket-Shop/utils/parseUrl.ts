export const parseUrl = (): string => {
    const regex = /([0-9a-fA-F-]{36})/; // Corrected regex to match UUID
    const url = window.location.href;
    const match = url.match(regex);
    return match ? match[0] : "";
  };