import localFont from 'next/font/local'
const myFont = localFont({ src: './my-fonts/SutonnyMJ.TTF' })
export default function MyApp ({Component,pageProps}) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
	

