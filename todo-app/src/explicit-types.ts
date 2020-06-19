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