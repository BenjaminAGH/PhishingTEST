import { Link } from 'react-router-dom';
import { getMail } from "../../services/mail.service";
import { useState, useEffect } from "react";

const Mail = () => {
    const [mails, setMail] = useState([]);

    useEffect(() => {
        getMail().then((response)=>{
            setMail(response);
        });
        console.log(mails);        
    }, [])

    return (
        <>
            <div className='flex min-h-screen flex-col items-center justify-center p-24'>
                <h2 className='text-3xl font-bold'>Historial de Ataques</h2>
                <ul>
                    {mails.map((mail) => (
                        <div>
                            <Link to={`/mail`}>
                                <p className='font-bold text-2xl'>{mail.name}</p>
                                <p className='text-base'>𝐎𝐛𝐣𝐞𝐭𝐢𝐯𝐨: {mail.email}</p>
                                <p className='text-sm'>𝐑𝐞𝐦𝐢𝐭𝐞𝐧𝐭𝐞: {mail.from} 𝐌𝐨𝐭𝐢𝐯𝐨: {mail.subject}</p> 
                                <p className='text-xs text-justify text-gray-500'>{mail.html}</p>
                            </Link>
                            <div className='my-5'/>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Mail;