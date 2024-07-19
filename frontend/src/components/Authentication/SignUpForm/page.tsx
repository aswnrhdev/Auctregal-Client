import { FcGoogle } from "react-icons/fc";

export const SignUpForm = ({ formData, handleChange, onSubmit, errors, switchToLogin, handleGoogleSignUp }: { formData: any, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, switchToLogin: () => void, handleGoogleSignUp: () => void }) => (
    <div className='bg-black text-white p-4 rounded-lg'>
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm ">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter the name'
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Name is required") && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter the email'
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm ">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter the password'
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Enter the confirm password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Confirm password must be at least 6 characters long") && <p className="text-red-500 text-sm">Confirm password must be at least 6 characters long</p>}
                {errors && errors.includes("Passwords must match") && <p className="text-red-500 text-sm">Passwords must match</p>}
            </div>
            <div className="mb-4">
                {errors && <p className="text-red-500 text-sm">{errors}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  transition mt-4 mb-2"
            >
                Create account
            </button>
        </form>
        <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-blue-400 hover:text-white transition mt-4 flex justify-center gap-2"
        >
            Sign Up with Google <FcGoogle className='mt-1' />
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? <button onClick={switchToLogin} className="text-blue-500 hover:cursor-pointer">Login</button>
        </p>
    </div>
);