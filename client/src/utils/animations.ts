// Animation utilities for smooth transitions

type AnimationProps = {
  duration?: number;
  delay?: number;
  easing?: string;
};

// Default animation properties
const defaultProps: AnimationProps = {
  duration: 300,
  delay: 0,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
};

// Function to generate CSS transition string
export const createTransition = (
  properties: string[] = ["all"],
  {
    duration = 300,
    delay = 0,
    easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  }: AnimationProps = defaultProps
): string => {
  return properties
    .map((property) => `${property} ${duration}ms ${easing} ${delay}ms`)
    .join(", ");
};

// Fade in animation
export const fadeIn = (
  element: HTMLElement,
  { duration = 300, delay = 0 }: AnimationProps = defaultProps
): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = "0";
    element.style.transition = createTransition(["opacity"], {
      duration,
      delay,
    });

    // Force browser reflow
    void element.offsetWidth;

    element.style.opacity = "1";

    setTimeout(() => {
      resolve();
    }, duration + delay);
  });
};

// Fade out animation
export const fadeOut = (
  element: HTMLElement,
  { duration = 300, delay = 0 }: AnimationProps = defaultProps
): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = "1";
    element.style.transition = createTransition(["opacity"], {
      duration,
      delay,
    });

    // Force browser reflow
    void element.offsetWidth;

    element.style.opacity = "0";

    setTimeout(() => {
      resolve();
    }, duration + delay);
  });
};

// Slide in animation
export const slideIn = (
  element: HTMLElement,
  direction: "up" | "down" | "left" | "right" = "up",
  { duration = 400, delay = 0 }: AnimationProps = defaultProps
): Promise<void> => {
  return new Promise((resolve) => {
    const directionMap = {
      up: "translateY(20px)",
      down: "translateY(-20px)",
      left: "translateX(20px)",
      right: "translateX(-20px)",
    };

    element.style.opacity = "0";
    element.style.transform = directionMap[direction];
    element.style.transition = createTransition(["opacity", "transform"], {
      duration,
      delay,
    });

    // Force browser reflow
    void element.offsetWidth;

    element.style.opacity = "1";
    element.style.transform = "translate(0)";

    setTimeout(() => {
      resolve();
    }, duration + delay);
  });
};

// Scale in animation
export const scaleIn = (
  element: HTMLElement,
  { duration = 300, delay = 0 }: AnimationProps = defaultProps
): Promise<void> => {
  return new Promise((resolve) => {
    element.style.opacity = "0";
    element.style.transform = "scale(0.95)";
    element.style.transition = createTransition(["opacity", "transform"], {
      duration,
      delay,
    });

    // Force browser reflow
    void element.offsetWidth;

    element.style.opacity = "1";
    element.style.transform = "scale(1)";

    setTimeout(() => {
      resolve();
    }, duration + delay);
  });
};

// Add staggered animation to a list of elements
export const staggerElements = (
  elements: HTMLElement[],
  animationFn: (element: HTMLElement, props: AnimationProps) => Promise<void>,
  {
    duration = 300,
    delay = 0,
    stagger = 50,
  }: AnimationProps & { stagger?: number } = { ...defaultProps, stagger: 50 }
): Promise<void> => {
  const promises = elements.map((element, index) => {
    return animationFn(element, {
      duration,
      delay: delay + index * stagger,
    });
  });

  return Promise.all(promises).then(() => undefined);
};
