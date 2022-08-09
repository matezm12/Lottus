import 'bulma/css/bulma.css'

import { Web3ReactHooks, useWeb3React } from "@web3-react/core"
import { useEffect, useRef, useState } from 'react'

import Head from 'next/head'
import Web3 from 'web3'
import lotteryContract from '../blockchain/lottery'
import shortenHex from "../utils/shortenHex.ts"
import styles from '../styles/Home.module.css'

export default function Home() {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const [lcContract, setLcContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [buttonText, setButtonText] = useState("Connect Wallet");


  const Props = {
    connectorHooks: Web3ReactHooks
  }

  const {
    connector: activeConnector,
    account,
    isActive: isAnyConnectorActive,
  } = useWeb3React()
  const { useIsActive } = connectorHooks
  const isActive = useIsActive()

  useEffect(() => {
    if (lcContract) getpot()


  }, [lcContract, lotteryPot])

  const getpot = async () => {
    console.log('getPot')
    const pot = await lcContract.methods.GetPrizepool().call()
    setLotteryPot(web3.utils.fromWei(pot, 'Eth'))
  }

  const connectWalletHandler = async () => {
    if (typeof Window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {

        await window.ethereum.request({ method: "eth_requestAccounts" })

        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])
        setButtonText(address)
        /* create local contract copy */
        const lc = lotteryContract(web3)
        setLcContract(lc)


      } catch (err) {
        console.log(err.message)
      }

    } else {
      console.log("Please install MetaMask")
    }
  }

  return (

    <div>
      <Head>
        <title>Lottus-org</title>
        <meta name="description" content="HELP 2 EARN SYSTEM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>



        <nav className="navbar mt-4 mb-4">
          <div className="container is-small">
            <div className="navbar-start is-italic is-family-monospace">
              <strong>V0.1alpha</strong>
              <div className="image is-470x180 mt-5">
                <img src="https://gateway.pinata.cloud/ipfs/QmWwWFVihhmNmkCQiujNiHVCGMYVRonriqDf5jchHMm8nB"></img>

              </div>

            </div>
            <div className="navbar-end">
              <button onClick={connectWalletHandler} className="button is-red is-large is-rounded">
                {!address || !isActive ? `Connect Wallet` : shortenHex(address)}</button>
            </div>
          </div>
        </nav>

        <nav className="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
          <ul>
            <li><a href="#">Smart Contract</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Discord</a></li>
            <li className="is-active"><a href="#" aria-current="page">Home Page</a></li>
          </ul>
        </nav>



        <div className='container mt-6 mb-6'>
          <div className='column'>
            <div className='image is-100x100'>
              <img src='https://gateway.pinata.cloud/ipfs/QmRWXMYwBKSYcduGm9Frbq92eNeR4JBBXN9rYx8xtLyktf'></img>
            </div>



          </div>
        </div>

        <div className='container mt-6'>
          <div className='columns'>
            <div className='Column'>
              <section className='mt-6 is-large'>
                <div className='block'>
                </div>

              </section>
            </div>
          </div>
        </div>

        <div className='container is-large mt-6 mt-6'>

          <div className="columns">

            <div className="column">
              <section className="title is-medium mt-5">
                <p>Enter Monthly lottus</p>
                <p><b>(0.01 ETH)</b></p>
                <button className="button is-danger is-rounded is-large mt-3">Enter</button>
              </section>




            </div>

            <div className='column is-large'>
              <section className="title is-medium mt-5">
                <h1 className="title is-4 is-italic">
                  <p><b>Lottus No:</b>--</p>
                  <p><b>Start date:</b>--/--/----</p>
                  <p><b>Finishing date:</b>--/--/----</p>
                </h1>
              </section>
            </div>


            <div className='column is-large'>
              <section className="title is-medium= mt-5">
                <p><b>Current prize pool:</b></p>
                <p>(45% of the total pool) </p>
                <p> </p>
                <button className="button is-primary is-hovered is-large is-static mt-3" title='Disabled button' disabled>{lotteryPot}</button>
              </section>
            </div>
          </div>

          <div className="columns">

            <div className="column">
              <section className="title is-medium mt-5">
                <p><b>Check Charity</b></p>
                <p>(Wallet Address)</p>
                <button className="button is-danger is-rounded is-large is-hovered is-static mt-3">0x0000000000000000000000000000000000000000</button>
              </section>




            </div>

            <div className='column is-large'>
              <section className="title is-medium mt-5">

              </section>
            </div>


            <div className='column is-large'>
              <section className="title is-medium= mt-5">
                <p><b>Check Winner</b></p>
                <p>(Wallet Address) </p>
                <p> </p>
                <button className="button is-primary is-rounded is-hovered is-large is-static mt-3">0x0000000000000000000000000000000000000000</button>
              </section>
            </div>
          </div>

          <div className="columns is-large mt-6">
            <div className="column">

              <section className="mt-5">
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2><b>Players</b></h2>
                      <div>
                        <a href="https://etherscan.io/error" target="_blank">
                          Test
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            <div className="column">
              <section className="mt-5">
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h2><b>Lottery</b></h2>
                      <div className="history-entry">
                        <div>Lottery #1 winner</div>
                        <div>
                          <a href="https://etherscan.io/error" target="_blank">
                            Test
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="columns is-large mt-6">
            <div className="column is-centered">

              <section className="mt-5 is-centered">
                <div className="card">
                  <div className="card-content is-centered">
                    <div className="content is-centered">
                      <h2><b>What is Lottus-org?</b></h2>
                      <div>
                        <p>Lottus-org was created as a <strong>Help-2-Earn</strong> system to use the current web3 techonology as a way to give the people a way of earning some money while at the same time helping different charities.</p><p> Lottus is based on a iniciative done by a group of Colombian people based in the U.S where each month 100 people put 100 USD into a
                          raffle where the winner gets a % of that money and the other % goes to help people living in the town where they were born.</p> this group is called <b>Los 100 de Filandia</b>...
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            <div className="column is-centered">

              <section className="mt-5 is-centered">
                <div className="card">
                  <div className="card-content is-centered">
                    <div className="content is-centered">
                      <h2><b>How does it work?</b></h2>
                      <div>
                        <p>Lottus is created via a <b><a href="#">Smart-Contract</a></b> based on Ethereum, each transaction will live forever in the Block-chain as a way to show transparency, each month the charity will change and will be chosen by the community on <b><a href="#">discord</a></b>.</p><p> At the start of each lottus raffle our devs will set the charity address and then at end they will send the function of choosing a winner and releasing the funds, that way it will be the Smart-Contract itself that releases the funds, avoiding any type of scam.</p> <p>Percentages will be distributed in the following way: </p>
                        <ul>
                          <li><b>45%</b> will go to the winner of the lottus.</li>
                          <li><b>45%</b> Will go to the charity chosen for that lottus.</li>
                          <li><b>10%</b> Will go to the devs and to keep improving the experience.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            <div className="column is-centered">

              <section className="mt-5 is-centered">
                <div className="card">
                  <div className="card-content is-centered">
                    <div className="content is-centered">
                      <h2><b>Keep in mind...</b></h2>
                      <div>
                        <p>Lottus is a bet, <b>Do not use money you're not comfortable with risking</b> the system is based on pure luck and we cannot promise any income from buying a ticket of any of our raffles</p><p>Please keep an eye on the current prize pool before buying some tickets as a way to avoid investing more than what you would get if you win the lottus.</p>
                        <p>we are an alpha, There's still some things that we want to improve, <b>THIS IS NOT A FINAL VERSION</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>



            </div>
          </div>
        </div>



      </main>//

      <footer className={styles.footer}>
        <p>&copy; 2022 Lottus.org</p>
      </footer>
    </div>
  )
}
