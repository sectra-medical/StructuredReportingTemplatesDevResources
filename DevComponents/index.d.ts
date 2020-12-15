import * as React from 'react';

export interface SectraButtonGroupProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    buttonValues: string[];
    checkedButton?: string;
    onStateChange?: (buttonText: string) => void;
    justify?: boolean;
    disable?: number[];
    preventOutput?: boolean;
}

export declare class SectraButtonGroup extends React.Component<SectraButtonGroupProps, any> {
}

declare module 'sectra-button-group' {
}


export interface SectraInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    type: string;
    bsSize?: string;
    onInputChange?: (val: string) => void;
    onInputBlur?: (val: string) => void;
    preventOutput?: boolean;
}

export declare class SectraInput extends React.Component<SectraInputProps, any> {
}

declare module 'sectra-input' {
}


export interface SectraTextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
	name: string;
	onInputChange?: (val: string) => void;
	onInputBlur?: (val: string) => void;
    preventOutput?: boolean;
}

export declare class SectraTextArea extends React.Component<SectraTextAreaProps, any> {
}

declare module 'sectra-text-area' {
}


export interface SectraRowProps extends React.HTMLProps<HTMLLabelElement> {
    children?: React.ReactNode;
    labelText?: string;
    labelFor?: string;
    marginTop?: number;
    abbrTitle?: string;
}

export declare class SectraRow extends React.Component<SectraRowProps, any> {
}

declare module 'sectra-row'{
}


export interface SectraSelectProps extends React.HTMLProps<HTMLSelectElement> {
    name: string;
    optionValues: string[];
    bsSize?: string;
    keys?: string[];
	defaultOptionText?: string;
    onStateChange?: (x: string) => void;
    preventOutput?: boolean;
}

export declare class SectraSelect extends React.Component<SectraSelectProps, any> {
}

declare module 'sectra-select' {
}

export interface SectraCanvasProps extends React.HTMLProps<HTMLCanvasElement> {
    id: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    paintColor?: string;
    defaultImage?: string;
    paintType?: "Brush" | "Spray";
    onPaint?: (imgData: ImageData) => void;
    onDefaultImageLoaded?: (imgData: ImageData) => void;
}

export declare class SectraCanvas extends React.Component<SectraCanvasProps, any> {
}

declare module 'sectra-canvas' {
}

export interface SectraCheckButtonProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    value: string;
    checked?: boolean;
    onStateChange?: (x: boolean) => void;
    partOfGroup?: boolean;
    preventOutput?: boolean;
    buttonStyle?: boolean;
}


export interface SectraToggleButtonProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    disabled?: boolean;
    preventOutput?: boolean;
}

export declare class SectraCheckButton extends React.Component<SectraCheckButtonProps, any> {
}

declare module 'sectra-check-button' {
}

export interface SectraCheckButtonGroupProps extends React.HTMLProps<HTMLDivElement> {
}

export declare class SectraCheckButtonGroup extends React.Component<SectraCheckButtonGroupProps, any> {
}

declare module 'sectra-check-button-group' {
}

declare module 'sectra-radio-button' {
}
export declare class SectraRadioButton extends React.Component<SectraToggleButtonProps, any> {
}

