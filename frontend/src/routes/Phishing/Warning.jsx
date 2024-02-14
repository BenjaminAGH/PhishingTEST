const Warning = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center text-white">
            <div className="max-w-md p-8 bg-red-600 rounded-lg shadow-xl text-center">
            <h1 className="text-3xl font-bold mb-4">¡Atención!</h1>
            <p className="text-lg mb-6">Tus datos han sido robados.</p>
            <p className="text-lg mb-6">Por favor, póngase en contacto con nuestro equipo de asistencia lo antes posible.</p>
            <button className="bg-white text-red-600 hover:bg-red-700 hover:text-white py-2 px-4 rounded-lg font-semibold transition duration-300 ease-in-out">Contactar Asistencia</button>
            </div>
        </div>
    );
}

export default Warning;
