import moment from "moment";
import { useState, useEffect } from "react";
import { readContract, writeContract } from "@wagmi/core";
import styles from "../styles/Home.module.css";
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
import ActiveItems from "../components/ActiveItem";

function ViewProposals() {
  const [activeProposals, setActiveProposals] = useState([]);
  const [inActiveProposals, setInActiveProposals] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  async function getProposals() {
    const totalProposals = await readContract({
      address: DAOAddress,
      abi: DAOABI.abi,
      functionName: "totalProposals",
    });
    console.log(parseInt(totalProposals.toString()));
    let active = [];
    let inactive = [];
    for (let i = 0; i < parseInt(totalProposals.toString()); i++) {
      const dat = await readContract({
        address: DAOAddress,
        abi: DAOABI.abi,
        functionName: "proposals",
        args: [i],
      });
      let value = {
        id: i,
        tokenId: dat[0].toString(),
        deadline: dat[1].toString(),
        posVotes: parseInt(parseInt(dat[2])),
        negVotes: parseInt(dat[3]),
        executed: dat[4],
      };
      console.log(value);
      if (new Date().getTime().toString() > value.deadline) {
        inactive.push(value);
      } else {
        active.push(value);
      }
    }
    console.log("active", active);
    setActiveProposals(active);
    console.log("inactive", inactive);
    setInActiveProposals(inactive);
  }

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <>
      <div className="tab  flex flex-col items-center justify-center ">
        <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-full" onClick={()=>{setActiveTab(1)}}>
          {
              activeTab===1?
              <div
              href="#"
              class="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              Active
            </div>
              
              :
              <div
              href="#"
              class="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Active
            </div>

            }
          </li>
          <li class="flex justify-center" onClick={()=>{setActiveTab(0)}}>
            {
              activeTab===0?
              <div
              href="#"
              class="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              InActive
            </div>
              
              :
              <div
              href="#"
              class="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              InActive
            </div>

            }
          
          </li>
        </ul>
      </div>

      <h1 className={styles.title}>Proposals</h1>
      <div className="flex flex-col items-center">
      {activeTab === 1
        ? activeProposals?.map((data) => {
          return <ActiveItems data={data} Active={1} />;
        })
        : inActiveProposals?.map((data) => {
          return <ActiveItems data={data} Active={0} />;
        })}
        </div>
    </>
  );
}
export default ViewProposals;
