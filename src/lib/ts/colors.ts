/* #||__[colors]__|| */


// #\_IMPORTS_\

    // __SCSS
    import COLORS from '../scss/modules/colors.module.scss'


// #\_EXPORTS_\

    // __THIS
    export default COLORS

    export function color_rgb(color: string) { return color.match(/\w\w/g)?.map(x => parseInt(x, 16)) }

    export function color_rgba(color: string, alpha = 1) { return `rgba(${color_rgb(color)}, ${alpha})` }