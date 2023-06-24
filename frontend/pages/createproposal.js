"use client";
import moment from 'moment';
import { useState, useEffect } from "react";
import { readContract,writeContract } from '@wagmi/core';
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
// a
function CreateProposal() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState({});
  async function getdata() {
    
    const balance = await readContract({
      address: DAOTokenAddress,
      abi: DAOTokenABI.abi,
      functionName: "balanceOf",
      args: [address],
    });
    const totalProposals = await readContract({
      address: DAOAddress,
      abi: DAOABI.abi,
      functionName: "totalProposals",
    });

    setData({ price, balance, totalProposals });
  }
  useEffect(() => {
    getdata();
  }, []);

  async function addProposal(){
    let _tokenId=document.getElementById('tokenId')?.value;
    let _deadline=document.getElementById('deadline')?.value;
    let timestamp=new Date(_deadline).getTime();
    
    const { hash } = await writeContract({
      address: DAOAddress,
      abi: DAOABI.abi,
      functionName: 'CreateProposal',
      args:[_tokenId,timestamp],
    
      
     
    })



  }


  console.log(data);
  return (
    <div className="flex flex-col items-center ">
      <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
      <div className={styles.description}>Welcome to the DAO!</div>
      <div className={styles.description}>
        Your CryptoDevs NFT Balance: {data?.balance?.toString()}
        <br />
        Total Number of Proposals: {data?.totalProposals?.toString()}
      </div>
      <input id="tokenId" className="w-[20vw]" type="number" />
      <input id='deadline' className="w-[20vw]"  type="date" />
      <button onClick={addProposal}>create proposal </button>
    </div>
  );
}

export default CreateProposal;
