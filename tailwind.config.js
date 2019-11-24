module.exports = {
  theme: {
    fontFamily: {
      primary: [ 'Rubik', 'sans-serif' ]
    },
    colors: {
      transparent: 'transparent',

      black: '#000000',
      white: '#ffffff',
      primary: '#f15a22',
      error: '#bf616a',
      overlay: '#0000007a',

      light: {
        1: '#eceff4',
        2: '#e5e9f0',
        3: '#d8dee9'
      },

      dark: {
        4: '#4c566a',
        3: '#434c5e',
        2: '#3b4252',
        1: '#2e3440'
      }
    },
    extend: {
      borderWidth: {
        default: '2px'
      },
      borderColor: (theme) => ({
        default: theme('colors.dark.4')
      }),
      boxShadow: (theme) => ({
        outline: `0 0 0 3px ${theme('colors.primary')}61`
      })
    }
  }
}