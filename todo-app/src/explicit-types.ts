import React from 'react';

export interface NullProps {}
export interface NullState {}

export interface RouteProps {
    setNavTitle: (title: string) => void,
    setMenu: (menu: React.ReactNode) => void,
    setDrawerMenu: (selected: DrawerMenuActions) => void
}

export type DrawerMenuActions = 'Tasks' | 'Statistics' | null;
export type TaskMenuActions = 'ALL' | 'COMPLETED' | 'UNCOMPLETED' | 'REFRESH' | 'DELETE';

export interface Task {
    id: string,
    title: string,
    description: string,
    active: boolean
}

export interface TaskViewEditParams {
    id: string
}

export enum Query {
    ALL, CHECKED, UNCHECKED, DELETE, REFRESH
}