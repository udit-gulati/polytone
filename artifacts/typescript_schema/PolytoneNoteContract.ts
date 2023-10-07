import { Contract, wasmKitTypes } from "@arufa/wasmkit";
export type ExecuteMsg = {
  query: {
    callback: CallbackRequest;
    msgs: QueryRequest_for_Empty[];
    timeout_seconds: Uint64;
  };
} | {
  execute: {
    callback?: CallbackRequest | null;
    msgs: CosmosMsg_for_Empty[];
    timeout_seconds: Uint64;
  };
};
export type Binary = string;
export type QueryRequest_for_Empty = {
  bank: BankQuery;
} | {
  custom: Empty;
} | {
  staking: StakingQuery;
} | {
  stargate: {
    data: Binary;
    path: string;
    [k: string]: unknown;
  };
} | {
  ibc: IbcQuery;
} | {
  wasm: WasmQuery;
};
export type BankQuery = {
  balance: {
    address: string;
    denom: string;
    [k: string]: unknown;
  };
} | {
  all_balances: {
    address: string;
    [k: string]: unknown;
  };
};
export type StakingQuery = {
  bonded_denom: {
    [k: string]: unknown;
  };
} | {
  all_delegations: {
    delegator: string;
    [k: string]: unknown;
  };
} | {
  delegation: {
    delegator: string;
    validator: string;
    [k: string]: unknown;
  };
} | {
  all_validators: {
    [k: string]: unknown;
  };
} | {
  validator: {
    address: string;
    [k: string]: unknown;
  };
};
export type IbcQuery = {
  port_id: {
    [k: string]: unknown;
  };
} | {
  list_channels: {
    port_id?: string | null;
    [k: string]: unknown;
  };
} | {
  channel: {
    channel_id: string;
    port_id?: string | null;
    [k: string]: unknown;
  };
};
export type WasmQuery = {
  smart: {
    contract_addr: string;
    msg: Binary;
    [k: string]: unknown;
  };
} | {
  raw: {
    contract_addr: string;
    key: Binary;
    [k: string]: unknown;
  };
} | {
  contract_info: {
    contract_addr: string;
    [k: string]: unknown;
  };
};
export type Uint64 = string;
export type CosmosMsg_for_Empty = {
  bank: BankMsg;
} | {
  custom: Empty;
} | {
  staking: StakingMsg;
} | {
  distribution: DistributionMsg;
} | {
  stargate: {
    type_url: string;
    value: Binary;
    [k: string]: unknown;
  };
} | {
  ibc: IbcMsg;
} | {
  wasm: WasmMsg;
} | {
  gov: GovMsg;
};
export type BankMsg = {
  send: {
    amount: Coin[];
    to_address: string;
    [k: string]: unknown;
  };
} | {
  burn: {
    amount: Coin[];
    [k: string]: unknown;
  };
};
export type Uint128 = string;
export type StakingMsg = {
  delegate: {
    amount: Coin;
    validator: string;
    [k: string]: unknown;
  };
} | {
  undelegate: {
    amount: Coin;
    validator: string;
    [k: string]: unknown;
  };
} | {
  redelegate: {
    amount: Coin;
    dst_validator: string;
    src_validator: string;
    [k: string]: unknown;
  };
};
export type DistributionMsg = {
  set_withdraw_address: {
    address: string;
    [k: string]: unknown;
  };
} | {
  withdraw_delegator_reward: {
    validator: string;
    [k: string]: unknown;
  };
};
export type IbcMsg = {
  transfer: {
    amount: Coin;
    channel_id: string;
    timeout: IbcTimeout;
    to_address: string;
    [k: string]: unknown;
  };
} | {
  send_packet: {
    channel_id: string;
    data: Binary;
    timeout: IbcTimeout;
    [k: string]: unknown;
  };
} | {
  close_channel: {
    channel_id: string;
    [k: string]: unknown;
  };
};
export type Timestamp = Uint64;
export type WasmMsg = {
  execute: {
    contract_addr: string;
    funds: Coin[];
    msg: Binary;
    [k: string]: unknown;
  };
} | {
  instantiate: {
    admin?: string | null;
    code_id: number;
    funds: Coin[];
    label: string;
    msg: Binary;
    [k: string]: unknown;
  };
} | {
  migrate: {
    contract_addr: string;
    msg: Binary;
    new_code_id: number;
    [k: string]: unknown;
  };
} | {
  update_admin: {
    admin: string;
    contract_addr: string;
    [k: string]: unknown;
  };
} | {
  clear_admin: {
    contract_addr: string;
    [k: string]: unknown;
  };
};
export type GovMsg = {
  vote: {
    proposal_id: number;
    vote: VoteOption;
    [k: string]: unknown;
  };
};
export type VoteOption = "yes" | "no" | "abstain" | "no_with_veto";
export interface CallbackRequest {
  msg: Binary;
  receiver: string;
}
export interface Empty {
  [k: string]: unknown;
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export interface IbcTimeout {
  block?: IbcTimeoutBlock | null;
  timestamp?: Timestamp | null;
  [k: string]: unknown;
}
export interface IbcTimeoutBlock {
  height: number;
  revision: number;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  block_max_gas: Uint64;
  pair?: Pair | null;
}
export interface Pair {
  connection_id: string;
  remote_port: string;
}
export type QueryMsg = "active_channel" | "pair" | {
  remote_address: {
    local_address: string;
  };
} | "block_max_gas";
export type Nullable_String = string | null;
export type Nullable_Pair = Pair | null;
export interface PolytoneNoteInterface {
  query: ({
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
    callback,
    msgs,
    timeoutSeconds
  }: {
    callback: CallbackRequest;
    msgs: QueryRequest_for_Empty[];
    timeoutSeconds: Uint64;
  }) => Promise<any>;
  execute: ({
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
    callback,
    msgs,
    timeoutSeconds
  }: {
    callback: CallbackRequest | null;
    msgs: CosmosMsg_for_Empty[];
    timeoutSeconds: Uint64;
  }) => Promise<any>;
}
export class PolytoneNoteContract extends Contract implements PolytoneNoteInterface {
  constructor(instantiateTag?: string) {
    super("polytone_note", instantiateTag);
    this.query = this.query.bind(this);
    this.execute = this.execute.bind(this);
  }

  query = async ({
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
    callback,
    msgs,
    timeoutSeconds
  }: {
    callback: CallbackRequest;
    msgs: QueryRequest_for_Empty[];
    timeoutSeconds: Uint64;
  }): Promise<any> => {
    return await this.executeMsg({
      query: {
        callback,
        msgs,
        timeout_seconds: timeoutSeconds
      }
    }, account, customFees, memo, transferAmount);
  };
  execute = async ({
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
    callback,
    msgs,
    timeoutSeconds
  }: {
    callback: CallbackRequest | null;
    msgs: CosmosMsg_for_Empty[];
    timeoutSeconds: Uint64;
  }): Promise<any> => {
    return await this.executeMsg({
      execute: {
        callback,
        msgs,
        timeout_seconds: timeoutSeconds
      }
    }, account, customFees, memo, transferAmount);
  };
}