import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
	const { navigate, token, setCartItems, backendURL } =
		useContext(ShopContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	const verifyPayment = async () => {
		try {
			if (!token) {
				return null;
			}
			const response = await axios.post(
				backendURL + "/api/order/verifyStripe",
				{ success, orderId },
				{ headers: { token } }
			);
			console.log("response", response);

			if (response.data.success) {
				setCartItems({});
				navigate("/orders");
			} else {
				toast.error(response.data.message);
				navigate("/cart");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		verifyPayment();
	}, [token]);
	return <div></div>;
};

export default Verify;
