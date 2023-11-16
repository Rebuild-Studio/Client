export type InteractionNodeData = {
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
      reference?: ReferenceParameter;
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
      reference?: ReferenceParameter;
    };
  };
  control: unknown; //[TBD] should be changed if keep using contorl format
  referenceParameter: ReferenceParameter[];
};

export type ReferenceParameter = {
  name: string;
  type: string;
  defaultValue: unknown;
  tooltipMessage: string;
};
