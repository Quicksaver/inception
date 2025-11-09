export default function refHeightToCss(property: string) {
  return (el: HTMLElement | null) => {
    const controller = new AbortController();

    const handleHeight = () => {
      try {
        if (el) {
          const { height } = getComputedStyle(el);
          document.body.style.setProperty(`--${property}-height`, height);
        }
      }
      catch (ex) {
        document.body.style.removeProperty(`--${property}-height`);

        // eslint-disable-next-line no-console
        console.error(ex);
      }
    };

    handleHeight();

    window.addEventListener('resize', handleHeight, {
      passive: true,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      document.body.style.removeProperty(`--${property}-height`);
    };
  };
}
