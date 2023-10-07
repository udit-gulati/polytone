import chalk from "chalk";
import { getAccountByName } from "@arufa/wasmkit";

import { PolytoneNoteContract } from "../artifacts/typescript_schema/PolytoneNoteContract";
import { PolytoneVoiceContract } from "../artifacts/typescript_schema/PolytoneVoiceContract";
import { PolytoneProxyContract } from "../artifacts/typescript_schema/PolytoneProxyContract";

function sleep(seconds: number) {
  console.log("Sleeping for " + seconds + " seconds");
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

async function run () {
  const runTs = String(new Date());
  const nativeDenom = "untrn";  // neutron fee token
  const remoteDenom = "uatom";  // cosmos hub fee token
  const contract_owner = await getAccountByName("account_0");

  // const connectionId = networkConfig.relayers.gaia.connection_id;
  // const interchainAccountName = "remote_account_1";
  // const remoteValidatorOne = "cosmosvaloper18hl5c9xn5dze2g50uaw0l2mr02ew57zk0auktn";

  console.log("admin account fetched successfully");

  const note_contract = new PolytoneNoteContract();
  await note_contract.setupClient();

  const voice_contract = new PolytoneVoiceContract();
  await voice_contract.setupClient();

  const proxy_contract = new PolytoneProxyContract();
  await proxy_contract.setupClient();

  // deploy note
  const deploy_note_contract = await note_contract.deploy(
    contract_owner,
    {
      amount: [{ amount: "13000", denom: nativeDenom }],
      gas: "5000000",
    }
  );
  console.log(chalk.cyan("Response: "), deploy_note_contract);

  // deploy voice
  const deploy_voice_contract = await voice_contract.deploy(
    contract_owner,
    {
      amount: [{ amount: "13000", denom: nativeDenom }],
      gas: "5000000",
    }
  );
  console.log(chalk.cyan("Response: "), deploy_voice_contract);

  // deploy proxy
  const deploy_proxy_contract = await proxy_contract.deploy(
    contract_owner,
    {
      amount: [{ amount: "13000", denom: nativeDenom }],
      gas: "5000000",
    }
  );
  console.log(chalk.cyan("Response: "), deploy_proxy_contract);

  // init note
  const init_note_contract = await note_contract.instantiate(
    {
      block_max_gas: "8888",
      pair: {
        connection_id: "connection-0",
        remote_port: "port_id",
      },
    },
    `Note contract ${runTs}`,
    contract_owner
  );
  console.log(chalk.cyan("Response: "), init_note_contract);

  // init proxy
  const init_proxy_contract = await proxy_contract.instantiate(
    {
    },
    `Proxy contract ${runTs}`,
    contract_owner
  );
  console.log(chalk.cyan("Response: "), init_proxy_contract);

  // init voice
  const init_voice_contract = await voice_contract.instantiate(
    {
      block_max_gas: "555",
      proxy_code_id: proxy_contract.codeId,
    },
    `Voice contract ${runTs}`,
    contract_owner
  );
  console.log(chalk.cyan("Response: "), init_voice_contract);

  console.log("All contract instance created successfully");

  // // Register account on remote chain
  // const register_res = await staking_contract.register(
  //   {
  //     account: contract_owner,
  //     customFees: {
  //       amount: [{ amount: "75000", denom: nativeDenom }],
  //       gas: "300000",
  //     },
  //   },
  //   {
  //     connectionId: connectionId,
  //     interchainAccountId: interchainAccountName,
  //   }
  // );
  // console.log(chalk.cyan("Response: "), register_res);

  // await sleep(10);  // wait for addr to be created
}