const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:5000' : 'https://nide-portfolio-e6d57d859db3.herokuapp.com'