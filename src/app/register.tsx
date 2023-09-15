'use client'
import React, { useState, ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';


type RegistryProps = {
  children: ReactNode;
}

const StyledComponentsRegistry = ({ children }: RegistryProps) => {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>
}

export default StyledComponentsRegistry;