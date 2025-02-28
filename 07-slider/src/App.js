import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
	const [people, setPeople] = useState(data);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const lastIdx = people.length - 1;
		if (index < 0) {
			setIndex(lastIdx);
		}
		if (index > people.length - 1) {
			setIndex(0);
		}
	}, [index, people]);

	useEffect(() => {
		let slider = setInterval(() => {
			setIndex(index + 1);
		}, 3000);
		return () => clearInterval(slider);
	}, [index]);

	return (
		<section className="section">
			<div className="title">
				<h2>
					<span>/</span>reviews
				</h2>
			</div>
			<div className="section-center">
				{people.map((person, i) => {
					const { id, name, image, title, quote } = person;

					let position = "nextSlide";

					if (i === index) {
						position = "activeSlide";
					}

					if (i === index - 1 || (index === 0 && i === people.length - 1)) {
						position = "lastSlide";
					}

					return (
						<article key={id} className={position}>
							<img src={image} alt={name} className="person-img"></img>
							<h4>{name}</h4>
							<p className="title">{title}</p>
							<p className="text">{quote}</p>
							<FaQuoteRight className="icon" />
						</article>
					);
				})}
				<button className="prev" onClick={() => setIndex(index - 1)}>
					<FiChevronLeft />
				</button>
				<button className="next" onClick={() => setIndex(index + 1)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	);
}

export default App;
