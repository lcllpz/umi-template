import React, { useState, useEffect, useRef, useMemo } from "react";

interface VirtualListProps<T> {
  listData: T[];
  estimatedItemHeight: number;
  bufferScale?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface Position {
  index: number;
  height: number;
  top: number;
  bottom: number;
}

export function VirtualList<T>({
  listData,
  estimatedItemHeight,
  bufferScale = 1,
  renderItem,
  className = "",
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. 缓存所有项的位置信息
  const positions = useRef<Position[]>([]);

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [listHeight, setListHeight] = useState(0);

  // 初始化位置缓存
  useEffect(() => {
    positions.current = listData.map((_, index) => ({
      index,
      height: estimatedItemHeight,
      top: index * estimatedItemHeight,
      bottom: (index + 1) * estimatedItemHeight,
    }));
    setListHeight(positions.current[positions.current.length - 1]?.bottom || 0);
  }, [listData, estimatedItemHeight]);

  // 监听容器高度变化
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // 二分查找获取 startIndex
  const getStartIndex = (scrollTop: number = 0) => {
    let left = 0;
    let right = positions.current.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (positions.current[mid].bottom === scrollTop) {
        return mid + 1;
      } else if (positions.current[mid].bottom < scrollTop) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  };

  // 计算可见区域的索引
  const startIndex = getStartIndex(scrollTop);
  const visibleCount = Math.ceil(containerHeight / estimatedItemHeight);

  // 添加缓冲区，避免滚动过快时出现白屏
  const start = Math.max(
    0,
    startIndex - Math.floor(visibleCount * bufferScale),
  );
  const end = Math.min(
    listData.length,
    startIndex + visibleCount + Math.floor(visibleCount * bufferScale),
  );

  const visibleData = listData.slice(start, end);

  // 列表的偏移量
  const startOffset = start >= 1 ? positions.current[start - 1].bottom : 0;

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 必须在同步代码中获取 scrollTop，因为在 requestAnimationFrame 的异步回调中
    // e.currentTarget 可能会变为 null (React 合成事件的特性)
    const currentScrollTop = e.currentTarget.scrollTop;
    requestAnimationFrame(() => {
      setScrollTop(currentScrollTop);
    });
  };

  // 更新真实高度
  const updateItemSize = React.useCallback((index: number, height: number) => {
    if (!positions.current[index]) return;
    const oldHeight = positions.current[index].height;
    const dHeight = height - oldHeight;

    if (dHeight !== 0) {
      positions.current[index].height = height;
      positions.current[index].bottom += dHeight;

      // 更新后续所有项的位置
      for (let k = index + 1; k < positions.current.length; k++) {
        positions.current[k].top = positions.current[k - 1].bottom;
        positions.current[k].bottom += dHeight;
      }

      // 更新总高度
      setListHeight(positions.current[positions.current.length - 1].bottom);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-y-auto ${className}`}
      onScroll={onScroll}
    >
      {/* 占位元素，撑开滚动条 */}
      <div style={{ height: `${listHeight}px` }} className="w-full" />

      {/* 实际渲染区域 */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{ transform: `translate3d(0, ${startOffset}px, 0)` }}
      >
        {visibleData.map((item, index) => {
          const actualIndex = start + index;
          return (
            <VirtualListItem
              key={actualIndex}
              index={actualIndex}
              updateItemSize={updateItemSize}
            >
              {renderItem(item, actualIndex)}
            </VirtualListItem>
          );
        })}
      </div>
    </div>
  );
}

// 内部组件：用于测量每个列表项的真实高度
interface VirtualListItemProps {
  index: number;
  updateItemSize: (index: number, height: number) => void;
  children: React.ReactNode;
}

function VirtualListItem({
  index,
  updateItemSize,
  children,
}: VirtualListItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    // 使用 ResizeObserver 监听高度变化（例如图片加载完成导致的高度撑开）
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height =
          entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        updateItemSize(index, height);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [index, updateItemSize]);

  return <div ref={itemRef}>{children}</div>;
}
