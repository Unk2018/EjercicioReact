import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FormPay({ db }) {
  const navigate = useNavigate();
  var calle = true;
  var portal = true;
  var codP = true;

  var number = true;
  var expiry = true;
  var cvc = true;

  var btn = true;

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const OPTIONS = {
      showIcon: true,
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

      if (!error) {
        console.log(paymentMethod);

        clearCarrito();
        navigate("/");
      }
    };

    const clearCarrito = () => {
      // Abre usuarios y guarda sus datos
      var objectStore = { db }.db
        .transaction("carrito", "readwrite")
        .objectStore("carrito");
      var objectClear = null;

      try {
        objectClear = objectStore.clear();

        objectClear.onsuccess = () => {
          console.log("Se ha limpiado carrito");
        };
      } catch (error) {
        console.log(error);
      }
    };

    const changeCalle = (e) => {
      if (e.target.value !== "" && e.target.value !== null) {
        calle = false;
      } else {
        calle = true;
      }
      checkForm();
    };

    const changePortal = (e) => {
      if (e.target.value !== "" && e.target.value !== null) {
        portal = false;
      } else {
        portal = true;
      }
      checkForm();
    };

    const changeCodP = (e) => {
      if (e.target.value !== "" && e.target.value !== null) {
        codP = false;
      } else {
        codP = true;
      }
      checkForm();
    };

    const completedNumber = (e) => {
      if (e.complete) {
        number = false;
      } else {
        number = true;
      }
      checkForm();
    };

    const completedExpiry = (e) => {
      if (e.complete) {
        expiry = false;
      } else {
        expiry = true;
      }
      checkForm();
    };

    const completedCvc = (e) => {
      if (e.complete) {
        cvc = false;
      } else {
        cvc = true;
      }

      checkForm();
    };

    const checkForm = () => {
      var button;
      button = document.getElementById("formBtn");

      if (!calle && !portal && !codP && !number && !expiry && !cvc) {
        button.disabled = false;
        btn = false;
      } else {
        button.disabled = true;
        btn = true;
      }

      console.log(btn);
    };

    return (
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="card card-body"
      >
        <div className="form-group row">
          <div className="col-12 input-group mb-3">
            <input
              type="text"
              className="col-4 me-2 border-bottom form-control border-0 shadow-none"
              placeholder="Calle"
              onChange={changeCalle}
            />
            <input
              type="text"
              className="col-4 me-2 border-bottom form-control border-0 shadow-none"
              placeholder="Portal"
              onChange={changePortal}
            />
            <input
              type="number"
              className="col-4 border-bottom form-control border-0 shadow-none"
              placeholder="Cod.P"
              onChange={changeCodP}
            />
          </div>

          <label className="text-start ps-3 form-label">Tarjeta</label>
          <div className="col-12">
            <CardNumberElement
              className="border-bottom p-2"
              options={OPTIONS}
              onChange={completedNumber}
            />
          </div>

          <div className="col-6 col-sm-6 col-md-6 col-lg-6 pe-0">
            <CardExpiryElement
              className="border-bottom p-2 mt-2 me-2"
              onChange={completedExpiry}
            />
          </div>

          <div className="col-6 col-sm-6 col-md-6 col-lg-6 ps-0">
            <CardCvcElement
              className="border-bottom p-2 mt-2 ms-2"
              onChange={completedCvc}
            />
          </div>
        </div>

        <button
          id="formBtn"
          className="btn btn-primary p-2 mt-4 col-4 align-self-center"
          type="submit"
          disabled={btn}
          data-bs-dismiss="modal"
        >
          Efectuar pago
        </button>
      </form>
    );
  };

  const stripePromise = loadStripe(
    // Tu llave pública
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default FormPay;
