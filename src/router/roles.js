export const ROLE_PLAYER = 'player';
export const ROLE_CONTRIBUTOR = 'contributor';
export const ROLE_ADMIN = 'admin';

export const rolesHierarchy = {
    [ROLE_PLAYER]: [],
    [ROLE_CONTRIBUTOR]: [ROLE_PLAYER],
    [ROLE_ADMIN]: [ROLE_PLAYER, ROLE_CONTRIBUTOR],
};

