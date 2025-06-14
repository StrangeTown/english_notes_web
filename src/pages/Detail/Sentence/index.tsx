import React from "react";

interface Example {
	en: string;
	cn: string;
}

interface SentenceProps {
	sentence: {
		en: string;
		cn: string;
		examples?: Example[];
	};
}

const Sentence: React.FC<SentenceProps> = ({ sentence }) => {
	if (!sentence) {
		return <div className="bg-gray-100 p-2 w-[240px] h-full flex flex-col justify-center" />;
	}
	return (
		<div className="bg-gray-100 p-2 w-[240px] h-full flex flex-col justify-center">
			{sentence.examples && Array.isArray(sentence.examples) && (
				<div className="text-xs text-gray-600 flex flex-col gap-1">
					{sentence.examples.map((ex, eIdx) => (
						<div key={eIdx}>
							<strong>{ex.cn}</strong>
							<div className="text-gray-400">{ex.en}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Sentence;
