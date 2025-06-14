import React, { useEffect } from "react";
import episodeData from "../../data/Peppa Pig/S01/E01.json";
import Sentence from "./Sentence";
import headerImagePeppaPig from "../../assets/images/header.png";
import Watermarks from './Watermarks';

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
					background: '#ccdf8c',
					display: 'inline',
					borderRadius: '6px 12px 8px 14px/12px 8px 14px 6px',
					boxShadow: '0 2px 6px 0 rgba(204,223,140,0.15)',
					padding: '0 2px',
					fontFamily: 'inherit',
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

	return (
		<div>
			{/* Header Image */}
			<div className="relative w-full mb-4">
				<img
					src={headerImagePeppaPig}
					alt="Peppa Pig Sky"
					className="w-full max-h-56 object-cover rounded-tl-2xl rounded-tr-2xl"
				/>
				<div
					className="pointer-events-none absolute left-0 right-0 bottom-0 h-[50%]"
					style={{
						background:
							'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
						borderTopLeftRadius: '1rem',
						borderTopRightRadius: '1rem',
					}}
				/>
			</div>

			<div className="flex flex-col">
				{episodeData.map((item, idx) => (
					<div
						key={idx}
						className="pl-6 bg-white rounded text-left flex flex-row justify-between items-center border-b border-gray-100 last:border-b-0 h-[116px]"
					>
						{/* Main */}
						<div>
							<div className="mb-2">
								{highlightPart(
									item.en,
									item.sentence && item.sentence.en,
									item.points
								)}
							</div>
							<div className="text-gray-400">
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

			{/* Watermarks */}
			<Watermarks />
		</div>
	);
};

export default Detail;
