import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/admin/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Propery Tax </title>
      </Helmet>

      <BlogView />
    </>
  );
}
