import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = React.memo(({ title, description, canonical }) => {
    const defaultTitle = 'VideFace';
    const defaultDescription = 'Innovative virtual assistance solutions for modern businesses.';

    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
    );
});

export default Seo;