import '../styles/globals.css'
import Layout from "../layout/Layout";
import { ContextProvider } from '../context/ContextProvider';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"




function MyApp({ Component, pageProps }) {
  const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "EUR",
  };
  return (
    <PayPalScriptProvider>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </PayPalScriptProvider>

  )
}

export default MyApp
