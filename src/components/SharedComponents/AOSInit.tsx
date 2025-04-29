import {useEffect} from "react"
import AOS from "aos"

interface Iprops<T> {
  [key: string]: T
}

const AOSInit = (props: Iprops<string | boolean>) => {
  useEffect(() => {
    AOS.init({
      ...props,
      once: true,
    })
  }, [])
}

export default AOSInit
