import { Contract, wasmKitTypes, Coin } from "@arufa/wasmkit";
export type ExecuteMsg = {
  hello: {
    data?: Binary | null;
  };
} | {
  callback: CallbackMessage;
} | {
  run_out_of_gas: {};
};
export type Binary = string;
export type Addr = string;
export type Callback = {
  query: Result_of_Array_of_Binary_or_ErrorResponse;
} | {
  execute: Result_of_ExecutionResponse_or_String;
} | {
  fatal_error: string;
};
export type Result_of_Array_of_Binary_or_ErrorResponse = {
  Ok: Binary[];
  [k: string]: unknown;
} | {
  Err: ErrorResponse;
  [k: string]: unknown;
};
export type Uint64 = string;
export type Result_of_ExecutionResponse_or_String = {
  Ok: ExecutionResponse;
  [k: string]: unknown;
} | {
  Err: string;
  [k: string]: unknown;
};
export interface CallbackMessage {
  initiator: Addr;
  initiator_msg: Binary;
  result: Callback;
}
export interface ErrorResponse {
  error: string;
  message_index: Uint64;
}
export interface ExecutionResponse {
  executed_by: string;
  result: SubMsgResponse[];
}
export interface SubMsgResponse {
  data?: Binary | null;
  events: Event[];
  [k: string]: unknown;
}
export interface Event {
  attributes: Attribute[];
  type: string;
  [k: string]: unknown;
}
export interface Attribute {
  key: string;
  value: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {}
export type QueryMsg = {
  history: {};
} | {
  hello_history: {};
};
export interface HelloHistoryResponse {
  history: string[];
}
export interface CallbackHistoryResponse {
  history: CallbackMessage[];
}
export interface PolytoneTesterReadOnlyInterface {
  history: () => Promise<any>;
  helloHistory: () => Promise<any>;
}
export class PolytoneTesterQueryContract extends Contract implements PolytoneTesterReadOnlyInterface {
  constructor(contractName: string, instantiateTag?: string) {
    super(contractName, instantiateTag);
    this.history = this.history.bind(this);
    this.helloHistory = this.helloHistory.bind(this);
  }

  history = async (): Promise<any> => {
    return this.queryMsg({
      history: {}
    });
  };
  helloHistory = async (): Promise<any> => {
    return this.queryMsg({
      hello_history: {}
    });
  };
}
export interface PolytoneTesterInterface extends PolytoneTesterReadOnlyInterface {
  hello: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    data
  }: {
    data: Binary | null;
  }) => Promise<any>;
  callback: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  runOutOfGas: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
}
export class PolytoneTesterContract extends PolytoneTesterQueryContract implements PolytoneTesterInterface {
  constructor(instantiateTag?: string) {
    super("polytone_tester", instantiateTag);
    this.hello = this.hello.bind(this);
    this.callback = this.callback.bind(this);
    this.runOutOfGas = this.runOutOfGas.bind(this);
  }

  hello = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    data
  }: {
    data: Binary | null;
  }): Promise<any> => {
    return await this.executeMsg({
      hello: {
        data
      }
    }, account, customFees, memo, transferAmount);
  };
  callback = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      callback: {}
    }, account, customFees, memo, transferAmount);
  };
  runOutOfGas = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: wasmKitTypes.UserAccount;
    customFees?: wasmKitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      run_out_of_gas: {}
    }, account, customFees, memo, transferAmount);
  };
}