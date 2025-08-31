import React, { Suspense } from "react";

function PageLoader({ component: Component, skeleton }) {
  return (
    <Suspense fallback={skeleton}>
      <Component />
    </Suspense>
  );
}

export default PageLoader;
