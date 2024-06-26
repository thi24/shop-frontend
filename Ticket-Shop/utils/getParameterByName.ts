export function getParameterByName(name: string, url: string): string | null {
  name = encodeURIComponent(name).replace(/[[\]]/g, '\\$&'); 
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}