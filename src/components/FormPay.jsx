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

function FormPay({ db }) {
  const navigate = useNavigate();

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
              className="col-4 me-2 border-bottom form-control"
              placeholder="Calle"
            />
            <input
              type="text"
              className="col-4 me-2 border-bottom form-control"
              placeholder="Portal"
            />
            <input
              type="number"
              className="col-4 border-bottom form-control"
              placeholder="CP"
            />
          </div>

          <label className="text-start ps-3 form-label">Tarjeta</label>
          <div className="col-12">
            <CardNumberElement
              className="border-bottom p-2"
              options={OPTIONS}
            />
          </div>

          <div className="col-6 col-sm-6 col-md-6 col-lg-6 pe-0">
            <CardExpiryElement className="border-bottom p-2 mt-2 me-2" />
          </div>

          <div className="col-6 col-sm-6 col-md-6 col-lg-6 ps-0">
            <CardCvcElement className="border-bottom p-2 mt-2 ms-2" />
          </div>
        </div>

        <button
          className="btn btn-primary p-2 mt-4 col-4 align-self-center"
          type="submit"
          disabled={!stripe || !elements}
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
