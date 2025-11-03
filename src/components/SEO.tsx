import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath }) => {
  const location = useLocation();

  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    const base = (import.meta as any).env?.VITE_SITE_URL || window.location.origin;
    const path = canonicalPath || location.pathname;
    link.href = `${base}${path}`;
  }, [title, description, canonicalPath, location.pathname]);

  return null;
};

export default SEO;
