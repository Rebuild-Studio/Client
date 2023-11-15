export type CustomNodeData = {
  name: string;
  uuid: string;
  type: string;
  position: number[];
  inputSockets: {
    [key: string]: {
      key: string;
      uuid: string;
      type: string;
      name: string;
      wires: any[];
      node: string;
      isInput: boolean;
      reference: any | null;
    };
  };
  outputSockets: {
    [key: string]: {
      key: string;
      uuid: string;
      type: string;
      name: string;
      wires: any[];
      node: string;
      isInput: boolean;
      reference: any | null;
    };
  };
  control: unknown; //[TBD] should be changed if keep using contorl format
  referenceParameter: referenceParameter[];
};

export type referenceParameter = {
  name: string;
  type: string;
  defaultValue: unknown;
  tooltipMessage: string;
};
