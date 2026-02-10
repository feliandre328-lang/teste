
import React from 'react';

interface UserAvatarProps {
    name: string;
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

const colors = [
    'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500',
    'bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'
];

const getColorForName = (name: string) => {
    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ name }) => {
    const bgColor = getColorForName(name);
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${bgColor}`}>
            {getInitials(name)}
        </div>
    );
};
