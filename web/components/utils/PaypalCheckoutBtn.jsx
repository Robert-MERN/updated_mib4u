import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js"
import useStateContext from '../../context/ContextProvider'


const PaypalCheckoutBtn = () => {
    const { notifyError, notifySuccess, notifyWarn, imageSrc } = useStateContext()
    return (
        <PayPalButtons
            style={{
                color: "gold",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "rect"
            }}
            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    notifyError(
                        "You already have bought this"
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        description: imageSrc.about,
                        amount: {
                            value: imageSrc.price
                        }
                    }]
                })
            }}

            onApprove={async (data, actions) => {
                await actions.order.capture();
                notifySuccess("You have successfully made the payment!")
            }}
            onError={(err) => {
                notifyError(err);
                console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
                notifyWarn("You have canceled the payment!")
            }}
        />
    )
}

export default PaypalCheckoutBtn