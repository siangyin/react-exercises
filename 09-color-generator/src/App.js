import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
	const [color, setColor] = useState("");
	const [error, setError] = useState(false);
	const [list, setList] = useState(new Values("#f15025").all(10));

	function handleSubmit(e) {
		e.preventDefault();
		try {
			console.log("submitted");
			let colors = new Values(color).all(10);
			setList(colors);
			setError(false);
		} catch (err) {
			setError(true);
			console.log(err);
		}
	}

	return (
		<>
			<section className="container">
				<h3>Color generator</h3>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={color}
						onChange={(e) => {
							setColor(e.target.value);
						}}
						placeholder="#f15025"
						className={`${error ? "error" : null}`}
					></input>
					<button className="btn" type="submit">
						submit
					</button>
				</form>
			</section>
			<section className="colors">
				{list.map((col, i) => {
					return <SingleColor key={i} {...col} index={i} hex={col.hex} />;
				})}
			</section>
		</>
	);
}

export default App;
