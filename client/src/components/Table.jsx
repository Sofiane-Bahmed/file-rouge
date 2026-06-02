const  Table= ({mentor})=> {

    const tableItems = [
        {
            
            Tasks: "include",
            Calls: "include",
             Chat: "include"
        },
       
    ]

    return (
        <div className="max-w-screen-xl  px-4 md:px-8">
                
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-[#aad4c1] opacity-80 text-white font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">price</th>
                            <th className="py-3 px-6">Tasks</th>
                            <th className="py-3 px-6">Calls</th>
                            <th className="py-3 px-6">Chat</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{mentor?.price}$/month</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Tasks}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Calls}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.Chat}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Table