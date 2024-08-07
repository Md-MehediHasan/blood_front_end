import Head from 'next/head'

const myFont = localFont({ src: './my-fonts/HimelBorno.ttf' })
export default function MyApp ({Component,pageProps}) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
	

