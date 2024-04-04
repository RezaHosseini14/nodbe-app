import { useState } from 'react';

const useRoleCheck = (allRoles, targetRole) => {
    const [roles, setRoles] = useState(allRoles);

    const checkRole = () => {
        return roles.includes(targetRole);
    };

    const setRole = (newRole) => {
        setRoles([...roles, newRole]);
    };

    return { checkRole, setRole };
};

export default useRoleCheck;