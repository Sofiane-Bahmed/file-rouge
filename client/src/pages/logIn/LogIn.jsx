import React,{ useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"



const LogIn = ({setLoginUser}) => {

const [mail,setMail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

  
    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8082/users/login", {mail, password}, {withCredentials:true})
            .then(res => {
                setLoginUser(true)
                
                
                const userResponse = JSON.stringify(res.data.user )
               
                localStorage.user = userResponse
                localStorage.avatarUrl = res.data.user.avatarUrl
                navigate("/")
            })  
            .catch(error => {
                console.log(error); 
                alert(error)
            });
    };
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src={Logo} width={200} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <Link to="/signUp" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                    </div>
                </div>
                <form
                   
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            name="email"
                            onChange={(e)=>setMail(e.target.value)}
                            placeholder="your email"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            onChange={(e)=>setPassword(e.target.value)}
                            name="password"
                            placeholder="your password"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium  bg-[#AAD4C1] hover:bg-[#7EC7A6] active:bg-[#7EC7A6] rounded-lg duration-150"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    
                </form>
            </div>
        </main>
    )
}

export default LogIn