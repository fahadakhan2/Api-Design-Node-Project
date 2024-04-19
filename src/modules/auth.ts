import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// function for that will compare the password a user types to the hash password in the db when signing in. Will return a promise that will return true or false
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}
// function that will hash and salt a password
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

// function that creates a JWT when a user signs up or signs in. Takes a user object with id and username as its properties as an argument
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )
  return token
}

// middleware
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({ message: 'not authorized' })
    return
  }

  const [_, token] = bearer.split(' ') //Bearer dsajdlsajkdjsajdkdsd
  if (!token) {
    res.status(401)
    res.json({ message: 'not valid token' })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    res.status(401)
    res.json({ message: 'not valid user' })
    return
  }
}
