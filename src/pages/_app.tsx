import "@/styles/globals.css"
import { NextPage } from "next"
import Head from "next/head"
import {ToastContainer} from "react-toastify"
import type {AppProps} from "next/app"
import {ReactElement, ReactNode} from "react"

// fonts
import "@fontsource-variable/red-hat-display"
import HeadTitle from "@/components/SharedComponents/Headertitle"


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function Main({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  const renderComponent = <>{getLayout(<Component {...pageProps} />)}</>

  return <div>{renderComponent}</div>
}

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <HeadTitle title="Home" />
      <Main Component={Component} {...pageProps} />
      <ToastContainer />
    </>
  )
}
