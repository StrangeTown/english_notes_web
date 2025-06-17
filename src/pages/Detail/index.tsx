import React, { useEffect } from "react";
import episodeData from "../../data/Peppa Pig/S01/E02.json";
import Sentence from "./Sentence";
import Watermarks from "./Watermarks";
import Header from "./Header";
import PracticeSection from "./Parctice";
import "./no-break.css";

const highlightPart = (
	full: string,
	part?: string,
	points?: { en: string; cn: string }[]
) => {
	// If no part, just highlight points in the whole sentence
	const highlightPoints = (text: string) => {
		if (!points || points.length === 0) return text;
		const result: React.ReactNode[] = [];
		let lastIdx = 0;
		points.forEach((pt, i) => {
			const ptIdx = text.indexOf(pt.en, lastIdx);
			if (ptIdx !== -1) {
				if (ptIdx > lastIdx) result.push(text.slice(lastIdx, ptIdx));
				result.push(
					<span
						key={"point-" + i}
						className="underline decoration-blue-500 underline-offset-2"
					>
						{pt.en}
					</span>
				);
				lastIdx = ptIdx + pt.en.length;
			}
		});
		if (lastIdx < text.length) result.push(text.slice(lastIdx));
		return result;
	};

	if (!part) return highlightPoints(full);
	const idx = full.indexOf(part);
	if (idx === -1) return highlightPoints(full);
	const before = full.slice(0, idx);
	const after = full.slice(idx + part.length);

	return (
		<>
			{highlightPoints(before)}
			<span
				className="bg-[#ccdf8c] px-1 rounded-sm"
				style={{
					background: "#ccdf8c",
					display: "inline",
					borderRadius: "6px 12px 8px 14px/12px 8px 14px 6px",
					boxShadow: "0 2px 6px 0 rgba(204,223,140,0.15)",
					padding: "0 2px",
					fontFamily: "inherit",
				}}
			>
				{part}
			</span>
			{highlightPoints(after)}
		</>
	);
};

// Helper to render Chinese line with underlined points
function renderChineseWithPoints(item: (typeof episodeData)[number]) {
	if (!item.points || item.points.length === 0) return item.cn;
	const result: React.ReactNode[] = [];
	const text = item.cn;
	let lastIdx = 0;
	item.points.forEach((pt, i) => {
		const ptIdx = text.indexOf(pt.cn, lastIdx);
		if (ptIdx !== -1) {
			if (ptIdx > lastIdx) result.push(text.slice(lastIdx, ptIdx));
			result.push(
				<span
					key={"point-cn-" + i}
					className="underline decoration-blue-200 underline-offset-2"
				>
					{pt.cn}
				</span>
			);
			lastIdx = ptIdx + pt.cn.length;
		}
	});
	if (lastIdx < text.length) result.push(text.slice(lastIdx));
	return result;
}

const Detail: React.FC = () => {
	useEffect(() => {
		console.log("Episode Data:", episodeData);
	}, []);

	const practiceItems = episodeData.filter((item) => item.sentence);

	return (
		<div>
			<Header />

			<div className="flex flex-col">
				{episodeData.map((item, idx) => (
					<div
						key={idx}
						className="pl-6 bg-white rounded text-left flex flex-row justify-between items-center border-b border-gray-200 last:border-b-0 h-[116px] no-break"
					>
						{/* Main */}
						<div>
							<div className="mb-2 text-dark">
								{highlightPart(
									item.en,
									item.sentence && item.sentence.en,
									item.points
								)}
							</div>
							<div className="text-gray-400 text-xs">
								{renderChineseWithPoints(item)}
							</div>
						</div>

						{/* Sentence Section */}
						<Sentence
							sentence={
								item.sentence
									? {
											en: item.sentence.en,
											cn:
												typeof item.sentence.cn === "string"
													? item.sentence.cn
													: "",
											examples: item.sentence.examples ?? [],
									  }
									: { en: "", cn: "", examples: [] }
							}
						/>
					</div>
				))}
			</div>

			{/* <PracticeSection practiceItems={practiceItems} /> */}

			{/* Watermarks */}
			<Watermarks />
		</div>
	);
};

export default Detail;
