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
        1: '#212529',
        2: '#343a40',
        3: '#3b4046',
        4: '#51575d'
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