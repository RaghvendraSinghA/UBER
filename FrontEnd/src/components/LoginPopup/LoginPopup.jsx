import "./LoginPopup.css"
import {useState,useContext} from 'react'
import {assets} from '../../assets/assets.js'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'

const LoginPopup =({setShowLogin})=>{
    const {url,setToken}=useContext(StoreContext)
    const [currState,setCurrState]=useState("Sign up")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value

        setData(prev=>({...prev,[name]:value}))
    }
   
    const onLogin=async(e)=>{
        e.preventDefault()
        console.log(url)
        let newUrl=url;
        console.log(newUrl,url)
        if(currState==="Login"){
            newUrl +="/api/user/login"
        }else{
            newUrl +="/api/user/register"
        }
        const response=await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }

    }

    return(
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder="Your name" required/>}

                    <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Your e-mail" required/>
                    <input onChange={onChangeHandler} name="password" value={data.password} type="password" placeholder="Your password" required/>
                </div> 
                    <button type="submit" >{currState==="Sign up"?"Create-account":"Login"}</button>
                    {currState==="Login"?<></>:<div className="login-popup-condition">
                        <input type="checkbox" required/>
                        <p>I agree of all terms and condtions of UBER</p>
                    </div>}
                    {currState==="Login"?<p>Create a new account?<span onClick={()=>setCurrState('Sign up')} >Click here!</span></p>:
                    <p>Already Have an account? <span onClick={()=>setCurrState('Login')}>Login</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup