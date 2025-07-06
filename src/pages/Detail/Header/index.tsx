import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import headerImagePeppaPig from "../../../assets/images/header.png";
import metaData from "../../../data/Peppa Pig/S01/meta.json";

const Header: React.FC = () => {
	const { episode } = useParams();
	const [episodeTitle, setEpisodeTitle] = useState<string>("");

	useEffect(() => {
		if (episode) {
			const episodeIndex = parseInt(episode) - 1;
			if (episodeIndex >= 0 && episodeIndex < metaData.length) {
				setEpisodeTitle(metaData[episodeIndex].title);
			}
		}
	}, [episode]);

	return (
		<div className="relative w-full mb-4">
			<img
				src={headerImagePeppaPig}
				alt="Peppa Pig Sky"
				className="w-full max-h-56 object-cover rounded-tl-2xl rounded-tr-2xl"
			/>
			{episodeTitle && (
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
