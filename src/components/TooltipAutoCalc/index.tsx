import { useRef } from "react";
import styles from "./tooltip.module.scss";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

type Position = "top" | "bottom" | "left" | "right";

const TooltipAutoCalc = ({ children, content }: TooltipProps) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const calculatePosition = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();

    console.log(targetRect);

    const spacing = 10;
    let position: Position;
    let top: number = 0;
    let left: number = 0;

    // Calculate available space in each direction
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = window.innerWidth - targetRect.right;

    // Check if tooltip would overflow horizontally for top and bottom
    const wouldOverflowLeft =
      targetRect.left + (targetRect.width - tooltipRect.width) / 2 < 0;
    const wouldOverflowRight =
      targetRect.right + (tooltipRect.width - targetRect.width) / 2 >
      window.innerWidth;

    // Calculate tooltip placement and position
    if (
      spaceAbove > tooltipRect.height + spacing &&
      !wouldOverflowLeft &&
      !wouldOverflowRight
    ) {
      position = "top";
      top = -tooltipRect.height - spacing;
      left = (targetRect.width - tooltipRect.width) / 2;
    } else if (
      spaceBelow > tooltipRect.height + spacing &&
      !wouldOverflowLeft &&
      !wouldOverflowRight
    ) {
      position = "bottom";
      top = targetRect.height + spacing;
      left = (targetRect.width - tooltipRect.width) / 2;
    } else if (spaceLeft > tooltipRect.width + spacing) {
      position = "left";
      top = (targetRect.height - tooltipRect.height) / 2;
      left = -tooltipRect.width - 2 * spacing;
    } else {
      if (spaceRight > tooltipRect.width + spacing) {
        position = "right";
        top = (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.width + spacing;
      } else {
        position = "top";
        top = -tooltipRect.height - spacing;
        left = (targetRect.width - tooltipRect.width) / 2;
      }
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Classes update
    tooltip.classList.remove(styles["fade-out"]);
    tooltip.classList.add(styles["fade-in"]);

    tooltip.classList.remove(
      styles["arrow-top"],
      styles["arrow-bottom"],
      styles["arrow-left"],
      styles["arrow-right"]
    );
    tooltip.classList.add(styles[`arrow-${position}`]);
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.remove(styles["fade-in"]);
      tooltipRef.current.classList.add(styles["fade-out"]);
    }
  };

  return (
    <span
      className={styles["tooltip-container"]}
      onMouseEnter={calculatePosition}
      onMouseMove={calculatePosition}
      onMouseLeave={hideTooltip}
    >
      {children}
      <span
        ref={tooltipRef}
        data-testid="tooltip"
        className={`${styles.tooltip} ${styles["fade-out"]}`}
      >
        {content}
      </span>
    </span>
  );
};

export default TooltipAutoCalc;
