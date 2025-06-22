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
		return <div className="bg-gray-200 p-2 w-[240px] flex flex-col justify-center" />;
	}
	return (
		<div className="bg-gray-200 p-2 w-[240px] flex flex-col justify-center flex-shrink-0 ml-4">
			{sentence.examples && Array.isArray(sentence.examples) && (
				<div className="text-xs text-gray-600 flex flex-col gap-1">
					{sentence.examples.map((ex, eIdx) => (
						<div key={eIdx}>
							<span>{ex.cn}</span>
							<div className="text-gray-400">{ex.en}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Sentence;
