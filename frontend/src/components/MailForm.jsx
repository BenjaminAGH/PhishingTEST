import { useForm } from "react-hook-form"
import { postMail} from "../services/mail.service"
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email } = data;
        const emailsArray = email.split(',').map(e => e.trim());

        // Iteramos sobre cada email
        emailsArray.forEach(async (email) => {
            try {
                const uniqueCaseId = uuidv4();
                await postMail({ ...data, email, caseId: uniqueCaseId, html: "Confirmación Envío", text: "Confirmación Envío"});
            } catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        });

        navigate('/');
    }

    return(
        <div className="flex flex-col items-center justify-stretch p-24">
            <div className="w-full bg-gray-50 rounded-lg shadow md:mt-1 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-2 md:space-y-1 sm:p-8">
                    <h2 className='text-2xl text-center font-bold'>Crear Nuevo Ataque</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Nombre Caso</label>
                            <input type="text" {...register('name',{
                                required: true,
                                maxLength: 20
                            })} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.name?.type === 'required' && <label className="block my-1 text-xs font-medium text-gray-500">Campo es requerido</label>}
                            {errors.name?.type === 'maxLength' && <label className="block my-1 text-xs font-medium text-gray-500">Nombre no puede superar 20 caracteres</label>}
                        </div>
                        <div className="mb-2">   
                            <label className="block mb-2 text-sm font-medium text-gray-900">De</label>
                            <input type="text" {...register('from',{
                                required: true,
                            })} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            {errors.name?.type === 'required' && <label className="block my-1 text-xs font-medium text-gray-500">Campo es requerido</label>}
                        </div>
                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="text" {...register('email',{
                                required: true,
                            })} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.email?.type === 'required' && <label className="block my-1 text-xs font-medium text-gray-500">Campo es requerido</label>}
                        </div>
                        <div className="mb-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Asunto</label>
                            <input type="text" {...register('subject',{
                                required: true,
                            })} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            {errors.name?.type === 'required' && <label className="block my-1 text-xs font-medium text-gray-500">Campo es requerido</label>}
                        </div>
                        <div className="my-1">
                            <input type="submit" value="Enviar" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}