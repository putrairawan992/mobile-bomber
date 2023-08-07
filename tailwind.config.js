module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular': 'Inter-Regular',
        'inter-medium': 'Inter-Medium',
        'inter-semibold': 'Inter-SemiBold',
        'inter-bold': 'Inter-Bold',
        'poppins-regular': 'Poppins-Regular',
        'poppins-semibold': 'Poppins-SemiBold',
        'poppins-bold': 'Poppins-Bold',
        'raleway-regular': 'Raleway-Regular',
        'raleway-medium': 'Raleway-medium',
        'raleway-bold': 'Raleway-Bold',
      },
      colors: {
        screen: '#1E1E1E',
        danger: '#F04835',
        warning: '#EF9533',
        primary: '#AA5AFA',
        secondary: '#C111D5',
      },
    },
  },
  plugins: [],
};
