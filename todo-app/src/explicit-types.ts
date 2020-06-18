import React from 'react';

export interface NullProps {}
export interface NullState {}

export interface RouteProps {
    setNavTitle: (title: string) => void,
    setMenu: (menu: React.ReactNode) => void
}