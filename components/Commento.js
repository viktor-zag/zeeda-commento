import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Commento = ({ pageId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.commento.io/js/commento.js';
    script.async = true;
    script.setAttribute('data-page-id', pageId);
    script.setAttribute('data-no-fonts', 'true'); // Optional attribute
    script.setAttribute('data-auto-init', false);
    // script.setAttribute(
    //   'data-css-override',
    //   'https://zeeda-commento.vercel.app/style.css'
    // );
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [pageId]);

  return <div id="commento" />;
};

Commento.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default Commento;
