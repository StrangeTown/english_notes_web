import React from "react";
import dinoWatermark from "../../../assets/images/dino.png";

const watermarkConfigs = [
	{
		positionClass: "bottom-8 left-36 rotate-12",
		style: undefined,
	},
	{
		positionClass: "top-56 left-8 -rotate-6",
		style: undefined,
	},
	{
		positionClass: "top-1/2 left-2/3",
		style: {
			userSelect: "none",
			transform: "translate(-50%, -50%) rotate(-20deg)",
		} as React.CSSProperties,
	},
];

const Watermarks: React.FC = () => (
	<>
		{watermarkConfigs.map((cfg, idx) => (
			<div
				key={idx}
				className={
					"pointer-events-none fixed opacity-10 select-none z-0 " + cfg.positionClass
				}
				style={cfg.style}
			>
				<img src={dinoWatermark} alt="Watermark Dino" className="w-36 h-36" />
				<span className="block text-[10px] text-center text-gray-500" style={{ marginTop: '-18px' }}>
					整理by公众号 每日一篇英语阅读
				</span>
			</div>
		))}
	</>
);

export default Watermarks;
