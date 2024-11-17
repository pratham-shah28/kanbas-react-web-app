import React from 'react';
import { useSelector } from 'react-redux';

export default function EditAccessStudents({children}: { children : any}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser.role !== 'STUDENT' && currentUser.role !== 'ADMIN') {
        return null;
    }
    return <>{children}</>;
}