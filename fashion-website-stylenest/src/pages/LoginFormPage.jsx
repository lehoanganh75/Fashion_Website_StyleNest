import React, { useState } from 'react';
import LoginModal from '../components/Login/LoginModal';

const LoginFormPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LoginFormPage;
