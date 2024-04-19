import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400) // bad request status code
    res.json({ errors: errors.array() })
  } else {
    next()
  }
}
