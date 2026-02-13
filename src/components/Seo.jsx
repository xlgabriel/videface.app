import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = React.memo(({ title, description, canonical, image, type = 'website' }) => {
    const defaultTitle = 'VideFace';
    const defaultDescription = 'Innovative virtual assistance solutions for modern businesses.';

    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            {canonical && <meta property="og:url" content={canonical} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Robots (default) */}
            <meta name="robots" content="index, follow" />
        </Helmet>
    );
});

export default Seo;