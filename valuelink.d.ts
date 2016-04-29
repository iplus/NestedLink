/**
 * Advanced React links for purely functional two-way data binding
 *
 * MIT License, (c) 2016 Vlad Balin, Volicon.
 */
export declare type Transform = (value: any, event?: {}) => any;
export declare type EventHandler = (event: {}) => void;
export declare type Validator<T> = (value: T) => boolean;
export declare type Iterator = (link: ChainedLink, key: string | number) => any;
export interface StatefulComponent {
    state: {};
    setState: (attrs: {}) => void;
    _valueLinks?: {
        [attrName: string]: StateLink<any>;
    };
}
declare abstract class Link<T> {
    value: T;
    static state<T>(component: StatefulComponent, key: string): StateLink<T>;
    static value<T>(value: T, set: (x: T) => void): CustomLink<T>;
    constructor(value: T);
    error: any;
    validationError: any;
    abstract set(x: T): void;
    requestChange(x: T): void;
    contains(element: any): ContainsLink;
    update(transform: Transform, e?: Object): void;
    action(transform: Transform): EventHandler;
    equals(truthyValue: any): EqualsLink;
    at(key: string | number): ChainedLink;
    map(iterator: Iterator): any[];
    /**
     * Validate link with validness predicate and optional custom error object. Can be chained.
     */
    check(whenValid: Validator<T>, error?: any): this;
}
export default Link;
export declare class CustomLink<T> extends Link<T> {
    set(x: any): void;
    constructor(value: T, set: (x: T) => void);
}
export declare class StateLink<T> extends Link<T> {
    component: StatefulComponent;
    key: string;
    constructor(value: T, component: StatefulComponent, key: string);
    set(x: T): void;
}
export declare class EqualsLink extends Link<boolean> {
    parent: Link<any>;
    truthyValue: any;
    constructor(parent: Link<any>, truthyValue: any);
    set(x: boolean): void;
}
export declare class ContainsLink extends Link<boolean> {
    parent: Link<any>;
    element: any;
    constructor(parent: Link<any>, element: any);
    set(x: boolean): void;
}
/**
 * Link to array or object element enclosed in parent link.
 * Performs purely functional update of the parent, shallow copying its value on `set`.
 */
export declare class ChainedLink extends Link<any> {
    parent: Link<{}>;
    key: string | number;
    constructor(parent: Link<{}>, key: string | number);
    set(x: any): void;
}