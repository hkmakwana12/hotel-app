import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/admin/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Propery Tax </title>
      </Helmet>

      <LoginView />
    </>
  );
}
