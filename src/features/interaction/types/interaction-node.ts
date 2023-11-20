export type ReferenceParameter = {
  name: string;
  type: string;
  defaultValue: unknown;
  tooltipMessage: string;
};

export type Socket = {
  key: string;
  uuid: string;
  type: string;
  name: string;
  wires: any[];
  node: string;
  isInput: boolean;
  reference?: ReferenceParameter;
};

export type InteractionNodeData = {
  name: string;
  uuid: string;
  type: string;
  position: number[];
  inputSockets: {
    [key: string]: Socket;
  };
  outputSockets: {
    [key: string]: Socket;
  };
  control: unknown; // [TBD] should be changed if keep using control format
  referenceParameter: ReferenceParameter[];
};
