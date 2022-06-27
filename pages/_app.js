/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import '../styles/globals.css'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from "web3modal"
import { useEffect, useState } from 'react'

 function Marketplace({ Component, pageProps }) {
  const [addressWallet, setAddressWallet] = useState('')
  const [balanceWallet, setBalanceWallet] = useState('')

  useEffect(() => {
    loadAccount()
  }, [])

 

  async function loadAccount() {
    const web3Modal = new Web3Modal({
      network: "testnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    await signer.getAddress().then((res)=>{
      setAddressWallet(res)
    })
    await signer.getBalance().then((res)=>{
      setBalanceWallet(ethers.utils.formatEther(res));
    })
      
    connection.on("accountsChanged", (accounts) => {
      setAddressWallet(accounts[0]);
      signer.getBalance().then((res)=>{
        setBalanceWallet(ethers.utils.formatEther(res));
      })
    });
  }

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4" style={{justifyContent: 'space-between' }}>
          <div className="flex">
            <Link href="/">
              <a className="mr-4 text-blue-500">
                Home
              </a>
            </Link>
            <Link href="/create-item">
              <a className="mr-6 text-blue-500">
                Sell Digital Asset
              </a>
            </Link>
            <Link href="/my-assets">
              <a className="mr-6 text-blue-500">
                My Digital Assets
              </a>
            </Link>
            <Link href="/creator-dashboard">
              <a className="mr-6 text-blue-500">
                Creator Dashboard
              </a>
            </Link>
          </div>
          <div className="flex">
            <div className="flex align-items-center">
              <p className="text-1xl font-bold text-blue-500" style={{textAlign: 'center'}}>Balance:</p>
              <p className="mr-1 ml-2">{balanceWallet}</p>
              <img
                src="https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
                style={{width:20, height:20}}
              />
            </div>
            <div className="flex mr-4 ml-4">
              <p className="text-1xl font-bold text-blue-500" style={{textAlign: 'center'}}>Address:</p>
              <p className="mr-2 ml-2">{addressWallet}</p>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace