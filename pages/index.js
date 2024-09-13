import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const iframeRef = useRef(null);

  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeContent =
        iframe.contentDocument || iframe.contentWindow.document;
      if (iframeContent) {
        iframe.style.height = iframeContent.body.scrollHeight + "px";
      }
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = adjustIframeHeight;
    }

    // Clean-up function
    return () => {
      if (iframe) {
        iframe.onload = null;
      }
    };
  }, []);

  return (
    <div>
      <h3>Here</h3>
      <iframe
        ref={iframeRef}
        src={"https://zeeda-commento.vercel.app/product/" + productId}
        style={{ width: "100%", height: "98vh", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Home;