export type InteractionJson = {
  sheet: {
    [key: string]: {
      uuid: string;
      name: string;
      nodes: unknown[];
    };
  };
};
