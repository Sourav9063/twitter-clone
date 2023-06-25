const { useEffect, useRef, useState } = require("react");

const useIsImgLoading = () => {
  const ref = useRef();
  const [isImgLoading, setIsImgLoading] = useState();
  useEffect(() => {
    if (ref.current) {
      setIsImgLoading(
        ref.current?.complete && ref.current?.naturalHeight !== 0
      );
    }
    return () => {};
  }, [ref]);

  return [isImgLoading, ref.current, ref.current?.naturalHeight];
};

export default useIsImgLoading;
