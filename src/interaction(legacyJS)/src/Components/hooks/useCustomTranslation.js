import { useTranslation } from 'react-i18next';

function useCustomTranslation() {
  const { t } = useTranslation();

  return (key) => {
    let baseKey = key;
    let parameter = "";

    // 괄호가 있는 경우 파싱
    if (key.includes("(")) {
      const splitKey = key.split("(");
      baseKey = splitKey[0];
      parameter = `(${splitKey[1]}`;
    }

    return `${t(baseKey)}${parameter}`;
  };
}

export default useCustomTranslation;
