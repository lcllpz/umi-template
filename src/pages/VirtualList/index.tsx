import React, { useState, useMemo } from "react";
import { VirtualList } from "./components/VirtualList";
import "./index.css";
// 生成随机长度的文本来模拟不定高的列表项
const generateRandomText = () => {
  const texts = [
    "这是一个短文本。",
    "这是一段中等长度的文本。在实际业务中，列表项的高度往往是不固定的，因为内容的长短不一。",
    "这是一段非常长的文本。虚拟滚动的核心思想是只渲染可视区域内的 DOM 节点，从而大幅提升长列表的渲染性能。对于不定高的虚拟滚动，我们需要先给出一个预估高度（estimatedItemHeight），然后在列表项渲染到页面上之后，获取其真实的 DOM 高度，并更新我们缓存的位置信息（positions）。这样就能保证滚动条的准确性和滚动的平滑度。",
    "React 虚拟滚动实现不定高列表。",
    "React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。React 虚拟滚动实现不定高列表。",
    "前端性能优化：长列表渲染方案。除了虚拟滚动，还有时间分片等方案，但虚拟滚动是解决长列表 DOM 节点过多导致卡顿的最有效手段。",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

export default function Index() {
  const [itemCount, setItemCount] = useState(10000);

  // 生成测试数据
  const listData = useMemo(() => {
    return Array.from({ length: itemCount }).map((_, index) => ({
      id: index,
      title: `列表项 ${index + 1}`,
      content: generateRandomText(),
      // 随机生成一些图片来进一步增加高度的不确定性
      hasImage: Math.random() > 0.8,
    }));
  }, [itemCount]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[80vh]">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800">
            不定高虚拟滚动 (Dynamic Height Virtual List)
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            当前列表项数量:{" "}
            <span className="font-semibold text-blue-600">{itemCount}</span> 条
          </p>
        </div>

        {/* 虚拟滚动容器 */}
        <VirtualList
          className="flex-1 w-full"
          listData={listData}
          estimatedItemHeight={100} // 预估高度
          bufferScale={1} // 缓冲区比例
          renderItem={(item) => (
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {item.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                  {item.hasImage && (
                    <div className="mt-3 w-full h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 flex items-center justify-center text-blue-400 text-sm">
                      [模拟图片区域]
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
