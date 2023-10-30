const getPlatform = () => {
  if (!('navigator' in window)) {
    return 'unknown';
  }

  // 혹시 모를 호환성을 위해서 deprecated된 navigator.platform 사용
  const platform = (
    navigator.userAgentData?.platform || navigator.platform
  ).toLowerCase();

  if (platform.startsWith('win')) {
    return 'windows';
  }
  if (platform.startsWith('mac')) {
    return 'macos';
  }

  return 'unknown';
};

export default getPlatform;
