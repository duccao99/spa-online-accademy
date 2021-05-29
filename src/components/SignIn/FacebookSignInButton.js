import React from 'react';

export default function FacebookSignInButton() {
  return (
    <div
      data-max-rows='1'
      className='fb-login-button'
      data-size='large'
      data-button-type='continue_with'
      data-layout='default'
      data-auto-logout-link='false'
      data-use-continue-as='false'
    ></div>
  );
}
