export function getPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('windows')) return 'Windows';
  if (userAgent.includes('mac')) return 'MacOS';
  if (userAgent.includes('linux')) return 'Linux';
  if (/iphone|ipad|ipod/.test(userAgent)) return 'iOS';
  if (/android/.test(userAgent)) return 'Android';
  return 'unknown';
}

export function getBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('chrome')) return 'Chrome';
  if (userAgent.includes('safari')) return 'Safari';
  if (userAgent.includes('firefox')) return 'Firefox';
  if (userAgent.includes('edge')) return 'Edge';
  if (userAgent.includes('opera')) return 'Opera';
  return 'unknown';
}