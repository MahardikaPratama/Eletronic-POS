import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/user.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../index.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Load saved email and password from localStorage on component mount
    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");
        const savedRememberMe = localStorage.getItem("rememberMe") === "true";

        if (savedRememberMe) {
            setEmail(savedEmail || "");
            setPassword(savedPassword || "");
            setRememberMe(savedRememberMe);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate login
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setError("");

            // Save email and password if Remember Me is checked
            if (rememberMe) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("rememberMe", true);
            } else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                localStorage.setItem("rememberMe", false);
            }

            // Navigate to dashboard
            navigate("/dashboard");
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <header className="w-full mb-8 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-4xl font-bold text-gray-950">Bubun Elektronik 1.0.0</h1>
                </div>
            </header>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-gray-950">Login</h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            {/* Input Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-950"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                                />
                            </div>

                            {/* Input Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-950"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Your password"
                                        className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-400"
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="ml-2 text-sm text-gray-950"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
