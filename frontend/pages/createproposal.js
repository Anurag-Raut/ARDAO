"use client";
import moment from 'moment';
import { useState, useEffect } from "react";
import { readContract,writeContract } from '@wagmi/core';
import { ToastContainer, toast } from 'react-toastify';
import styles from "../styles/Home.module.css";
import 'react-toastify/dist/ReactToastify.css';
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
// a
function CreateProposal() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState({});
  const balance = useContractRead({
    address: DAOTokenAddress,
    abi: DAOTokenABI.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })
  const totalProposals =  useContractRead({
    address: DAOAddress,
    abi: DAOABI.abi,
    functionName: "totalProposals",
    watch:true
  });
  async function getdata() {
    
   
   

    setData({  balance, totalProposals });
  }
  useEffect(() => {
    try{
      getdata();
    
    }
    catch{
    
      ()=>toast.warn(error, {
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
   
  }, []);

  async function addProposal(){
    let _tokenId=document.getElementById('tokenId')?.value;
    let _deadline=document.getElementById('deadline')?.value;
    let timestamp=new Date(_deadline).getTime();
    try{

      const { hash,error } = await writeContract({
        address: DAOAddress,
        abi: DAOABI.abi,
        functionName: 'CreateProposal',
        args:[_tokenId,timestamp],
      
        
       
      })
     

    }
    catch(error) {
      console.log(error)
      toast.warn(error.toString(), {
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


  console.log(data);
  return (
    <div className="flex flex-col items-center ">
      <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
      <div className={styles.description}>Welcome to the DAO!</div>
      <div className={styles.description}>
        Your CryptoDevs NFT Balance: {balance?.data?.toString()}
        <br />
        Total Number of Proposals: {totalProposals?.data?.toString()}
      </div>
      <div className='m-2 w-[20vw]'>
    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TokenId</label>
        <input type="text"  id="tokenId" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div className='m-2 w-[20vw]'>
    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
        <input type="date" id='deadline' class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <button  onClick={addProposal} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">create proposal</button>
     
     
    </div>
  );
}

export default CreateProposal;
