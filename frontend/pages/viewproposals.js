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
import ActiveItems from '../components/ActiveItem';

function ViewProposals(){
    const [activeProposals,setActiveProposals]=useState([]);
    const [inActiveProposals,setInActiveProposals]=useState([]);
    async function getProposals(){
        const totalProposals = await readContract({
            address: DAOAddress,
            abi: DAOABI.abi,
            functionName:'totalProposals'
           
          })
          console.log(parseInt (totalProposals.toString()));
          let active=[];
          let inactive=[];
          for(let i=0;i<parseInt (totalProposals.toString());i++){
            const dat = await readContract({
                address: DAOAddress,
                abi: DAOABI.abi,
                functionName:'proposals',
                args:[i]
               
              })
              let value={
                id:i,
                tokenId:dat[0].toString(),
                deadline:dat[1].toString(),
                posVotes:parseInt(parseInt(dat[2])),
                negVotes:parseInt(dat[3]),
                executed:dat[4],
              }
              console.log(value);
              if(new Date().getTime().toString()>value.deadline){
                inactive.push(value);
              }
              else{
                active.push(value);
              }

          }
        console.log("active",active);
        setActiveProposals(active)
        console.log("inactive",inactive);
        setInActiveProposals(inactive)

         
    }

    useEffect(()=>{
        getProposals();
    },[])


    return (

        <>
        {
            activeProposals.map((data)=>{
                return(
                <ActiveItems data={data}/>
                )
            })
        }
        </>
    );


}
export default ViewProposals;