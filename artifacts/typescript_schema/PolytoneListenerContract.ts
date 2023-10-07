import { Contract, wasmKitTypes, Coin } from "@arufa/wasmkit";
export type ExecuteMsg = {
  callback: CallbackMessage;
};
export type Addr = string;
export type Binary = string;
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
export interface InstantiateMsg {
  note: string;
}
export type QueryMsg = {
  note: {};
} | {
  result: {
    initiator: string;
    initiator_msg: string;
  };
};
export type String = string;
export interface ResultResponse {
  callback: CallbackMessage;
}
export interface PolytoneListenerReadOnlyInterface {
  note: () => Promise<any>;
  result: ({
    initiator,
    initiatorMsg
  }: {
    initiator: string;
    initiatorMsg: string;
  }) => Promise<any>;
}
export class PolytoneListenerQueryContract extends Contract implements PolytoneListenerReadOnlyInterface {
  constructor(contractName: string, instantiateTag?: string) {
    super(contractName, instantiateTag);
    this.note = this.note.bind(this);
    this.result = this.result.bind(this);
  }

  note = async (): Promise<any> => {
    return this.queryMsg({
      note: {}
    });
  };
  result = async ({
    initiator,
    initiatorMsg
  }: {
    initiator: string;
    initiatorMsg: string;
  }): Promise<any> => {
    return this.queryMsg({
      result: {
        initiator,
        initiator_msg: initiatorMsg
      }
    });
  };
}
export interface PolytoneListenerInterface extends PolytoneListenerReadOnlyInterface {
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
}
export class PolytoneListenerContract extends PolytoneListenerQueryContract implements PolytoneListenerInterface {
  constructor(instantiateTag?: string) {
    super("polytone_listener", instantiateTag);
    this.callback = this.callback.bind(this);
  }

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
}