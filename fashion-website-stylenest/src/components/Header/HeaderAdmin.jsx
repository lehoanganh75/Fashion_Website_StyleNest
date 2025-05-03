import React from 'react'

const HeaderAdmin = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-300">
        {/* Menu button */}
        <button className="flex items-center justify-center p-1 border border-gray-200 rounded-sm transition h-10 w-10">
            <i className="bx bx-menu text-2xl text-gray-600"></i>
        </button>

        {/* Search bar */}
        <div className="relative w-full max-w-lg mx-4">
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
                <i className="bx bx-search-alt text-gray-500 text-xl mr-2"></i>
                <input
                    type="text"
                    placeholder="Search or type command..."
                    className="w-full bg-transparent outline-none text-sm"
                />
                <div className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-1.5 rounded">
                    ⌘K
                </div>
            </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full transition">
                <i className="bx bx-moon text-xl text-gray-600"></i>
            </button>

            {/* Notification */}
            <button className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-full relative transition">
                <i className="bx bx-bell text-xl text-gray-600"></i>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                    <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                    />
                </div>
                <span className="font-medium text-gray-800">Admin</span>
                <i className="bx bxs-chevron-down text-gray-600 text-xl"></i>
            </div>
        </div>
    </header>
  )
}

export default HeaderAdmin
