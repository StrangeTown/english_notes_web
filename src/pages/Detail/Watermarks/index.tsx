
import { useLocation } from "react-router-dom";
import gillWatermark from "../../../assets/images/gill.png";
import dinoWatermark from "../../../assets/images/dino.png";

const routes = [
	{
		name: "/finding-nemo",
		watermarkImg: gillWatermark,
	},
	{
		name: "/peppa-pig",
		watermarkImg: dinoWatermark,
	},
];

const watermarkConfigs = [
	{
		positionClass: "bottom-8 left-36 rotate-12",
		style: undefined,
	},
	{
		positionClass: "top-60 left-8 -rotate-6",
		style: undefined,
	},
	{
		positionClass: "top-1/2 left-1/2",
		style: {
			userSelect: "none",
			transform: "translate(-50%, -50%) rotate(-20deg)",
		} as React.CSSProperties,
	},
];


const Watermarks: React.FC = () => {
	const location = useLocation();
	// Find the matching route config
	const routeConfig = routes.find(r => location.pathname.startsWith(r.name)) || routes[1];
	const watermarkImg = routeConfig.watermarkImg;

	return (
		<>
			{watermarkConfigs.map((cfg, idx) => (
				<div
					key={idx}
					className={
						"pointer-events-none fixed opacity-10 select-none z-0 " + cfg.positionClass
					}
					style={cfg.style}
				>
					<img src={watermarkImg} alt="Watermark" className="w-36 h-36 object-contain" />
					<span className="block text-[10px] text-center text-gray-800" style={{ marginTop: '-18px' }}>
						整理by公众号 每日一篇英语阅读
					</span>
				</div>
			))}
		</>
	);
};

export default Watermarks;
