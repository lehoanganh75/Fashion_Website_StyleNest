"use client"

import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true)

  const switchToLogin = () => setIsLoginView(true)
  const switchToRegister = () => setIsLoginView(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 font-sans">
        <div className="bg-white rounded-lg p-8 w-[65%] relative shadow-2xl border border-gray-100 cursor-pointer">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                <i className="bx bx-x text-3xl"></i>
            </button>

            {isLoginView ? (
                <LoginForm onSwitchToRegister={switchToRegister} />
                ) : (
                <RegisterForm onSwitchToLogin={switchToLogin} />
            )}
        </div>
    </div>
  )
}

export default LoginModal
