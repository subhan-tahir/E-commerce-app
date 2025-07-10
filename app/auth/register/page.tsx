
import RegisterForm from "../register/RegisterForm";
import RegisterRightBg from "./RegisterRightBg";
export default function RegisterPage() {

    return (
       <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-2  ">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden p-2">
                {/* Left: Form */}
                <div className="flex-1 flex flex-col justify-center  py-16 px-16">
                    <div className="mb-8">
                        <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            Finnger
                        </span>
                        <h2 className="text-4xl font-bold mb-2">Holla, <br />Welcome Back</h2>
                        <p className="text-muted-foreground mb-8">Hey, welcome back to your special place</p>
                    </div>
                    <RegisterForm />
                </div>
                {/* Right: Illustration */}
                <div className="hidden md:flex flex-1   relative min-w-1/2">
                   <RegisterRightBg />
                </div>
            </div>
        </div>
    );
}