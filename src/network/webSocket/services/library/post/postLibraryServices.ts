import WsModule from '@/network/module/wsModule';

/**
 * @description
 * 주의! 오직 db에 라이브러리를 넣어야 할 때만 사용하는 함수입니다.
 */
const postLibraryAssets = async () => {
  const params = await fetch('mock/convertedws.json').then((res) => res.json());
  let count = 0;
  params.forEach(
    (param: {
      name: string;
      filename: string;
      type: 'asset';
      domain: string;
      majorCategories: string[];
      minorCategories: string[];
      author: string;
    }) => {
      setTimeout(async () => {
        const wsModule = new WsModule({
          targetService: 'CreateLibraryAssetController'
        });
        const { encodedBody } = await wsModule.encodeBody(param);
        const message = wsModule.assembleMessage(encodedBody);
        wsModule.send(message);
      }, count++ * 200);
    }
  );
};

const postLibraryServices = {
  postLibraryAssets
};

export default postLibraryServices;
