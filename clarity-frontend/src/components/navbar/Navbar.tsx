import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="relative z-10 flex justify-center md:justify-between items-center px-8 md:px-16 pt-1 pb-8">
            <div className="flex items-center space-x-2">
                <img src="/assets/images/claritylogo.png" alt="Clarity Logo" className="w-36 h-20" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <Link
                    to="/login"
                    className="text-clarity-slate hover:text-clarity-charcoal transition-colors duration-300 font-medium"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-clarity-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform font-medium"
                >
                    Get Started
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;