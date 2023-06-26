import moment from "moment";
import { useState, useEffect } from "react";
import { readContract, writeContract } from "@wagmi/core";
import styles from "../styles/Home.module.css";
import { ToastContainer, toast } from 'react-toastify';
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
import { useAccount, useConnect, useDisconnect,useContractRead } from "wagmi";
import ActiveItems from "../components/ActiveItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function ViewProposals() {
  const [activeProposals, setActiveProposals] = useState([]);
  const [inActiveProposals, setInActiveProposals] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  async function getProposals() {
    try{

    
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
  catch(error){
    toast.error(error.toString(), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <>
    
      <div className="tab p-6 flex flex-col items-center justify-center ">
      <ConnectButton />
        <ul class="hidden mt-6 w-[40vw] text-sm font-medium text-center text-gray-500 divide-x divide-gray-200  shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-1/2 " onClick={()=>{setActiveTab(1)}}>
          {
              activeTab===1?
              <div
              href="#"
              class="inline-block w-full p-4 text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
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
          <li class="flex justify-center w-1/2 " onClick={()=>{setActiveTab(0)}}>
            {
              activeTab===0?
              <div
              href="#"
              class="inline-block w-full p-4 text-gray-900 bg-gray-100  focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              InActive
            </div>
              
              :
              <div
              href="#"
              class="inline-block w-full  p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
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
        ? activeProposals?.map((data,index) => {
          return <ActiveItems key={data.id} data={data} Active={1} />;
        })
        : inActiveProposals?.map((data,index) => {
          return <ActiveItems key={data.id} data={data} Active={0} />;
        })}
        </div>
    </>
  );
}
export default ViewProposals;
