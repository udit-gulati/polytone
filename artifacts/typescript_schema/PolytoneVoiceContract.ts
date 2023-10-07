import { Contract, wasmKitTypes, Coin } from "@arufa/wasmkit";
export type ExecuteMsg = {
  rx: {
    connection_id: string;
    counterparty_port: string;
    data: Binary;
  };
};
export type Binary = string;
export type Uint64 = string;
export interface InstantiateMsg {
  block_max_gas: Uint64;
  proxy_code_id: Uint64;
}
export type QueryMsg = "block_max_gas" | "proxy_code_id";
export interface PolytoneVoiceInterface {
  rx: ({
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
    connectionId,
    counterpartyPort,
    data
  }: {
    connectionId: string;
    counterpartyPort: string;
    data: Binary;
  }) => Promise<any>;
}
export class PolytoneVoiceContract extends Contract implements PolytoneVoiceInterface {
  constructor(instantiateTag?: string) {
    super("polytone_voice", instantiateTag);
    this.rx = this.rx.bind(this);
  }

  rx = async ({
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
    connectionId,
    counterpartyPort,
    data
  }: {
    connectionId: string;
    counterpartyPort: string;
    data: Binary;
  }): Promise<any> => {
    return await this.executeMsg({
      rx: {
        connection_id: connectionId,
        counterparty_port: counterpartyPort,
        data
      }
    }, account, customFees, memo, transferAmount);
  };
}