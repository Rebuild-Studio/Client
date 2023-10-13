import { useRef, useCallback, useEffect, useState } from "react";

export default function NodeGroupVM(group, padding, titleHeight, scale) {
  const children = group.children;
  const [rect, setRect] = useState({
    top: Number.MAX_SAFE_INTEGER,
    right: Number.MIN_SAFE_INTEGER,
    bottom: Number.MIN_SAFE_INTEGER,
    left: Number.MAX_SAFE_INTEGER,
  });
  const elements = useRef([]);
  const observer = useRef();

  const width = rect.right - rect.left + 2 * padding;
  const height = rect.bottom - rect.top + 2 * padding + titleHeight;
  const x = rect.left - padding;
  const y = rect.top - padding - titleHeight;

  const position = children.length === 0 ? group.position : [x, y];
  const size =
    children.length === 0 ? group.size.map((p) => p * scale) : [width, height];

  const update = useCallback(() => {
    if (!elements.current) return;
    const [tops, bottoms, rights, lefts] = Array.from({ length: 4 }, () => []);

    elements.current.forEach((element) => {
      const { m41, m42 } = new DOMMatrix(
        window.getComputedStyle(element).getPropertyValue("transform")
      );
      const { width, height } = element.getBoundingClientRect();
      tops.push(m42);
      bottoms.push(m42 + height);
      rights.push(m41 + width);
      lefts.push(m41);
    });

    setRect({
      top: Math.min(...tops),
      bottom: Math.max(...bottoms),
      right: Math.max(...rights),
      left: Math.min(...lefts),
    });
  }, [elements]);

  useEffect(() => {
    if (children.length === 0) {
      elements.current = [];
      return;
    }
    observer.current?.disconnect();
    observer.current = new MutationObserver(() => update());
    const eles = document.querySelectorAll(`[data-group="${group.uuid}"]`);
    eles.forEach((ele) => {
      observer.current.observe(ele, {
        attributes: true,
        childList: true,
      });
    });
    elements.current = eles;
    update();
    return () => observer.current.disconnect();
  }, [children, group.uuid, update]);

  useEffect(() => {
    if (elements.current.length === 0) return;
    group.setPosition([x, y]);
  }, [x, y, group]);

  useEffect(() => {
    if (elements.current.length === 0) return;
    group.setSize([width, height]);
  }, [width, height, group]);

  return { position, size };
}
