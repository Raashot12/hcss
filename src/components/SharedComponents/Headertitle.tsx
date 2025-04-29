import React from "react"
import Head from "next/head"

type HeadTitleProps = {
  title: string
}

const HeadTitle = ({title}: HeadTitleProps) => (
  <Head>
    <title>{`HCSS - ${title}`}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" href="/favicon.svg" type="image/svg" />
  </Head>
)

export default HeadTitle
