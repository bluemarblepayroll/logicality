export declare namespace Logic {
    interface ResolverFunction {
        (value: string, input: any): boolean;
    }
    function evaluate(expression: string, input: any, resolver?: ResolverFunction): boolean;
}
