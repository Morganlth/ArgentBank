import { defineConfig } from 'vite'
import react            from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(
{
    plugins: [react()],
    css    :
    {
        preprocessorOptions:
        {
            scss:
            {
                additionalData: `
                    @use '/src/lib/scss/global/vars'         as *;
					@use '/src/lib/scss/global/colors'       as *;
					@use '/src/lib/scss/global/placeholders' as *;
					@use '/src/lib/scss/global/breakpoints'  as *;
                `
            }
        }
    }
})
