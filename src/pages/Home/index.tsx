import React from "react";
import { Link } from "react-router-dom";

const episodes = Array.from({ length: 52 }, (_, i) => {
	const num = (i + 1).toString();
	return {
		label: `Episode ${num.padStart(2, "0")}`,
		param: num,
	};
});

const findingNemoSections = Array.from({ length: 3 }, (_, i) => {
	const num = (i + 1).toString();
	return {
		label: `Section ${num}`,
		param: num,
	};
});

const Home: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
			<div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full flex flex-col items-center mb-8">
				<h1 className="text-3xl font-bold text-blue-700 mb-4">Finding Nemo</h1>
				<ul className="w-full grid grid-cols-2 gap-3 mb-4">
					{findingNemoSections.map((section) => (
						<li key={section.param}>
							<Link
								to={`/finding-nemo/${section.param}`}
								className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 text-blue-700 font-medium text-center transition-colors"
							>
								{section.label}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full flex flex-col items-center mb-8">
				<h1 className="text-3xl font-bold text-blue-700 mb-4">Peppa Pig</h1>
				<ul className="w-full grid grid-cols-2 gap-3 mb-4 h-64 overflow-y-auto">
					{episodes.map((ep) => (
						<li key={ep.param}>
							<Link
								to={`/peppa-pig/${ep.param}`}
								className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 text-blue-700 font-medium text-center transition-colors"
							>
								{ep.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
