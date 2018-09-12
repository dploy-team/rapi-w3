// export interface RoleModel {
//     id: number;
//     name: string;
//     display_name: string;
//     description: string;
// }
//
// export interface PermissionModel {
//     id: number;
//     name: string;
//     group: string;
//     display_name: string;
//     description: string;
// }


export interface DataAclModel {
    roles: string[];
    perms: string[];
}


export interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export interface Permission {
    id: number;
    name: string;
    group: string;
    display_name: string;
    description: string;
}

export interface ResponseAclData {
    roles: Role[];
    permissions: Permission[];
}
