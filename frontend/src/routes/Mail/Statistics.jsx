import { getMail } from "../../services/mail.service";
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';

const Statistics = () => {
    const [mails, setMail] = useState([]);

    useEffect(() => {
        getMail().then((response)=>{
            setMail(response);
        });
    }, [])

    useEffect(() => {
        if (mails.length > 0) {
            renderCharts();
        }
    }, [mails]);

    const renderCharts = () => {
        const isOpenData = mails.reduce((acc, mail) => {
            acc[mail.isOpen ? 'Abierto' : 'No abierto'] = (acc[mail.isOpen ? 'Abierto' : 'No abierto'] || 0) + 1;
            return acc;
        }, {});

        const isHackedData = mails.reduce((acc, mail) => {
            acc[mail.isHacked ? 'Ingreso datos' : 'No Ingreso'] = (acc[mail.isHacked ? 'Ingreso datos' : 'No Ingreso'] || 0) + 1;
            return acc;
        }, {});

        const totalMails = mails.length;
        const isOpenPercentage = ((isOpenData['Abierto'] || 0) / totalMails) * 100;
        const isHackedPercentage = ((isHackedData['Ingreso datos'] || 0) / totalMails) * 100;

        const isOpenChartCtx = document.getElementById('isOpenChart').getContext('2d');
        const isHackedChartCtx = document.getElementById('isHackedChart').getContext('2d');

        new Chart(isOpenChartCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(isOpenData),
                datasets: [{
                    label: 'isOpen',
                    data: Object.values(isOpenData),
                    backgroundColor: ['#1d4ed8', '#60a5fa'],
                }]
            },
        });

        new Chart(isHackedChartCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(isHackedData),
                datasets: [{
                    label: 'isHacked',
                    data: Object.values(isHackedData),
                    backgroundColor: ['#60a5fa', '#1d4ed8'],
                }]
            },
        });

        // Update DOM for percentages and total
        document.getElementById('isOpenPercentage').innerText = isOpenPercentage.toFixed(2) + '%';
        document.getElementById('isHackedPercentage').innerText = isHackedPercentage.toFixed(2) + '%';
        document.getElementById('totalMails').innerText = totalMails;
    };

    return (
        <>
            <div className='flex min-h-screen flex-col items-center justify-center p-24'>
                <h2 className='text-3xl py-2 font-bold'>Información de la Campaña</h2>
                <h2 className='text-xl py-2 font-medium	'>Datos Generales</h2>
                <div class="relative overflow-x-auto">
                    
                <div className=" grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg col-span-2">
                    <p className="text-xl font-semibold">Total de personas</p>
                    <p className="text-4xl text-gray-500 font-medium" id="totalMails"></p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-xl font-semibold">Personas abrieron el enlace</p>
                    <p className="text-4xl text-gray-500 font-medium" id="isOpenPercentage"></p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-xl font-semibold">Personas ingresaron datos</p>
                    <p className="text-4xl text-gray-500 font-medium" id="isHackedPercentage"></p>
                </div>
                </div>
                <div class="py-4"/>
                <h2 className='text-xl py-2 text-center font-medium	'>Listado Victimas</h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Correo Objetivo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Abierto
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ingreso Datos
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ID Caso
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mails.map((mail) => (
                            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                    <p className='text-sm'> {mail.email}</p>
                                </th>
                                <td class="px-6 py-4">
                                    <p className='text-sm text-center'>{mail.isOpen ? 'Sí' : 'No'}</p>
                                </td>
                                <td class="px-6 py-4">
                                    <p className='text-sm text-center'>{mail.isHacked ? 'Sí' : 'No'}</p>
                                </td>
                                <td class="px-6 py-4">
                                <p className='text-sm'> {mail.caseId}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    </div>
                    <div class="py-4"/>
                    <h2 className='text-xl py-2 font-medium	'>Graficos Interacciones</h2>
                    <div className="flex justify-center space-x-4 w-1/3	">
                        <canvas id="isOpenChart" width="50" height="50"></canvas>
                        <canvas id="isHackedChart" width="50" height="50"></canvas>
                    </div>  
            </div>
        </>
    )
}

export default Statistics;
