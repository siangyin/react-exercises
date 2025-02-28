export const reducer = (state, action) => {
	if (action.type === "CLEAR_CART") {
		return { ...state, cart: [] };
	}
	if (action.type === "REMOVE") {
		return {
			...state,
			cart: state.cart.filter((item) => item.id !== action.payload),
		};
	}
	if (action.type === "INCREASE") {
		return {
			...state,
			cart: state.cart.map((item) => {
				if (item.id === action.payload) {
					return { ...item, amount: item.amount + 1 };
				} else return item;
			}),
		};
	}

	if (action.type === "DECREASE") {
		return {
			...state,
			cart: state.cart
				.map((item) => {
					if (item.id === action.payload) {
						return { ...item, amount: item.amount - 1 };
					} else return item;
				})
				.filter((item) => item.amount !== 0),
		};
	}

	if (action.type === "GETTL") {
		let { total, amount } = state.cart.reduce(
			(cartTotal, item) => {
				const { price, amount } = item;
				const itemTtl = price * amount;
				cartTotal.amount += amount;
				cartTotal.total += itemTtl;
				return cartTotal;
			},
			{ total: 0, amount: 0 }
		);
		total = parseFloat(total.toFixed(2));
		return { ...state, total, amount };
	}

	if (action.type === "LOADING") {
		return { ...state, loading: true };
	}

	if (action.type === "DISPLAY_ITEMS") {
		return { ...state, cart: action.payload, loading: false };
	}
};
