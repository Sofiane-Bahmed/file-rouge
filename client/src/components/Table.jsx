import React from 'react';
import { MdCheckCircle, MdChat, MdCall, MdAssignment } from 'react-icons/md';

const Table = ({ mentor }) => {
    const tableItems = [
        {
            label: "Tasks Support",
            icon: <MdAssignment className="text-xl text-[#007749]" />,
            status: "Included"
        },
        {
            label: "1-on-1 Calls",
            icon: <MdCall className="text-xl text-[#007749]" />,
            status: "2 calls / month"
        },
        {
            label: "Unlimited Chat",
            icon: <MdChat className="text-xl text-[#007749]" />,
            status: "Included"
        }
    ];

    return (
        <div className="w-full">
            <div className="overflow-hidden border border-gray-100 rounded-xl">
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Monthly Plan</span>
                    <span className="text-xl font-extrabold text-[#007749]">{mentor?.price}$<span className="text-xs font-normal text-gray-500 ml-1">/ month</span></span>
                </div>
                <div className="divide-y divide-gray-50">
                    {tableItems.map((item, idx) => (
                        <div key={idx} className="px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50/30 transition-colors">
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-gray-700 font-medium">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#007749] font-bold text-sm">
                                <MdCheckCircle />
                                <span>{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 italic px-2 text-center">
                * All services are subject to mentor availability and program terms.
            </p>
        </div>
    );
};

export default Table;