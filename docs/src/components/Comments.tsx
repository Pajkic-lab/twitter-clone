import Giscus from '@giscus/react';
import React from 'react';

export default function MyApp() {
  return (
    <Giscus
      id="comments"
      repo="Pajkic-lab/twitter-clone"
      repoId="R_kgDOIMtfpg"
      category="docs comments"
      categoryId="DIC_kwDOIMtfps4Cwl0M"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="dark_dimmed"
      lang="en"
      loading="lazy"
    />
  );
}
