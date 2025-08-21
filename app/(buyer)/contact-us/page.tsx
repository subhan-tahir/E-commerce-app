
import ContactForm from "./ContactForm";
import ContactLeftBg from "./ContactLeftBg";

export default function ContactUsPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-2  ">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden p-2">
                {/* Left: Form */}
                <div className="flex-1 flex flex-col justify-center  py-16 md:px-16 px-4">
                    <div className="mb-8">
                        <div className="flex items-center space-x-2">

                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                            <span className="text-xl font-bold text-gray-900">EStore</span>
                        </div>
                        <p className="text-muted-foreground mb-8">Hey, welcome back to your special place</p>
                        <h2 className="text-4xl font-bold mb-2">Get in touch with us</h2>
                    </div>
                    <ContactForm />
                </div>
                {/* Right: Illustration */}
                <div className="hidden md:flex flex-1   relative min-w-1/2">
                    <ContactLeftBg />
                </div>
            </div>
        </div>
    );
}
