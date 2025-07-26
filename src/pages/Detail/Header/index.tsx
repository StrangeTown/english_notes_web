import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import headerImagePeppaPig from "../../../assets/images/header.png";
import headerFindingNemo from "../../../assets/images/header_finding_nemo.png";
import metaData from "../../../data/Peppa Pig/S01/meta.json";

const routes = [
	{
		name: "/finding-nemo",
		headerImg: headerFindingNemo,
		headerHeight: "h-58",
		title: "Finding Nemo",
	},
	{
		name: "/peppa-pig",
		headerImg: headerImagePeppaPig,
		headerHeight: "h-56",
		title: "Peppa Pig",
	},
];

const Header: React.FC = () => {
	const { episode } = useParams();
	const location = useLocation();
	const [episodeTitle, setEpisodeTitle] = useState<string>("");

	// Find the matching route config
	const routeConfig =
		routes.find((r) => location.pathname.startsWith(r.name)) || routes[1];
	const headerImage = routeConfig.headerImg;
	const headerHeight = routeConfig.headerHeight;
	const isNemo = routeConfig.name === "/finding-nemo";

	useEffect(() => {
		if (episode) {
			const episodeIndex = parseInt(episode) - 1;
			if (episodeIndex >= 0 && episodeIndex < metaData.length) {
				setEpisodeTitle(metaData[episodeIndex].title);
			}
		}
	}, [episode]);

	return (
		<div className={`relative w-full mb-4`}>
			<img
				src={headerImage}
				alt={routeConfig.title + " Header"}
				className={`w-full max-${headerHeight} object-cover rounded-tl-2xl rounded-tr-2xl`}
			/>
			{episodeTitle && !isNemo && (
				<div className="absolute bottom-4 left-6">
					<span className="text-white font-bold text-base">
						E{episode?.padStart(2, "0")}: {episodeTitle}
					</span>
				</div>
			)}
			{/* <div
	className="pointer-events-none absolute left-0 right-0 bottom-0 h-[50%]"
	style={{
	  background:
		'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
	  borderTopLeftRadius: '1rem',
	  borderTopRightRadius: '1rem',
	}}
  /> */}
		</div>
	);
};

export default Header;
