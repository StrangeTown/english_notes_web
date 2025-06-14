import React, { useEffect } from "react";
import episodeData from "../../data/Peppa Pig/S01/E01.json";
import Sentence from "./Sentence";

const highlightPart = (full: string, part?: string) => {
	if (!part) return full;
	const idx = full.indexOf(part);
	if (idx === -1) return full;
	return (
		<>
			{full.slice(0, idx)}
			<span className="bg-yellow-200 font-bold">{part}</span>
			{full.slice(idx + part.length)}
		</>
	);
};

const Detail: React.FC = () => {
	useEffect(() => {
		console.log("Episode Data:", episodeData);
	}, []);

	return (
		<div>
			<div className="flex flex-col">
				{episodeData.map((item, idx) => (
					<div
						key={idx}
						className="pl-6 bg-white rounded text-left flex flex-row justify-between items-center border-b border-gray-200 last:border-b-0 h-[116px]"
					>
						{/* Main */}
						<div>
							<div className="mb-2">
								{highlightPart(item.en, item.sentence && item.sentence.en)}
							</div>
							<div className="text-gray-400">{item.cn}</div>
						</div>

						{/* Sentence Section */}
						<Sentence sentence={item.sentence} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Detail;
