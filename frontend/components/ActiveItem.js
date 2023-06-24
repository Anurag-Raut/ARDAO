import {
  DAOABI,
  DAOAddress,
  NFTMarketplaceABI,
  NFTMarketplaceAddress,
  ARTokenABI,
  ARTokenAddress,
  DAOTokenABI,
  DAOTokenAddress,
} from "../constants.js";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
function ActiveItems({ data, Active }) {
  async function Vote(_vote) {
    console.log(_vote);
    const { hash } = await writeContract({
      address: DAOAddress,
      abi: DAOABI.abi,
      functionName: "vote",
      args: [data.id, _vote],
    });
    if (hash) {
      console.log("done");
    } else {
      console.log("not done");
    }
  }
  async function execute() {
    const { hash } = await writeContract({
      address: DAOAddress,
      abi: DAOABI.abi,
      functionName: "executeProposal",
      args: [data.id],
    });
  }

  return (
    <div className="m-5 flex justify-between block w-[50vw] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div
        href="#"
        class=""
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Proposal no: {data.id}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {" "}
          token id : {data.tokenId}
        </p>
        </div>
        <div>
          {Active == 1 ? (
            <div >
              <button className='m-3' onClick={() => Vote(true)}>Yes</button>
              <button className='m-3' onClick={() => Vote(false)}>No</button>
            </div>
          ) : (
            <button onClick={() => execute()}>execute </button>
          )}
        </div>
      
    </div>
  );
}
export default ActiveItems;
