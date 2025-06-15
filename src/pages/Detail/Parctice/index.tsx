import React from "react";

interface Example {
  en: string;
  cn: string;
}

interface Sentence {
  en: string;
  cn: string;
  examples?: Example[];
}

interface PracticeItem {
  sentence?: Sentence;
}

interface PracticeSectionProps {
  practiceItems: PracticeItem[];
}

const PracticeSection: React.FC<PracticeSectionProps> = ({ practiceItems }) => (
  <div className="mt-12 mb-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
      <h2 className="text-2xl font-bold text-gray-800">Practice</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
    </div>
    <div className="grid gap-6">
      {practiceItems.map((item, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden no-break"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100 mt-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">{idx + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  {item.sentence!.cn}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.sentence!.en}
                </p>
              </div>
            </div>
          </div>

          {/* Examples Section */}
          {item.sentence!.examples && item.sentence!.examples.length > 0 && (
            <div className="px-6 py-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Examples
              </h4>
              <div className="space-y-3">
                {item.sentence!.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400"
                  >
                    <div className="font-bold text-gray-900 mb-1">
                      {ex.cn}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {ex.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    {/* Empty state */}
    {practiceItems.length === 0 && (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-gray-600 font-medium mb-2">No practice items available</h3>
        <p className="text-gray-400 text-sm">Practice items will appear here when available.</p>
      </div>
    )}
  </div>
);

export default PracticeSection;
