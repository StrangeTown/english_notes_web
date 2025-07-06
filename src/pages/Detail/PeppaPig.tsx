import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { EpisodeItem } from "../../types";
import Sentence from "./Sentence";
import Watermarks from "./Watermarks";
import Header from "./Header";
// import PracticeSection from "./Parctice";
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
		const lowerText = text.toLowerCase();
		points.forEach((pt, i) => {
			const ptEnLower = pt.en.toLowerCase();
			const ptIdx = lowerText.indexOf(ptEnLower, lastIdx);
			if (ptIdx !== -1) {
				if (ptIdx > lastIdx) result.push(text.slice(lastIdx, ptIdx));
				result.push(
					<span
						key={"point-" + i}
						style={{
							display: 'inline-block',
							position: 'relative',
							verticalAlign: 'baseline',
							fontFamily: '"Comic Neue", "Comic Sans MS", cursive, sans-serif',
							padding: '0 1px',
							lineHeight: 1.7,
						}}
					>
						<span style={{ position: 'relative', zIndex: 1 }}>{pt.en}</span>
						<svg
							width="100%"
							height="6"
							viewBox={`0 0 ${pt.en.length * 10} 6`}
							preserveAspectRatio="none"
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: '0.13em',
								zIndex: 0,
								pointerEvents: 'none',
							}}
						>
							<path
								d={`M2,5 Q${pt.en.length * 2},4 ${pt.en.length * 4},5 Q${pt.en.length * 6},6 ${pt.en.length * 8},5 Q${pt.en.length * 9.2},4 ${pt.en.length * 9.8},5`}
								stroke="#4f8cff" // lighter blue
								strokeWidth="2.2"
								fill="none"
								style={{ filter: 'blur(0.2px)' }}
							/>
						</svg>
					</span>
				);
				lastIdx = ptIdx + pt.en.length;
			}
		});
		if (lastIdx < text.length) result.push(text.slice(lastIdx));
		return result;
	};

	if (!part) return highlightPoints(full);
	const idx = full.toLowerCase().indexOf(part.toLowerCase());
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
function renderChineseWithPoints(item: EpisodeItem) {
	if (!item.points || item.points.length === 0) return item.cn;
	const result: React.ReactNode[] = [];
	const text = item.cn;
	let lastIdx = 0;
	const lowerText = text.toLowerCase();
	item.points.forEach((pt, i) => {
		const ptCnLower = pt.cn.toLowerCase();
		const ptIdx = lowerText.indexOf(ptCnLower, lastIdx);
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
	const { episode } = useParams();

	// Dynamically import the episode data based on the param
	const [episodeData, setEpisodeData] = React.useState<EpisodeItem[]>([]);

	useEffect(() => {
		const loadEpisode = async () => {
			try {
				let data;
				if (episode) {
					const paddedEpisode = episode.padStart(2, "0");
					data = await import(`../../data/Peppa Pig/S01/E${paddedEpisode}.json`);
				} else {
					data = await import("../../data/Peppa Pig/S01/E01.json");
				}
				setEpisodeData(data.default || data);
			} catch (error) {
				console.error("Failed to load episode data:", error);
			}
		};
		loadEpisode();
	}, [episode]);

	useEffect(() => {
		console.log("Episode Data:", episodeData);
	}, [episodeData]);

	// const practiceItems = episodeData.filter((item) => item.sentence);

	return (
		<div>
			<Header />

			<div className="flex flex-col">
				{episodeData.map((item, idx) => (
					<div
						key={idx}
						className="pl-6 bg-white rounded text-left flex flex-row justify-between items-stretch border-b border-gray-200 last:border-b-0 no-break"
					>
						{/* Main */}
						<div className="py-6">
							<div className="mb-2 text-dark" style={{ fontFamily: '"Comic Neue", "Comic Sans MS", cursive, sans-serif' }}>
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
