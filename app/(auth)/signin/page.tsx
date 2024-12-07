import { redirect } from "next/navigation";
import { login } from "@/utils/lib";


function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="focus-within:shadow-2xl focus-within:-translate-y-1 transition-all duration-150 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">
                    Sign in
                </h1>
                <form className="flex flex-col gap-3" 
                action={
                    async (formData) => {
                        'use server';
                        await login(formData);
                        redirect('/')
                    }
                }
                >
                    <label className="flex flex-col">
                        Code:
                    </label>
                        <input name="code" type="text" placeholder="demo" className="p-2 rounded-xl border-black border-2"/>
                    <button className="p-3 rounded-xl bg-green-500 text-white hover:-translate-y-2 transition-all ease-in-out duration-150">
                        Login
                    </button>
                </form>
                
            </div>
            
        </div>
    )
}


export default SignInPage
